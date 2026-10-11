import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../data/projects.js';

const FEATURED = ['lilseeground', 'adaptive-mappo', 'horizon', 'hrms', 'battery-lifetime'];

test('the five featured projects exist, in order', () => {
  assert.deepEqual(projects.filter((p) => p.featured).map((p) => p.slug), FEATURED);
});
test('each featured card has a hook and a metric', () => {
  for (const p of projects.filter((p) => p.featured)) {
    assert.ok(p.card?.hook, p.slug);
    assert.ok(p.card?.metric?.value && p.card.metric.label, p.slug);
  }
});
test('replaced entries are gone and VLM research stays', () => {
  const slugs = projects.map((p) => p.slug);
  assert.ok(!slugs.includes('learnpool'));
  assert.ok(slugs.includes('vlm-research'));
});
test('content rules: no hackathon, lab, client name or unsupported HRMS claims', () => {
  const text = JSON.stringify(projects.filter((p) => p.featured));
  for (const banned of [/hackathon/i, /Ziyou|Song Lab/i, /acquired/i, /React Native/i]) {
    assert.doesNotMatch(text, banned);
  }
});
