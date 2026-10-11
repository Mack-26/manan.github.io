import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('every Horizon evaluation metric is a flagged placeholder with a method', () => {
  const { metrics } = JSON.parse(fs.readFileSync('components/projects/horizon/data/eval.json', 'utf8'));
  assert.equal(metrics.length, 5);
  for (const m of metrics) {
    assert.equal(m.placeholder, true, m.label);
    assert.ok(m.value && m.label && m.how, m.label);
  }
});

test('demo video is small enough to ship', () => {
  assert.ok(fs.statSync('public/projects/horizon/demo.mp4').size < 3_000_000);
});

test('old learnpool URL redirects to horizon', async () => {
  const { default: config } = await import('../next.config.mjs');
  const redirects = await config.redirects();
  assert.ok(redirects.some((r) => r.source === '/projects/learnpool' && r.destination === '/projects/horizon' && r.permanent));
});
