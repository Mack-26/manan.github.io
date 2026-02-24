export const posts = [
  {
    slug: 'battery-ml-analysis',
    title: 'Work on Battery ML Analysis',
    date: '2025-02-01',
    excerpt:
      'Diving into electrochemical impedance spectroscopy data and what machine learning can tell us about battery health.',
    content: `
## What I'm working on

At the Ziyou Song Lab at UMich, I'm applying ML to predict the remaining useful life of lithium-ion batteries using electrochemical impedance spectroscopy (EIS) data.

EIS measures how a battery responds to small AC signals across a range of frequencies  -  the resulting impedance spectrum is a fingerprint of the battery's internal state.

### Why this matters

Second-life batteries (repurposed from EVs into stationary storage) could unlock massive value for grid storage, but only if we can reliably assess their health. Today this is largely manual and expensive.

### Our approach

We're combining physics-based equivalent circuit models with neural networks  -  encoding known electrochemical relationships as inductive biases. Early results look promising.

*More updates as the research progresses.*
    `.trim(),
    tags: ['Battery ML', 'Research', 'UMich', 'Sustainability'],
  },
  {
    slug: 'ai-summit',
    title: 'Covering the AI Summit',
    date: '2024-11-15',
    excerpt:
      "Notes from attending an AI summit  -  what's hype, what's real, and where I think things are heading.",
    content: `
## The AI Summit

Recently attended an AI summit in the Bay Area. Here are my honest notes.

### What stood out

**Agents are the real wave.** Every major lab is building infrastructure for autonomous agents that can take multi-step actions. The tooling is maturing fast.

**Multimodal is becoming table stakes.** Vision + language models are no longer exotic  -  they're becoming the default interface for enterprise AI.

**The gap between research and production is real.** The demos are impressive. Deploying reliably at scale is a completely different challenge.

### My take

We're early in the agent era. The next 2 years will be about reliability, cost, and trust  -  not just capability.

*These are my personal observations, not from any official capacity.*
    `.trim(),
    tags: ['AI', 'Industry', 'Agents', 'Notes'],
  },
  {
    slug: 'vlm-learnings',
    title: 'Learnings from VLMs',
    date: '2024-09-10',
    excerpt:
      "What I learned from working with Vision-Language Models  -  architectures, failure modes, and what's actually hard.",
    content: `
## What's actually hard about VLMs

After spending months with Vision-Language Models, here's what surprised me.

### Spatial reasoning is still weak

VLMs are remarkably good at describing images but struggle with precise spatial relationships  -  "is object A to the left of B?" type questions are hit or miss.

### Hallucination is a bigger problem than it looks

Models confidently describe objects that aren't there. For high-stakes applications (medical, legal, robotics), this is a fundamental blocker.

### Prompting matters enormously

The gap between a naive prompt and a well-engineered prompt on the same VLM can be 20-30 accuracy points on structured tasks. This is both a feature and a bug.

### What I'm watching

Grounding models that anchor language to specific image regions are showing real promise for reducing hallucinations.

*Code and full details coming after publication.*
    `.trim(),
    tags: ['VLMs', 'Multimodal', 'Research', 'ML'],
  },
];

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) ?? null;
}
