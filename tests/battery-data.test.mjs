import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('components/projects/battery-lifetime/data/results.json', 'utf8'));

test('every battery result is a flagged placeholder', () => {
  assert.equal(data.headline.placeholder, true);
  assert.equal(data.mapeVsFraction.placeholder, true);
  assert.equal(data.models.placeholder, true);
});

test('MAPE-vs-data curve is ordered by data fraction', () => {
  const xs = data.mapeVsFraction.points.map((p) => p[0]);
  assert.deepEqual(xs, [...xs].sort((a, b) => a - b));
});

test('search-space numbers match the pipeline design notes', () => {
  assert.deepEqual(data.search, { samples: 9650, segments: 53, minK: 2, maxK: 13, maxFraction: 0.25 });
});

test('page never mentions the lab', () => {
  const src = fs.readdirSync('components/projects/battery-lifetime').filter((f) => f.endsWith('.jsx'))
    .map((f) => fs.readFileSync(`components/projects/battery-lifetime/${f}`, 'utf8')).join('\n');
  assert.doesNotMatch(src, /Ziyou|Song|\blab\b/i);
});
