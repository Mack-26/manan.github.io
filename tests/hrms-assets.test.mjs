import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/projects/hrms/screens';
const SCREENS = ['home', 'selfie', 'clockin-v2', 'notifications', 'calendar', 'selfie-v1-flow'];

test('all HRMS screens exist and are web-sized', () => {
  for (const name of SCREENS) {
    const p = path.join(DIR, `${name}.jpg`);
    assert.ok(fs.existsSync(p), p);
    assert.ok(fs.statSync(p).size < 300_000, `${p} is ${fs.statSync(p).size} bytes`);
  }
});

test('the HRMS page never names the client', () => {
  const page = fs.readFileSync('components/projects/hrms/Page.jsx', 'utf8');
  assert.doesNotMatch(page, /hrms-casestudy\.pdf/);
});
