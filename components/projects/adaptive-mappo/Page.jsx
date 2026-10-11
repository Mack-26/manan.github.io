import ProjectPage from '@/components/projects/blocks/ProjectPage';
import Hero from '@/components/projects/blocks/Hero';
import Section, { Prose } from '@/components/projects/blocks/Section';
import StatRow from '@/components/projects/blocks/StatRow';
import Figure from '@/components/projects/blocks/Figure';
import Video from '@/components/projects/blocks/Video';
import DataTable from '@/components/projects/blocks/DataTable';
import Callout from '@/components/projects/blocks/Callout';
import blocks from '@/components/projects/blocks/blocks.module.css';
import LineChart from '@/components/projects/charts/LineChart';
import BarChart from '@/components/projects/charts/BarChart';
import Heatmap from '@/components/projects/charts/Heatmap';
import AlphaSlider from './AlphaSlider';
import AlphaNetDiagram from './AlphaNetDiagram';
import aggregate from './data/aggregate.json';
import alpha from './data/alpha.json';
import reward from './data/reward.json';
import s from './mappo.module.css';

const ALGO_LABEL = {
  adaptive_mappo: 'Adaptive (ours)',
  mappo: 'MAPPO',
  ippo: 'IPPO',
  'fixed_alpha_mappo_0.25': 'Fixed α = 0.25',
  'fixed_alpha_mappo_0.50': 'Fixed α = 0.50',
  'fixed_alpha_mappo_0.75': 'Fixed α = 0.75',
};
const TASK_LABEL = {
  multiwalker: 'Multiwalker',
  navigation: 'Navigation',
  balance: 'Balance',
  simple_world_comm: 'World Comm',
};
const TASKS = Object.keys(TASK_LABEL);
const ALGOS = Object.keys(ALGO_LABEL);
const row = (task, algo) => aggregate.rows.find((r) => r.task === task && r.algo === algo);

// After the first evaluation the reward scale settles; the untrained point would flatten the chart.
const warm = (pts) => pts.filter((p) => p[0] > 0);
const balance = reward.tasks.balance;
const motivation = [
  { name: 'MAPPO (team critic)', color: 'var(--olive)', points: warm(balance.mappo).map((p) => [p[0], p[1]]), band: warm(balance.mappo).map((p) => [p[0], p[2], p[3]]) },
  { name: 'IPPO (own critic)', color: 'var(--rose)', points: warm(balance.ippo).map((p) => [p[0], p[1]]), band: warm(balance.ippo).map((p) => [p[0], p[2], p[3]]) },
];

const alphaSeries = [
  { task: 'multiwalker', color: 'var(--olive)', emphasis: true },
  { task: 'navigation', color: 'var(--accent)', emphasis: true },
  { task: 'balance', color: 'var(--muted)' },
  { task: 'simple_world_comm', color: 'var(--rose)' },
].map(({ task, color, emphasis }) => ({
  name: TASK_LABEL[task],
  color,
  emphasis,
  points: alpha.tasks[task].map((p) => [p[0], p[1]]),
  band: emphasis ? alpha.tasks[task].map((p) => [p[0], p[2], p[3]]) : undefined,
}));

const dropBars = ALGOS.map((a) => ({
  label: ALGO_LABEL[a],
  value: row('multiwalker', a).dropPct,
  emphasis: a === 'adaptive_mappo',
})).sort((a, b) => a.value - b.value);

const rankValues = ALGOS.map((a) => TASKS.map((t) => row(t, a).rank));

const tableRows = TASKS.flatMap((t) =>
  ALGOS.map((a) => {
    const r = row(t, a);
    return {
      task: TASK_LABEL[t],
      algo: ALGO_LABEL[a],
      rank: r.rank,
      drop: `${r.dropPct}%`,
      best: r.best.toFixed(2),
      last: r.last.toFixed(2),
      _adaptive: a === 'adaptive_mappo',
    };
  }),
);

