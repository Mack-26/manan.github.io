import Link from 'next/link';
import s from './home.module.css';

// Placeholder for routes the new nav links to before their pages exist.
export default function StubPage({ kicker, title, blurb, archive }) {
  return (
    <main className={s.page}>
      <section className={s.wrap} style={{ paddingTop: 48, paddingBottom: 120 }}>
        <div className={s.sectionHead} style={{ alignItems: 'flex-start', flexDirection: 'column', gap: 18 }}>
          <div className={s.kicker}>
            <span>{kicker}</span>
          </div>
          <div className={s.sectionTitle}>
            <h1 className={s.h2}>{title}</h1>
            <span className={s.sub}>{blurb}</span>
          </div>
          <div className={s.links} style={{ marginTop: 12 }}>
            {archive && (
              <Link className={s.link} href={archive.href}>
                {archive.label} →
              </Link>
            )}
            <Link className={s.link} href="/">
              ← Back home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
