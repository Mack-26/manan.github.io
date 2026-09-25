'use client';

import { useState } from 'react';
import s from './home.module.css';
import x from './Experience.module.css';
import { useWidth } from './Explore';

const ENTRIES = [
  { org: 'University of Mumbai', dates: '2019 — 2023', role: 'B.Tech · Electronics & Telecommunication', line: 'Sardar Patel Institute of Technology.', logo: { src: '/assets/logo-spit.png', alt: 'University of Mumbai logo', square: true } },
  { org: 'AuxoAI', dates: '2023 — 2025', role: 'AI Engineer', line: 'Built retrieval and text-to-SQL systems for an enterprise AI platform.', logo: { src: '/assets/logo-auxoai.png', alt: 'AuxoAI logo' } },
  { org: 'University of Michigan', dates: '2025 — 2027', role: 'MS · Electrical & Computer Engineering', line: 'Signal processing and machine learning.', logo: { src: '/assets/logo-umich.svg', alt: 'University of Michigan logo', square: true }, current: true },
  { org: 'UMich Research', dates: '2025 — present', role: 'AI Researcher', line: 'Reinforcement learning, VLMs and multimodal learning.', logo: { src: '/assets/logo-umich.svg', alt: 'University of Michigan logo', square: true }, branch: true },
  { org: 'Honeywell', dates: 'Summer 2026', role: 'AI Engineering Intern', line: 'Language models for edge AI and multi-agent systems.', logo: { src: '/assets/logo-honeywell.svg', alt: 'Honeywell logo' } },
];

// Desktop geometry from design/Home.dc.html (a 1248 × 420 canvas).
const W0 = 1248, H0 = 420;
const DOTS = [
  { left: -10, top: 194, size: 12 },
  { left: 250, top: 194, size: 12 },
  { left: 520, top: 194, size: 18 },
  { left: 630, top: 306, size: 11, color: '#4E5A2E' },
  { left: 880, top: 194, size: 12 },
];
const TEXT = [
  { left: 0, top: 242, width: 230 },
  { left: 260, top: 242, width: 230 },
  { left: 530, bottom: 236, width: 330, big: true },
  { left: 672, top: 252, width: 210 },
  { left: 890, top: 242, width: 140 },
];