const mw = row('multiwalker', 'adaptive_mappo');
const mwMappo = row('multiwalker', 'mappo');
const mwIppo = row('multiwalker', 'ippo');
const nav = row('navigation', 'adaptive_mappo');

const SNIPPET = `# features from both critics (normalized on the team critic's scale)
v_g = (v_global - mean) / std
v_l = (v_local  - mean) / std
features = cat([v_g, v_l,
                |v_g - v_l|,             # disagreement
                var_team(v_l),           # how split the team is
                v_l - mean_team(v_l),    # this agent vs the team
                log(|v_global| / |v_local|)])

alpha = sigmoid(mlp(features))           # 6 -> 16 -> 1
v_mix = alpha * v_global + (1 - alpha) * v_local   # raw scale for the PPO target`;

export default function Page() {
  return (
    <ProjectPage reachOut="Building agents that have to cooperate? I’d like to hear what you’re working on.">
      <Hero
        eyebrow="Research · multi-agent reinforcement learning"
        title="Adaptive MAPPO"
        subtitle="When a team of agents learns together, should each one judge its moves by what the whole team sees, or by what it sees alone? We let a small network decide, state by state."
        facts={[
          { label: 'Role', value: 'Designed the adaptive critic, led the method' },
          { label: 'Team', value: 'Course project, ECE 567 · UMich' },
          { label: 'When', value: 'Winter 2026' },
          { label: 'Stack', value: 'PyTorch · TorchRL · BenchMARL' },
          { label: 'Scale', value: '4 tasks × 6 methods × 3 seeds = 72 runs' },
        ]}
        media={
          <Figure
            provenance="real"
            caption="Multiwalker: three bipedal walkers must carry a package together without dropping it. Each clip is that method’s best checkpoint."
            bare
          >
            <div className={blocks.twoUp}>
              <Video src="/projects/adaptive-mappo/mappo.mp4" poster="/projects/adaptive-mappo/mappo.jpg" label="MAPPO" />
              <Video src="/projects/adaptive-mappo/adaptive.mp4" poster="/projects/adaptive-mappo/adaptive.jpg" label="Adaptive MAPPO" />
            </div>
          </Figure>
        }
      />

      <Section n={1} label="The question" title="One critic for the team, or one for each agent?">
        <Prose>
          <p>
            In PPO, a <strong>critic</strong> estimates how good the current situation is, so the policy can tell
            whether an action helped. With several agents there’s a choice to make.
          </p>
          <p>
            <strong>MAPPO</strong> gives the critic the whole team’s state. It understands teamwork, but its signal
            is noisy for any single agent: did we win because of me? <strong>IPPO</strong> gives each agent a critic
            over its own view. It’s steadier, but blind to teammates. In our baselines neither wins everywhere; they
            trade places from task to task and even within one training run.
          </p>
          <p>So instead of choosing, blend them. Drag α to see what the policy would learn from:</p>
        </Prose>
        <Figure provenance="illustrative" caption="The two critic values are made up to show the mechanism; the blend formula is the real one.">
          <AlphaSlider />
        </Figure>
        <Figure provenance="replotted" caption="VMAS Balance, mean of 3 seeds with min–max band. The two critics trade the lead several times during training.">
          <LineChart
            series={motivation}
            xLabel="training iteration"
            yLabel="episode reward"
            ariaLabel="Reward over training on Balance for MAPPO and IPPO; the curves cross several times."
          />
        </Figure>
      </Section>

      <Section n={2} label="Method" title="Let a small network choose α for every state">
        <Figure caption="The adaptive critic. Everything else is standard clipped PPO with GAE.">
          <AlphaNetDiagram />
        </Figure>
        <pre className={s.code}><code>{SNIPPET}</code></pre>
        <Callout kind="challenge" title="Critic values live on very different scales">
          <p>
            Multiwalker rewards start near −100; navigation’s hover around 1. Features built from raw values mean
            different things on different tasks, so the final version normalizes every feature against the team
            critic’s batch statistics. The blend itself still uses the raw values, so the PPO target stays on the
            reward’s real scale.
          </p>
        </Callout>
        <Prose>
          <p>
            We compared against pure MAPPO (α = 1), pure IPPO (α = 0), and three fixed blends (α = 0.25, 0.5, 0.75),
            on two PettingZoo tasks (Multiwalker, Simple World Comm) and two VMAS tasks (Navigation, Balance), three
            seeds each, 3M frames per run on the Great Lakes cluster.
          </p>
        </Prose>
      </Section>

      <Section n={3} label="Results" title="α lands somewhere different on every task">
        <Figure provenance="replotted" caption="Mean learned α across 3 seeds (bands: min–max). Nobody told it where to go: on Multiwalker it settles near the team critic, on Navigation near each agent’s own.">
          <LineChart
            series={alphaSeries}
            yDomain={[0, 1]}
            xLabel="training iteration"
            yLabel="learned α"
            ariaLabel="Learned alpha over training: about 0.94 on Multiwalker, about 0.25 on Navigation."
          />
        </Figure>
        <StatRow
          stats={[
            { value: `${mw.dropPct}%`, label: 'drop from peak reward on Multiwalker', note: `vs ${mwMappo.dropPct}% for MAPPO and ${mwIppo.dropPct}% for IPPO` },
            { value: '1st', label: 'most stable on Multiwalker and Navigation', note: 'of 6 methods, ranked by drop from peak' },
            { value: `${mw.lastAlpha.toFixed(2)} / ${nav.lastAlpha.toFixed(2)}`, label: 'final α on Multiwalker / Navigation', note: 'same algorithm, opposite choices' },
          ]}
        />
        <Figure provenance="real" caption="Multiwalker: how much reward each method lost between its best checkpoint and the end of training (lower is more stable). Mean of 3 seeds.">
          <BarChart bars={dropBars} unit="%" ariaLabel="Drop from peak reward on Multiwalker: adaptive 21 percent, MAPPO 49, IPPO 141." />
        </Figure>
        <details className={s.more}>
          <summary>All four tasks, all six methods</summary>
          <Prose>
            <p>
              Adaptive MAPPO ranks first on Multiwalker and Navigation, third on Balance (where α simply converges to
              pure MAPPO), and last on Simple World Comm, a task built around communication where α wandered and a
              low fixed α did best.
            </p>
          </Prose>
          <Figure caption="Rank by drop from peak reward (1 = most stable).">
            <Heatmap
              rows={ALGOS.map((a) => ALGO_LABEL[a])}
              cols={TASKS.map((t) => TASK_LABEL[t])}
              values={rankValues}
              highlightRow="Adaptive (ours)"
              ariaLabel="Rank of each method on each task"
            />
          </Figure>
          <DataTable
            columns={[
              { key: 'task', label: 'Task' },
              { key: 'algo', label: 'Method' },
              { key: 'rank', label: 'Rank', align: 'right' },
              { key: 'drop', label: 'Drop from peak', align: 'right' },
              { key: 'best', label: 'Best reward', align: 'right' },
              { key: 'last', label: 'Final reward', align: 'right' },
            ]}
            rows={tableRows}
            highlight={(r) => r._adaptive}
            caption="Source: aggregate of 72 runs (mean over 3 seeds)."
          />
        </details>
      </Section>

      <Section n={4} label="Next" title="What I’d try next">
        <Prose>
          <ul>
            <li>Give α the agents’ observations, not just the two values, so it can react to what’s happening on screen.</li>
            <li>Understand the communication task: does α need to differ for speakers and listeners?</li>
            <li>Harder coordination benchmarks with more agents, where a team critic gets noisier.</li>
          </ul>
          <p>
            Want to see agents learning live? The football simulation on <a href="/#explore">my homepage</a> is a
            separate, illustrative demo of multi-agent RL.
          </p>
        </Prose>
      </Section>
    </ProjectPage>
  );
}
