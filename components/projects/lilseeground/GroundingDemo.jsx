'use client';

import { useState } from 'react';
import blocks from '@/components/projects/blocks/blocks.module.css';
import s from './lilseeground.module.css';
import data from './data/cases.json';

const FILTERS = [
  { key: 'all', label: 'All cases' },
  { key: '4b_wins', label: '4B right' },
  { key: '2b_wins', label: '2B right' },
];

function Ring({ pos, ok, label }) {
  if (!pos) return null;
  const x = pos.x * 100;
  const y = pos.y * 100;
  const color = ok ? '#B7C396' : '#E07A6A';
  const ty = y < 15 ? y + 5.6 : y - 8.6; // keep the tag inside the frame near the top edge
  return (
    <g>
      <circle cx={x} cy={y} r="5.2" fill="none" stroke={color} strokeWidth="0.9" strokeDasharray={ok ? undefined : '1.6 1.2'} />
      <rect x={x + 4.6} y={ty} width="7.4" height="4.4" rx="0.8" fill={color} />
      <text x={x + 8.3} y={ty + 3.1} textAnchor="middle" fontSize="2.9" fontFamily="var(--mono)" fontWeight="700" fill="#1C1C1C">{label}</text>
    </g>
  );
}

function PickRow({ model, id, iou, pos }) {
  const ok = iou >= 0.25;
  return (
    <div className={s.pick}>
      <span className={s.badge} data-model={model}>{model.toUpperCase()}</span>
      <span className={s.pickText}>
        Qwen3-VL-{model.toUpperCase()} picked object #{id}
        <small>IoU {iou.toFixed(2)} with the true box{pos ? '' : ' · not visible in this view'}</small>
      </span>
      <span className={s.verdict} data-ok={String(ok)}>{ok ? '✓ right' : '✗ wrong'}</span>
    </div>
  );
}

export default function GroundingDemo() {
  const [filter, setFilter] = useState('all');
  const [i, setI] = useState(0);
  const list = data.cases.filter((c) => filter === 'all' || c.outcome === filter);
  const c = list[Math.min(i, list.length - 1)];
  const step = (d) => setI((v) => (v + d + list.length) % list.length);

  return (
    <div
      className={s.demo}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      }}
    >
      <div className={s.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.img} alt={`Rendered point cloud of ${c.scene} with numbered objects`} />
        <svg className={s.overlay} viewBox="0 0 100 100" aria-hidden="true">
          <Ring pos={c.pos2b} ok={c.iou2b >= 0.25} label="2B" />
          <Ring pos={c.pos4b} ok={c.iou4b >= 0.25} label="4B" />
        </svg>
      </div>
      <div className={s.panel}>
        <div className={s.filters} role="group" aria-label="Filter cases">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={blocks.btn}
              aria-pressed={filter === f.key}
              onClick={() => { setFilter(f.key); setI(0); }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className={s.kicker}>Query</span>
        <p className={s.query} aria-live="polite">{c.query}</p>
        <div className={s.picks}>
          <PickRow model="4b" id={c.pred4b} iou={c.iou4b} pos={c.pos4b} />
          <PickRow model="2b" id={c.pred2b} iou={c.iou2b} pos={c.pos2b} />
        </div>
        <div className={s.nav}>
          <button type="button" className={blocks.btn} onClick={() => step(-1)} aria-label="Previous case">← Prev</button>
          <span className={s.count}>{list.indexOf(c) + 1} / {list.length}</span>
          <button type="button" className={blocks.btn} onClick={() => step(1)} aria-label="Next case">Next →</button>
        </div>
      </div>
    </div>
  );
}
