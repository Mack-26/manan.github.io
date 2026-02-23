'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',         label: 'Home'     },
  { href: '/projects', label: 'Projects' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '1.4rem clamp(1.5rem, 4vw, 3.5rem)',
        color: 'var(--text)',
        pointerEvents: 'none',
      }}
    >
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', pointerEvents: 'auto' }}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="link-line"
            style={{
              fontSize: '0.78rem',
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              opacity: (href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 1 : 0.55,
              color: 'var(--text)',
            }}
          >
            {label}
          </Link>
        ))}

        {/* Resume pill */}
        <a
          href="/artifacts/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.78rem',
            fontWeight: 400,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '0.4rem 1.1rem',
            border: '1px solid var(--text)',
            borderRadius: '100px',
            color: 'var(--text)',
          }}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
