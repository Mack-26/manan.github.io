import Flow from '@/components/projects/blocks/Flow';

const STEPS = [
  { title: 'Both critics score the state', body: 'The team critic V_global and each agent’s own critic V_local.' },
  { title: 'Six features', body: 'Both values (normalized), their disagreement, team variance, each agent’s deviation from the team, and their log-ratio.' },
  { title: 'Tiny MLP → α', body: '6 → 16 → 1 with LayerNorm and a sigmoid, trained end-to-end with the PPO loss.', accent: true, tag: 'learned per state' },
  { title: 'Blend and train', body: 'v = α·V_global + (1−α)·V_local feeds GAE advantages for clipped PPO.' },
];

export default function AlphaNetDiagram() {
  return <Flow steps={STEPS} label="How the adaptive critic computes alpha" />;
}
