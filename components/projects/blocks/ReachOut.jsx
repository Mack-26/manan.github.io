import s from './blocks.module.css';
import { LINKS } from '@/components/home/About';
import { RESUME_URL } from '@/components/home/SiteHeader';

export default function ReachOut({ line = 'Working on something like this? I’d love to hear about it.' }) {
  return (
    <section className={s.reach}>
      <p className={s.reachLine}>{line}</p>
      <div className={s.reachLinks}>
        <a className={s.reachPrimary} href={`mailto:${LINKS.email}`}>Email me</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Résumé ↗</a>
      </div>
    </section>
  );
}
