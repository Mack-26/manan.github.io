import Link from 'next/link';
import styles from './SiteHeader.module.css';

export const RESUME_URL = '/assets/Manan_Arora_Resume.pdf';

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/research', label: 'Research' },
  { href: '/writing', label: 'Writing' },
  { href: '/#about', label: 'About', desktopOnly: true },
  { href: RESUME_URL, label: 'Resume', external: true },
  { href: '/#contact', label: 'Contact' },
];

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Manan Arora
      </Link>
      <nav aria-label="Main" className={styles.nav}>
        {NAV.map(({ href, label, desktopOnly, external }) =>
          external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ) : (
            <Link key={label} href={href} className={desktopOnly ? styles.desktopOnly : undefined}>
              {label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
