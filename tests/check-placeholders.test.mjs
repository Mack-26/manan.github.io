import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { findPlaceholders } from '../scripts/check-placeholders.mjs';

test('finds only files with placeholder: true', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ph-'));
  fs.mkdirSync(path.join(dir, 'nested'));
  fs.writeFileSync(path.join(dir, 'nested', 'a.json'), '{\n  "v": 1,\n  "placeholder": true\n}');
  fs.writeFileSync(path.join(dir, 'b.json'), '{"v": 2, "placeholder": false}');
  const found = findPlaceholders([dir]);
  assert.equal(found.length, 1);
  assert.equal(found[0].line, 3);
});
