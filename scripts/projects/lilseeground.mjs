// Builds LilSeeGround page data from the project repo.
// Cases: hand-picked from seeground_comparison/ (ScanRefer val, real Qwen3-VL 2B/4B outputs);
// predicted IDs and IoUs come from examples.csv. Label positions (x, y as fractions of the
// 680px render) were located by eye on each image so the page can ring the chosen objects.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const SRC = path.join(os.homedir(), 'Desktop/Manan/SeeGroundProj/LilSeeGround');
const OUT_IMG = 'public/projects/lilseeground/cases';
const OUT_DATA = 'components/projects/lilseeground/data';

// [scene_qidx, positions of 4B's and 2B's predicted ID labels in px (null = not in this view)]
const PICKS = [
  ['scene0015_00_q4', [485, 55], [145, 220]],
  ['scene0086_00_q0', [492, 200], [427, 382]],
  ['scene0025_00_q3', [380, 350], [316, 350]],
  ['scene0081_00_q1', [121, 370], null],
  ['scene0050_00_q1', [377, 453], null],
  ['scene0077_00_q0', [323, 288], [252, 288]],
  ['scene0084_00_q0', [365, 395], [329, 341]],
  ['scene0063_00_q1', [268, 365], [273, 383]],
];
const FAILURES = ['scene0015_00_q1', 'scene0019_00_q3'];

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (ch !== '\r') cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.filter((r) => r.length === head.length).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const examples = parseCsv(fs.readFileSync(path.join(SRC, 'examples.csv'), 'utf8'));
const compDir = path.join(SRC, 'seeground_comparison');
const allFiles = fs.readdirSync(compDir).filter((d) => fs.statSync(path.join(compDir, d)).isDirectory()).flatMap((d) => fs.readdirSync(path.join(compDir, d)).map((f) => path.join(d, f)));
const findFile = (key, suffix) => allFiles.find((f) => f.includes(`_${key}_iou`) && f.endsWith(suffix));

fs.mkdirSync(OUT_IMG, { recursive: true });
fs.mkdirSync(OUT_DATA, { recursive: true });
const toJpeg = (src, name) => {
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '78', path.join(compDir, src), '--out', path.join(OUT_IMG, name)], { stdio: 'ignore' });
  return `/projects/lilseeground/cases/${name}`;
};
const frac = (p) => (p ? { x: +(p[0] / 680).toFixed(3), y: +(p[1] / 680).toFixed(3) } : null);

const cases = PICKS.map(([key, pos4b, pos2b]) => {
  const [scene, q] = key.split('_q');
  const ex = examples.find((e) => e.scene_id === scene && e.query_idx === q);
  if (!ex) throw new Error(`no examples.csv row for ${key}`);
  return {
    id: key,
    scene,
    outcome: ex.outcome === '4B_wins' ? '4b_wins' : '2b_wins',
    query: ex.query.trim(),
    pred4b: Number(ex.pred_id_4b),
    pred2b: Number(ex.pred_id_2b),
    iou4b: Number(ex.iou_4b),
    iou2b: Number(ex.iou_2b),
    pos4b: frac(pos4b),
    pos2b: frac(pos2b),
    img: toJpeg(findFile(key, '_modelA.png'), `${key}.jpg`),
  };
});

const failures = FAILURES.map((key) => {
  const file = findFile(key, '_modelA.png');
  const m = file.match(/iouA([\d.]+)_iouB([\d.]+)/);
  return {
    id: key,
    query: fs.readFileSync(path.join(compDir, findFile(key, '_query.txt')), 'utf8').trim(),
    iou4b: Number(m[1]),
    iou2b: Number(m[2]),
    img: toJpeg(file, `${key}.jpg`),
  };
});

fs.writeFileSync(
  path.join(OUT_DATA, 'cases.json'),
  JSON.stringify({ source: 'LilSeeGround/examples.csv + seeground_comparison/ (ScanRefer val)', cases, failures }, null, 2) + '\n',
);
console.log(`wrote ${cases.length} cases, ${failures.length} failures`);
