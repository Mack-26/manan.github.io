'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section
      className="hero-grid"
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* ── Left: Text content ─────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(2rem, 5vw, 5rem) clamp(4rem, 6vw, 6rem)',
        }}
      >
        {/* Greeting */}
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--fg-muted)',
            marginBottom: '1rem',
            letterSpacing: '0.01em',
          }}
        >
          Hi, I&apos;m Manan 👋
        </p>

        {/* Main heading */}
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}
        >
          AI Engineer &amp;
        </h1>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
            marginBottom: '2rem',
          }}
        >
          Researcher
        </h1>

        {/* Sub-copy */}
        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--fg-muted)',
            maxWidth: '420px',
            marginBottom: '2.5rem',
          }}
        >
          MS @ University of Michigan. Building AI for a better world.
          Environmentalist by conviction, engineer by craft, highly caffeinated by necessity.
        </p>

        {/* CTA */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-block',
              padding: '0.8rem 2rem',
              background: 'var(--text)',
              color: '#ffffff',
              borderRadius: '100px',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
              transition: 'opacity 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Projects →
          </Link>
        </div>

        {/* Social pills */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Email', href: 'mailto:aromanan@umich.edu' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mananarora2611/', external: true },
            { label: 'GitHub', href: 'https://github.com/Mack-26', external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              style={{
                fontSize: '0.8rem',
                fontWeight: 500,
                padding: '0.45rem 1.1rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: 'var(--fg-muted)',
                transition: 'border-color 0.25s, color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--text)';
                e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--fg-muted)';
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right: Photo ───────────────────────────────── */}
      <div
        className="hero-photo-col"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          overflow: 'hidden',
        }}
      >
        {/* Warm blob behind the photo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '75%',
            aspectRatio: '1',
            background: '#FDEBD0',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            zIndex: 0,
          }}
        />

        {/* Photo — smaller than the blob so the blob shows around it */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '58%',
            maxWidth: '380px',
            aspectRatio: '3 / 4',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          }}
        >
          <Image
            src="/images/profile/manan-hero.jpg"
            alt="Manan Arora"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: 'contrast(1.08) saturate(1.05)',
            }}
          />
        </div>
      </div>

    </section>
  );
}
