import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// SHA-256 of names that must never appear in the repo (stored hashed so this file doesn't leak them).
const BANNED = new Set(['6013de0381f648b7f21518885c02b40b7583adfb33c6d9b64d3aed52c3934798']);
const hash = (w) => crypto.createHash('sha256').update(w.toLowerCase()).digest('hex');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|jsx|mjs|json|md|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

test('no committed source, test or doc names the anonymized client', () => {
  const hits = [];
  for (const file of ['components', 'data', 'tests', 'docs', 'app', 'scripts'].flatMap((d) => walk(d))) {
    for (const word of fs.readFileSync(file, 'utf8').match(/[A-Za-z]+/g) ?? []) {
      if (BANNED.has(hash(word))) hits.push(file);
    }
  }
  assert.deepEqual([...new Set(hits)], []);
});

test('placeholder sections say plainly that values are not measured yet', () => {
  for (const f of ['components/projects/horizon/Page.jsx', 'components/projects/battery-lifetime/Page.jsx']) {
    assert.match(fs.readFileSync(f, 'utf8'), /not (yet )?measured/i, f);
  }
  const { metrics } = JSON.parse(fs.readFileSync('components/projects/horizon/data/eval.json', 'utf8'));
  for (const m of metrics) assert.match(m.how, /^to be measured/i, m.label);
});
