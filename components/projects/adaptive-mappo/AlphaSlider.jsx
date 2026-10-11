'use client';

import { useState } from 'react';
import s from './mappo.module.css';

// Illustrative values: one moment where the two critics disagree.
const V_GLOBAL = 0.8;
const V_LOCAL = 0.3;

function Bar({ label, note, value, color, strong }) {
  return (
    <>
      <span className={`${s.barLabel} ${strong ? s.strong : ''}`}>{label}<small>{note}</small></span>
      <span className={s.track}><span className={s.fill} style={{ width: `${value * 100}%`, background: color }} /></span>
      <span className={s.val}>{value.toFixed(2)}</span>
    </>
  );
}

export default function AlphaSlider() {
  const [alpha, setAlpha] = useState(0.5);
  const mix = alpha * V_GLOBAL + (1 - alpha) * V_LOCAL;
  return (
    <div className={s.slider}>
      <div className={s.bars}>
        <Bar label="Team critic" note="sees every agent" value={V_GLOBAL} color="var(--olive)" />
        <Bar label="Own critic" note="sees only me" value={V_LOCAL} color="var(--rose)" />
        <Bar label="Value PPO uses" note="the blend" value={mix} color="var(--ink)" strong />
      </div>
      <div>
        <label htmlFor="alpha-range" className={s.barLabel}>Drag α: {alpha.toFixed(2)}</label>
        <input
          id="alpha-range"
          className={s.range}
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={alpha}
          onChange={(e) => setAlpha(Number(e.target.value))}
        />
        <div className={s.rangeLabels}><span>0 · IPPO (own only)</span><span>1 · MAPPO (team only)</span></div>
      </div>
      <div className={s.formula}>
        v = <b>{alpha.toFixed(2)}</b> × {V_GLOBAL} + {(1 - alpha).toFixed(2)} × {V_LOCAL} = {mix.toFixed(2)}
      </div>
    </div>
  );
}
