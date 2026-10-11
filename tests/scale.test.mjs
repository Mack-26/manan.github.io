import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linearScale, logScale, niceTicks } from '../lib/projects/scale.js';

test('linear maps endpoints', () => {
  const s = linearScale([0, 10], [0, 100]);
  assert.equal(s(0), 0);
  assert.equal(s(5), 50);
  assert.equal(s(10), 100);
});
test('log maps decades evenly', () => {
  const s = logScale([1, 100], [0, 200]);
  assert.equal(Math.round(s(10)), 100);
});
test('niceTicks covers range with round steps', () => {
  assert.deepEqual(niceTicks(0, 47, 5), [0, 10, 20, 30, 40, 50]);
});

test('labelGutter leaves room for the longest bar label', async () => {
  const { labelGutter } = await import('../components/projects/charts/frame.js');
  assert.ok(labelGutter(['MLP (no physics features)']) >= 170);
  assert.ok(labelGutter(['IPPO']) >= 80);
});
