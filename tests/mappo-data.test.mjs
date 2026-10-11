import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dir = 'components/projects/adaptive-mappo/data';
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

test('aggregate keeps the published ranks and stability numbers', () => {
  const { rows } = read('aggregate.json');
  const mw = rows.find((r) => r.task === 'multiwalker' && r.algo === 'adaptive_mappo');
  assert.equal(mw.rank, 1);
  assert.equal(mw.dropPct, 21.2);
  assert.equal(rows.length, 24);
});

test('alpha trajectories are downsampled and settle where the logs say', () => {
  const { tasks } = read('alpha.json');
  for (const t of Object.values(tasks)) assert.ok(t.length <= 120 && t.length > 20);
  const nav = tasks.navigation;
  assert.ok(Math.abs(nav[nav.length - 1][1] - 0.24) < 0.06, `navigation ends at ${nav[nav.length - 1][1]}`);
  const mw = tasks.multiwalker;
  assert.ok(mw[mw.length - 1][1] > 0.85);
});

test('reward curves exist for mappo and ippo on every task', () => {
  const { tasks } = read('reward.json');
  for (const name of ['multiwalker', 'navigation', 'balance', 'simple_world_comm']) {
    assert.ok(tasks[name].mappo.length > 5 && tasks[name].ippo.length > 5, name);
  }
});

test('rollout clips exist and are small', () => {
  for (const f of ['mappo.mp4', 'adaptive.mp4']) {
    const p = path.join('public/projects/adaptive-mappo', f);
    assert.ok(fs.existsSync(p), p);
    assert.ok(fs.statSync(p).size < 3_000_000, `${p} too large`);
  }
});
