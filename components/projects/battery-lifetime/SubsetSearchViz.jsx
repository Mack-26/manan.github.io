'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import blocks from '@/components/projects/blocks/blocks.module.css';
import s from './battery.module.css';
import results from './data/results.json';

const { segments: N, minK, maxK } = results.search;

// Old search: every segment is an independent include/exclude coin flip.
function binaryTrial() {
  return Array.from({ length: N }, () => Math.random() < 0.5);
}

// New search: choose how many segments (k), score every segment, keep the top k.
function priorityTrial() {
  const k = minK + Math.floor(Math.random() * (maxK - minK + 1));
  const ranked = Array.from({ length: N }, (_, i) => [Math.random(), i]).sort((a, b) => b[0] - a[0]);
  const on = new Array(N).fill(false);
  ranked.slice(0, k).forEach(([, i]) => { on[i] = true; });
  return on;
}

const isValid = (mask) => {
  const k = mask.filter(Boolean).length;
  return k >= minK && k <= maxK;
};

function Panel({ title, sub, mask, tally }) {
  const k = mask.filter(Boolean).length;
  const valid = isValid(mask);
  return (
    <div className={s.panel} data-valid={String(valid)}>
      <div className={s.panelHead}>{title}<small>{sub}</small></div>
      <div className={s.cells} aria-hidden="true">
        {mask.map((on, i) => <span key={i} className={s.cell} data-on={String(on)} />)}
      </div>
      <div className={s.meter}>
        <span>{k} of {N} segments</span>
        <span className={s.verdict}>{valid ? '✓ within the 25% cap' : '✗ over the cap'}</span>
      </div>
      <div className={s.rate}>
        valid trials: <b>{tally.valid}</b> / {tally.total}
      </div>
    </div>
  );
}

export default function SubsetSearchViz() {
  const reduce = useReducedMotion();
  const [running, setRunning] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [state, setState] = useState(() => ({
    a: new Array(N).fill(false),
    b: new Array(N).fill(false),
    ta: { valid: 0, total: 0 },
    tb: { valid: 0, total: 0 },
  }));

  useEffect(() => {
    const step = () =>
      setState((prev) => {
        const a = binaryTrial();
        const b = priorityTrial();
        return {
          a,
          b,
          ta: { valid: prev.ta.valid + (isValid(a) ? 1 : 0), total: prev.ta.total + 1 },
          tb: { valid: prev.tb.valid + (isValid(b) ? 1 : 0), total: prev.tb.total + 1 },
        };
      });
    step();
    if (reduce || !running) return undefined;
    const id = setInterval(step, 650);
    return () => clearInterval(id);
  }, [reduce, running]);

  return (
    <div>
      <div className={s.sim}>
        <Panel title="Before: include or exclude each segment" sub={`2^${N} possible masks`} mask={state.a} tally={state.ta} />
        <Panel title="After: pick k, then the top-k by priority" sub={`k ∈ [${minK}, ${maxK}] · always valid`} mask={state.b} tally={state.tb} />
      </div>
      <div className={s.simControls}>
        <button type="button" className={blocks.btn} onClick={() => setRunning((r) => !r)}>
          {mounted && reduce ? 'Run another trial' : running ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
}
