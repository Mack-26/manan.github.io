'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Slideshow from './Slideshow';

/* ── Michigan slideshow slides ── */
const MICHIGAN_SLIDES = [
  { type: 'image', src: '/images/profile/me_at_uni.jpg',        caption: 'First day on Central Campus' },
  { type: 'image', src: '/images/michigan/library_study.jpg',   caption: 'Late nights in the Duderstadt' },
  { type: 'image', src: '/images/michigan/group_study.jpg',     caption: 'Study sessions with the crew' },
  { type: 'image', src: '/images/michigan/my_schedule.jpg',     caption: 'No free blocks — just vibes' },
  { type: 'image', src: '/images/michigan/detroit_river.jpg',   caption: 'Detroit river in January' },
  { type: 'image', src: '/images/michigan/pride_of_detroit.jpg',caption: 'GM Ren Cen at dusk' },
  { type: 'video', src: '/images/michigan/umich_football.mp4',  caption: 'Michigan vs. ??? — Big House energy' },
];

/* ── Dive slideshow slides ── */
const DIVE_SLIDES = [
  { type: 'image', src: '/images/dive/IMG_6147.jpeg', caption: 'Finding nirvana at 18m' },
];

/* ── Experience data ── */
const EXPERIENCE = [
  {
    role: 'MS in Computer Science',
    org: 'University of Michigan',
    period: 'Aug 2024 – Present',
    desc: 'Specialisation in AI/ML. Research in VLMs, climate ML, and EV battery prediction.',
  },
  {
    role: 'AI Engineer Intern',
    org: 'AuxoAI',
    period: 'May 2024 – Aug 2024',
    desc: 'Built production RAG pipelines and LLM-powered workflow automation tools.',
  },
  {
    role: 'BE in Computer Engineering',
    org: 'SPIT, Mumbai University',
    period: 'Aug 2020 – May 2024',
    desc: 'Published IEEE research on blockchain birth certificates. Led multiple engineering projects.',
  },
];

/* ── Fade-up variant ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* ────────────────────────────────────────────────────────── */

