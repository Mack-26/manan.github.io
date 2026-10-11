'use client';

import { useState } from 'react';
import s from './battery.module.css';

const STAGES = [
  {
    title: 'Inputs',
    sub: 'usage profile + degradation modes',
    what: 'Statistics of each battery’s current profile (percentiles, mean, spread, skew, rest time, throughput, start voltage, charge fraction), plus three physical degradation modes: loss of lithium inventory (LLI) and loss of active material at each electrode (LAM_PE, LAM_NE).',
    why: 'Usage tells the model how a cell was treated; degradation modes tell it what that did to the chemistry. The physics features carry the signal that a purely statistical model has to guess at.',
  },
  {
    title: 'Subset search',
    sub: 'Optuna picks ≤ 25% of the data',
    what: 'Training data is split into segments and an Optuna search chooses which segments to keep, under a hard cap of 25% of the data.',
    why: 'Labelled aging data is expensive to produce, from long cycling tests or heavy simulation. The question is how little of it you can get away with.',
  },
  {
    title: 'Distribution check',
    sub: 'does the subset look like the whole?',
    what: 'Feature distributions of the chosen subset are compared against the full set before anything is trained on it.',
    why: 'A subset that skips one usage regime will look fine on average and fail silently on exactly those batteries.',
    loop: true,
  },
  {
    title: 'Surrogate augmentation',
    sub: 'CatBoost fills in the gaps',
    what: 'A CatBoost model trained on the subset generates additional labelled rows, which are checked against the real distribution again.',
    why: 'Gradient-boosted trees are strong on small tabular data and cheap to query, so they make a good stand-in for running more aging tests.',
    loop: true,
  },
  {
    title: 'Train candidates',
    sub: 'six physics-guided models',
    what: 'Six physics-guided models are trained on subset + synthetic data and tested on all the data the search left out.',
    why: 'Choosing by error on held-out batteries, not training fit, is what keeps the 25% claim honest.',
  },
  {
    title: 'Predict lifetime',
    sub: 'equivalent full cycles (EFC)',
    what: 'The best model predicts how many equivalent full cycles a battery has in it.',
    why: 'That number decides whether a retired EV pack is worth a second life in stationary storage, or goes to recycling.',
  },
];

export default function PipelineFlow() {
  const [i, setI] = useState(0);
  const st = STAGES[i];
  return (
    <div className={s.pipe}>
      <ol className={s.nodes} aria-label="Pipeline stages">
        {STAGES.map((stage, j) => (
          <li key={stage.title}>
            <button type="button" className={s.node} aria-pressed={i === j} onClick={() => setI(j)} onMouseEnter={() => setI(j)} onFocus={() => setI(j)}>
              <span className={s.nodeNum}>{String(j + 1).padStart(2, '0')}</span>
              <span className={s.nodeTitle}>
                {stage.title}
                {stage.loop && <span className={s.loop}>↺ checked</span>}
                <small>{stage.sub}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className={s.detail} aria-live="polite">
        <span className={s.detailKicker}>Stage {i + 1} of {STAGES.length}</span>
        <p className={s.detailTitle}>{st.title}</p>
        <p><strong>What:</strong> {st.what}</p>
        <p><strong>Why:</strong> {st.why}</p>
      </div>
    </div>
  );
}
