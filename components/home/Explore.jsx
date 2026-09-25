'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import s from './home.module.css';
import PerceivePanel from './panels/perceive/PerceivePanel';
import LearnPanel from './panels/learn/LearnPanel';
import ReasonPanel from './panels/reason/ReasonPanel';

// minDesk: narrowest width at which the panel's desktop layout still fits (tabs mode).
const PANELS = [
  { num: '01', name: 'Perceive', q: 'What does a machine see?', tags: 'computer vision · segmentation · depth · VLM', Panel: PerceivePanel, pin: 'left', minDesk: 760 },
  { num: '02', name: 'Learn', q: 'Can a machine learn to play?', tags: 'reinforcement learning · multi-agent · MAPPO', Panel: LearnPanel, pin: 'center', minDesk: 620 },
  { num: '03', name: 'Reason', q: 'How does a machine decide what to say next?', tags: 'transformers · attention · language models', Panel: ReasonPanel, pin: 'center', minDesk: 860 },
];

const GAP = 12;
const OPEN = 0.756; // open card's share of the row (944 of 1248 in the design)
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function useMedia(query) {
  const [match, setMatch] = useState(null); // null until mounted: panels are client-only
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return match;
}

export function useWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure now (before paint), then track resizes.
    setW(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function useViewportHeight() {
  const [h, setH] = useState(900);
  useEffect(() => {
    const update = () => setH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return h;
}

// ≥1200px: three cards side by side; clicking one widens it and folds the others into strips.
function DesktopCards({ reduced }) {
  const [sel, setSel] = useState(-1);
  const [rowRef, W] = useWidth();
  const vh = useViewportHeight();
  // Fill the screen below the heading, within sensible bounds (design: 600).
  const H = Math.round(clamp(vh - 230, 560, 720));
  const eq = (W - 2 * GAP) / 3, open = Math.round(W * OPEN), mini = (W - open - 2 * GAP) / 2;
  const t = sel >= 0 ? PANELS[sel] : null;

  return (
    <>
      <div className={s.qStrip} style={{ height: t ? 96 : 0 }} aria-live="polite">
        {t && (
          <div key={sel} className={`${s.qStripInner} ${s.up}`}>
            <span className={s.qNum}>
              {t.num} / {t.name.toUpperCase()}
            </span>
            <span className={s.qText}>{t.q}</span>
          </div>
        )}
      </div>
      <div ref={rowRef} className={s.cards}>
        {W > 0 &&
          PANELS.map((p, i) => {
            const on = sel === i;
            const { Panel } = p;
            return (
              <div
                key={p.name}
                className={s.card}
                role="region"
                aria-label={`${p.num} ${p.name} — ${p.q}`}
                style={{ width: sel < 0 ? eq : on ? open : mini, height: H }}
              >
                {/* The demo always lays out at the open size and is clipped by the card. */}
                <div
                  className={s.stage}
                  style={{
                    width: open,
                    height: H,
                    left: p.pin === 'left' ? 0 : `calc(50% - ${open / 2}px)`,
                    pointerEvents: on ? 'auto' : 'none',
                  }}
                  inert={!on}
                >
                  <Panel
                    layout="desktop"
                    size={{ w: open, h: H }}
                    reduced={reduced}
                    compact={p.name === 'Reason' ? !on : undefined}
                    peekW={eq}
                  />
                </div>

                <div className={s.fade} style={{ opacity: sel < 0 ? 1 : 0 }}>
                  <div
                    className={s.fadeText}
                    style={{ transform: sel < 0 ? 'none' : on ? 'translateY(-120px)' : 'translateY(-40px)' }}
                  >
                    <span className={s.cNum}>{p.num}</span>
                    <span className={s.cName}>{p.name}</span>
                    <span className={s.cQ}>{p.q}</span>
                    <div className={s.cMeta}>
                      <span>{p.tags}</span>
                      <span aria-hidden="true">open →</span>
                    </div>
                  </div>
                </div>

                {sel >= 0 && !on && (
                  <div className={`${s.mini} ${s.in}`} aria-hidden="true">
                    <span className={s.cNum}>{p.num}</span>
                    <span className={s.miniName}>{p.name}</span>
                    <span className={s.plus}>+</span>
                  </div>
                )}

                {!on && (
                  <button
                    type="button"
                    className={s.cardHit}
                    aria-expanded="false"
                    aria-label={`Open ${p.num} ${p.name}: ${p.q}`}
                    onClick={() => setSel(i)}
                  />
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

// <1200px: tabs + one full-width panel. Uses the panel's desktop layout when it fits
// (tablets, small laptops), otherwise its phone layout.
function Tabs({ reduced }) {
  const [sel, setSel] = useState(0);
  const [areaRef, W] = useWidth();
  const vh = useViewportHeight();
  const p = PANELS[sel];
  const { Panel } = p;
  const desk = W >= p.minDesk;
  const H = Math.round(clamp(vh - 260, 520, 640));

  return (
    <>
      <div role="tablist" aria-label="What I’m exploring" className={s.tabs}>
        {PANELS.map((t, i) => {
          const on = sel === i;
          return (
            <button
              key={t.name}
              type="button"
              role="tab"
              id={`explore-tab-${i}`}
              aria-selected={on}
              aria-controls="explore-tabpanel"
              onClick={() => setSel(i)}
              className={s.tab}
              style={{ background: on ? 'var(--ink)' : 'var(--paper)', color: on ? 'var(--paper)' : 'var(--ink)' }}
            >
              <span>{t.num}</span>
              <span>{t.name}</span>
            </button>
          );
        })}
      </div>
      <div key={`q${sel}`} className={s.in2} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span className={s.qNum}>
          {p.num} / {p.name.toUpperCase()}
        </span>
        <span className={s.qText}>{p.q}</span>
      </div>
      <div ref={areaRef} id="explore-tabpanel" role="tabpanel" aria-labelledby={`explore-tab-${sel}`}>
        {W > 0 && (
          <div
            key={`${p.name}-${desk ? 'd' : 'm'}`}
            className={`${s.mPanel} ${s.in}`}
            style={desk ? { height: H } : undefined}
          >
            <Panel
              layout={desk ? 'desktop' : 'mobile'}
              size={desk ? { w: W, h: H } : { w: W }}
              reduced={reduced}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default function Explore() {
  // Cards need the open card ≥ ~800px wide for the Reason demo; below that, tabs.
  const wide = useMedia('(min-width: 1200px)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');

  return (
    <section id="explore" className={`${s.wrap} ${s.snap}`}>
      <div className={s.explore}>
        <div className={s.sectionHead}>
          <div className={s.sectionTitle}>
            <h2 className={s.h2}>What I’m exploring</h2>
            <span className={s.sub}>How machines perceive, learn, and reason.</span>
          </div>
          <Link href="/work" className={s.pill}>
            Explore my work →
          </Link>
        </div>

        {wide === null ? (
          <div className={s.placeholder} style={{ height: 560, marginTop: 28 }} aria-hidden="true" />
        ) : wide ? (
          <DesktopCards reduced={!!reduced} />
        ) : (
          <Tabs reduced={!!reduced} />
        )}
      </div>
    </section>
  );
}