export default function AboutClient() {
  /* Ref for the airplane transition section */
  const transitionRef = useRef(null);

  /* Scroll progress scoped to the transition section */
  const { scrollYProgress: planeProgress } = useScroll({
    target: transitionRef,
    offset: ['start end', 'end start'],
  });

  /* Airplane moves left → right as user scrolls through the transition strip */
  const planeX  = useTransform(planeProgress, [0.1, 0.9], ['-10%', '110%']);
  /* Slight vertical oscillation for realism */
  const planeY  = useTransform(planeProgress, [0, 0.5, 1], [12, -8, 6]);
  /* Strip background fades from deep blue → white */
  const stripBg = useTransform(
    planeProgress,
    [0, 0.5, 1],
    ['#0F2550', '#4a6fa5', '#ffffff']
  );

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ══════════════ SECTION 1 — MUMBAI ══════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #1B3F7A 0%, #0F2550 60%, #08183a 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '7rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background doodle pattern */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Cline x1='0' y1='30' x2='60' y2='30'/%3E%3Cline x1='30' y1='0' x2='30' y2='60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px',
        }} />

        {/* Big ambient circle */}
        <div aria-hidden style={{
          position: 'absolute', top: '-20%', right: '-15%', width: '60vw', height: '60vw',
          borderRadius: '50%', background: 'rgba(255, 200, 50, 0.04)', pointerEvents: 'none',
        }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ maxWidth: 680, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          {/* Flag + label */}
          <motion.p variants={fadeUp} style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}>
            🇮🇳 &nbsp;Chapter One
          </motion.p>

          {/* Hindi line */}
          <motion.p variants={fadeUp} style={{
            color: 'rgba(255,200,50,0.85)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
            fontWeight: 500, marginBottom: '1.5rem', letterSpacing: '0.05em',
          }}>
            मुंबई से हूँ — दिल अभी भी वहीं है
          </motion.p>

          {/* Big headline */}
          <motion.h1 variants={fadeUp} style={{
            color: '#ffffff',
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: '2rem',
          }}>
            Grew up in<br />Mumbai
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
          }}>
            Chaotic commutes on the Western Line, late-night Maggi, cricket in the
            lane, and building things that somehow worked. The city taught me to
            think fast and adapt faster.
          </motion.p>

          {/* Emoji tags */}
          <motion.div variants={fadeUp} style={{
            display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {['🌊 Marine Drive', '🚂 Local Trains', '🏏 Gully Cricket', '🍜 Maggi at 2am'].map(tag => (
              <span key={tag} style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 500,
                background: 'rgba(255,255,255,0.08)', borderRadius: 100,
                padding: '0.4rem 1rem', border: '1px solid rgba(255,255,255,0.12)',
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════ AIRPLANE TRANSITION ══════════════ */}
      <div
        ref={transitionRef}
        style={{ height: '50vh', position: 'relative', overflow: 'hidden' }}
      >
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: stripBg,
          }}
        />

        {/* Dashed flight path */}
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          style={{
            position: 'absolute', top: '50%', left: 0, width: '100%', height: 40,
            transform: 'translateY(-50%)', overflow: 'visible', pointerEvents: 'none',
          }}
        >
          <path
            d="M 0 10 Q 25 2 50 10 Q 75 18 100 10"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Airplane emoji — scroll-linked, works both directions */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            x: planeX,
            y: planeY,
            translateY: '-50%',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
          }}
        >
          ✈️
        </motion.div>

        {/* BOM → DTW labels */}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '2rem',
          color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          <span>BOM</span>
          <span style={{ opacity: 0.3 }}>·····</span>
          <span>DTW</span>
        </div>
      </div>

      {/* ══════════════ SECTION 2 — MICHIGAN ══════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>

          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ marginBottom: '3.5rem' }}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: '0.75rem',
            }}>
              🇺🇸 &nbsp;Chapter Two
            </motion.p>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--fg)', marginBottom: '1.25rem',
            }}>
              Now at Michigan
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--fg-muted)',
              lineHeight: 1.8, maxWidth: 540,
            }}>
              MS in CS at UMich. Building AI systems by day, exploring Detroit by
              weekend, and somehow staying sane through a packed schedule.
            </motion.p>
          </motion.div>

          {/* Two-column: slideshow + text */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>
            {/* Slideshow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 'clamp(340px, 50vw, 520px)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.10)',
              }}
            >
              <Slideshow slides={MICHIGAN_SLIDES} theme="light" />
            </motion.div>

            {/* Text block */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.h3 variants={fadeUp} style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 700,
                letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--fg)',
              }}>
                Building where it matters
              </motion.h3>
              <motion.p variants={fadeUp} style={{
                color: 'var(--fg-muted)', lineHeight: 1.9,
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', marginBottom: '1.5rem',
              }}>
                Moved 8,000 miles for a degree — ended up building robots, publishing
                research, and doing scuba diving between deadlines. Michigan hit
                different.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['VLM Research', 'Climate ML', 'EV Battery Prediction', 'Robotics', 'RAG Systems'].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ SECTION 3 — DIVE ══════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: '#050d1a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle underwater radial glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(0,120,180,0.25) 0%, transparent 70%)',
        }} />

        <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ marginBottom: '3.5rem' }}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem',
            }}>
              🤿 &nbsp;Outside the Lab
            </motion.p>
            <motion.h2 variants={fadeUp} style={{
              fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 1.05, color: '#ffffff', marginBottom: '1.25rem',
            }}>
              Certified Diver
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.8, maxWidth: 480,
            }}>
              There&apos;s no better debugging environment than 18 metres underwater,
              completely silent. PADI certified. Found nirvana.
            </motion.p>
          </motion.div>

          {/* Dive slideshow — full width, tall */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 'clamp(320px, 55vw, 560px)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            <Slideshow slides={DIVE_SLIDES} theme="dark" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════ SECTION 4 — EXPERIENCE + CONNECT ══════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: '#fafafa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
        }}
      >
        <div style={{
          maxWidth: 1080, margin: '0 auto', width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
        }}>

          {/* Experience timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: '2rem',
            }}>
              Experience
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} variants={fadeUp} style={{ display: 'flex', gap: '1.25rem' }}>
                  {/* Timeline dot + connector */}
                  <div style={{ paddingTop: 4, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: i === 0 ? 'var(--accent)' : 'var(--border)',
                      border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                      flexShrink: 0,
                    }} />
                    {i < EXPERIENCE.length - 1 && (
                      <div style={{ width: 1, flexGrow: 1, background: 'var(--border)', marginTop: 6 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--fg-faint)', marginBottom: 2, letterSpacing: '0.04em' }}>
                      {exp.period}
                    </p>
                    <p style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: 2 }}>{exp.role}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', marginBottom: '0.5rem' }}>{exp.org}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side: interests + connect */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: '1.5rem',
            }}>
              Interests
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '3rem' }}>
              {[
                'Large Language Models', 'Computer Vision', 'Robotics',
                'Reinforcement Learning', 'Climate Tech', 'Scientific ML',
                'SCUBA Diving', 'Cricket', 'Hindustani Music',
              ].map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} style={{
              fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: '1.5rem',
            }}>
              Let&apos;s connect
            </motion.p>
            <motion.p variants={fadeUp} style={{
              color: 'var(--fg-muted)', lineHeight: 1.8,
              fontSize: 'clamp(0.9rem, 1.8vw, 1rem)', marginBottom: '2rem',
            }}>
              Always up for research collabs, interesting projects, or just a
              conversation about AI over chai.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a href="mailto:aromanan@umich.edu" className="btn-primary" style={{ fontSize: '0.82rem' }}>
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/mananarora2611/"
                target="_blank" rel="noopener noreferrer"
                className="tag"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.6rem 1.5rem' }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Mack-26"
                target="_blank" rel="noopener noreferrer"
                className="tag"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '0.6rem 1.5rem' }}
              >
                GitHub ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
