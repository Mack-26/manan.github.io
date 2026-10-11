// Builds Adaptive MAPPO page data from the course project's evaluation outputs
// (567_share/eval_results: aggregate.csv, per-seed alpha + eval reward logs, rollout videos).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const SRC = path.join(os.homedir(), 'Desktop/Manan/ECE 567 - Reinforcement Learning/RLProject/567_share/eval_results');
const OUT = 'components/projects/adaptive-mappo/data';
const MEDIA = 'public/projects/adaptive-mappo';
const TASKS = {
  multiwalker: 'pettingzoo/multiwalker',
  navigation: 'vmas/navigation',
  balance: 'vmas/balance',
  simple_world_comm: 'pettingzoo/simple_world_comm',
};
const SEEDS = [0, 1, 2];

const readXY = (file) =>
  fs.readFileSync(file, 'utf8').trim().split('\n').map((l) => l.split(',').map(Number));
const round = (v, d = 3) => +v.toFixed(d);

// Mean / min / max across seeds, bucketed down to at most `maxPoints` points.
function combine(seriesList, maxPoints) {
  const n = Math.min(...seriesList.map((s) => s.length));
  const bucket = Math.max(1, Math.ceil(n / maxPoints));
  const out = [];
  for (let i = 0; i < n; i += bucket) {
    const xs = [], vals = [];
    for (let j = i; j < Math.min(i + bucket, n); j++) {
      xs.push(seriesList[0][j][0]);
      vals.push(...seriesList.map((s) => s[j][1]));
    }
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    out.push([xs[0], round(mean), round(Math.min(...vals)), round(Math.max(...vals))]);
  }
  return out;
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(MEDIA, { recursive: true });

// aggregate.csv → ranks and stability per task × algorithm
const [head, ...lines] = fs.readFileSync(path.join(SRC, 'aggregate.csv'), 'utf8').trim().split('\n');
const cols = head.split(',');
const rows = lines.map((l) => {
  const r = Object.fromEntries(l.split(',').map((v, i) => [cols[i], v]));
  return {
    task: r.Task.split('/')[1],
    algo: r.Algo,
    rank: Number(r.Rank),
    dropPct: Number(r['Relative_Drop_%']),
    stabilityGap: Number(r.Stability_Gap),
    best: Number(r.Best_Value_Mean),
    last: Number(r.Last_Value_Mean),
    lastAlpha: Number(r.Last_Alpha_Mean),
  };
});
fs.writeFileSync(path.join(OUT, 'aggregate.json'), JSON.stringify({ source: '567_share/eval_results/aggregate.csv', rows }, null, 2) + '\n');

// learned α over training (adaptive_mappo, 3 seeds)
const alpha = {};
for (const [name, dir] of Object.entries(TASKS)) {
  const seeds = SEEDS.map((s) => readXY(path.join(SRC, dir, 'adaptive_mappo', `seed_${s}`, 'agent_alpha_mean.csv')));
  alpha[name] = combine(seeds, 100);
}
fs.writeFileSync(path.join(OUT, 'alpha.json'), JSON.stringify({ source: 'eval_results/<task>/adaptive_mappo/seed_*/agent_alpha_mean.csv; rows are [iteration, mean, min, max] across 3 seeds', tasks: alpha }) + '\n');

// eval reward curves (mean across seeds)
const reward = {};
for (const [name, dir] of Object.entries(TASKS)) {
  reward[name] = {};
  for (const algo of ['mappo', 'ippo', 'adaptive_mappo']) {
    const seeds = SEEDS.map((s) => readXY(path.join(SRC, dir, algo, `seed_${s}`, 'eval_reward_episode_reward_mean.csv')));
    reward[name][algo === 'adaptive_mappo' ? 'adaptive' : algo] = combine(seeds, 60);
  }
}
fs.writeFileSync(path.join(OUT, 'reward.json'), JSON.stringify({ source: 'eval_results/<task>/<algo>/seed_*/eval_reward_episode_reward_mean.csv; rows are [iteration, mean, min, max] across 3 seeds', tasks: reward }) + '\n');

// rollout clips: multiwalker, best checkpoints from aggregate.csv (Closest_Best_Video)
const clip = (src, out) =>
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-t', '12', '-vf', 'scale=600:-2', '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out]);
const poster = (src, out) => execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '3', '-i', src, '-frames:v', '1', '-q:v', '4', out]);
const vids = {
  mappo: path.join(SRC, 'pettingzoo/multiwalker/mappo/seed_2/seed_2_frame_159.mp4'),
  adaptive: path.join(SRC, 'pettingzoo/multiwalker/adaptive_mappo/seed_0/seed_0_frame_279.mp4'),
};
for (const [k, src] of Object.entries(vids)) {
  clip(src, path.join(MEDIA, `${k}.mp4`));
  poster(src, path.join(MEDIA, `${k}.jpg`));
}
console.log('wrote aggregate, alpha, reward, 2 clips');