function Logo({ e, size }) {
  if (e.logo && e.logo.square)
    return (
      <span className={x.tile} style={{ width: size, height: size }}>
        <img src={e.logo.src} alt={e.logo.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </span>
    );
  if (e.logo)
    return (
      <span className={x.tile} style={{ height: size, alignSelf: 'flex-start' }}>
        <img src={e.logo.src} alt={e.logo.alt} style={{ height: size === 52 ? 18 : 16, width: 'auto' }} />
      </span>
    );
  // Placeholder tile until the real logo is supplied.
  return (
    <span className={`${x.tile} ${x.initials}`} style={{ width: size, height: size }} role="img" aria-label={`${e.org} logo`}>
      {e.initials}
    </span>
  );
}

function Desktop() {
  const [xp, setXp] = useState(2);
  const [ref, w] = useWidth();
  // Horizontal positions stretch with the row; vertical layout and type stay at design size.
  const f = w ? w / W0 : 1;
  const X = (n) => Math.round(n * f);
  const W = X(W0);

  return (
    <div ref={ref} className={x.desk} style={{ height: H0 }}>
      <div className={x.canvas} style={{ width: W, height: H0 }}>
        <svg width={W} height={H0} viewBox={`0 0 ${W} ${H0}`} aria-hidden="true" className={x.lines}>
          <line x1="10" y1="214" x2={X(900)} y2="214" stroke="#1C1C1C" strokeWidth="1.5" />
          <path d={`M${X(540)},214 C${X(540)},314 ${X(580)},326 ${X(650)},326`} fill="none" stroke="#1C1C1C" strokeWidth="1.2" />
          <line x1={X(900)} y1="214" x2={X(1128) - 16} y2="214" stroke="#1C1C1C" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
          <line x1={X(1128) + 18} y1="214" x2={W - 2} y2="214" stroke="#9A9A9A" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
          <circle cx={X(1128)} cy="214" r="14" fill="#FEFEFE" stroke="#1C1C1C" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx={X(540)} cy="214" r="17" fill="none" stroke="#B7C396" strokeWidth="5" className={x.pulse} />
        </svg>

        {ENTRIES.map((e, i) => {
          const on = xp === i, d = DOTS[i], t = TEXT[i];
          const pick = () => setXp(i);
          return (
            <div key={e.org}>
              <button
                type="button"
                className={x.dotBtn}
                aria-label={`${e.org}, ${e.dates}`}
                aria-pressed={on}
                onClick={pick}
                onMouseEnter={pick}
                onFocus={pick}
                style={{ left: X(d.left + 20) - 20, top: d.top }}
              >
                <span
                  style={{ width: d.size, height: d.size, background: d.color || '#1C1C1C', transform: on ? 'scale(1.3)' : 'none' }}
                />
              </button>
              <div
                className={x.entry}
                onMouseEnter={pick}
                onClick={pick}
                style={{ left: X(t.left), top: t.top, bottom: t.bottom, width: Math.max(130, X(t.width)) }}
              >
                <Logo e={e} size={52} />
                <span className={x.dates}>{e.dates}</span>
                <span className={x.org} style={{ fontSize: t.big ? 24 : 21, color: on ? '#1C1C1C' : '#4A4A4A' }}>
                  {e.org}
                </span>
                <span className={x.role}>{e.role}</span>
                {on && <span className={`${x.line} ${s.in}`}>{e.line}</span>}
              </div>
            </div>
          );
        })}

        <div className={x.future} style={{ left: X(1060), top: 244, width: W - X(1060) }}>
          <span className={x.futureKicker}>Open to infinite possibilities</span>
          <span className={x.futureText}>The next chapter is still being written.</span>
        </div>
      </div>
    </div>
  );
}

// Mobile: vertical, latest first.
function Mobile() {
  const order = [4, 3, 2, 1, 0];
  return (
    <ol className={x.mob}>
      <li className={x.mItem}>
        <span aria-hidden="true" className={x.mDash} />
        <span aria-hidden="true" className={x.mFutureDot} />
        <div className={x.future}>
          <span className={x.futureKicker}>Open to infinite possibilities</span>
          <span className={x.futureText}>The next chapter is still being written.</span>
        </div>
      </li>
      {order.map((i, n) => {
        const e = ENTRIES[i], last = n === order.length - 1;
        return (
          <li key={e.org} className={`${x.mItem} ${e.branch ? x.mBranch : ''}`}>
            <span aria-hidden="true" className={x.mLine} style={{ top: n === 0 ? 24 : 0, bottom: last ? 'calc(100% - 24px)' : 0 }} />
            {e.branch && (
              <svg width="32" height="44" viewBox="0 0 32 44" aria-hidden="true" className={x.mCurve}>
                <path d="M30,0 C30,30 0,18 0,44" fill="none" stroke="#1C1C1C" strokeWidth="1.2" />
              </svg>
            )}
            <span
              aria-hidden="true"
              className={`${x.mDot} ${e.current ? x.mDotCurrent : ''} ${e.branch ? x.mDotBranch : ''}`}
            />
            <Logo e={e} size={48} />
            <span className={x.dates}>{e.dates}</span>
            <span className={x.org} style={{ fontSize: 20 }}>
              {e.org}
            </span>
            <span className={x.role}>{e.role}</span>
            <span className={x.line}>{e.line}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default function Experience() {
  return (
    <section id="experience" className={`${s.wrap} ${s.snap}`}>
      <div className={s.experience}>
        <div className={s.sectionHead}>
          <div className={s.sectionTitle}>
            <h2 className={s.h2}>My Experience</h2>
            <span className={s.sub}>A few places I’ve learned, built, and worked.</span>
          </div>
        </div>
        <div className={s.wideOnly}>
          <Desktop />
        </div>
        <div className={s.narrowOnly}>
          <Mobile />
        </div>
      </div>
    </section>
  );
}
