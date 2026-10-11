import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dir = 'components/projects/lilseeground/data';
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));

test('Nr3D results match the paper table', () => {
  const { rows } = read('results.json');
  const by = Object.fromEntries(rows.map((r) => [r.model, r]));
  assert.equal(by['Qwen3-VL-4B'].acc25, 47.23);
  assert.equal(by['Qwen3-VL-4B'].acc50, 42.84);
  assert.equal(by['Qwen2-VL-72B'].acc25, 44.1);
  assert.equal(by['Qwen3-VL-2B'].vram, 4);
});

test('grounding cases are complete and their images exist', () => {
  const { cases, failures } = read('cases.json');
  assert.ok(cases.length >= 8);
  for (const c of cases) {
    assert.match(c.outcome, /^(4b_wins|2b_wins)$/);
    for (const k of ['query', 'img', 'pred4b', 'pred2b']) assert.ok(c[k] != null, `${c.id} ${k}`);
    assert.equal(typeof c.iou4b, 'number');
    assert.ok(fs.existsSync(path.join('public', c.img)), c.img);
    // the winner's IoU clears the Acc@25 bar, the loser's doesn't
    const [win, lose] = c.outcome === '4b_wins' ? [c.iou4b, c.iou2b] : [c.iou2b, c.iou4b];
    assert.ok(win >= 0.25 && lose < 0.25, c.id);
  }
  assert.ok(failures.length >= 2);
  for (const f of failures) assert.ok(fs.existsSync(path.join('public', f.img)), f.img);
});
