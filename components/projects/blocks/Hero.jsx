import Link from 'next/link';
import s from './blocks.module.css';
import QuickFacts from './QuickFacts';

export default function Hero({ eyebrow, title, subtitle, media, facts }) {
  return (
    <header>
      <Link href="/projects" className={s.back}>← All projects</Link>
      {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
      <h1 className={s.title}>{title}</h1>
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      {facts && <QuickFacts facts={facts} />}
      {media && <div className={s.heroMedia}>{media}</div>}
    </header>
  );
}
