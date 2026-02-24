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
          Building AI for a better world. Engineer by craft, founder mindset, highly caffeinated by necessity.
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
            {
              label: 'Email',
              href: 'mailto:aromanan@umich.edu',
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              ),
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/mananarora2611/',
              external: true,
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              ),
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Mack-26',
              external: true,
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              ),
            },
          ].map(({ label, href, external, icon }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                padding: '0.5rem 1.1rem',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                color: 'var(--fg)',
                background: 'var(--bg-subtle, rgba(0,0,0,0.03))',
                transition: 'border-color 0.25s, color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--text)';
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.background = 'var(--bg-subtle, rgba(0,0,0,0.06))';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--fg)';
                e.currentTarget.style.background = 'var(--bg-subtle, rgba(0,0,0,0.03))';
              }}
            >
              {icon}
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

        {/* Photo  -  smaller than the blob so the blob shows around it */}
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
