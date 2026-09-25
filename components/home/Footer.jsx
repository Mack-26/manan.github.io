import s from './home.module.css';
import { RESUME_URL } from './SiteHeader';
import { LINKS } from './About';

export default function Footer() {
  return (
    <footer id="contact" className={`${s.footer} ${s.snapEnd}`}>
      <div className={`${s.wrap} ${s.footerInner}`}>
        <div className={s.footerRow}>
          <div className={s.sectionTitle}>
            <span className={s.talk}>Let’s talk.</span>
            <span className={s.talkSub}>Ideas, research, or just a coffee. My inbox is open.</span>
          </div>
          <div className={s.footerLinks}>
            <a className={s.link} href={`mailto:${LINKS.email}`}>
              {LINKS.email}
            </a>
            <a className={s.link} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className={s.link} href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a className={s.link} href={RESUME_URL} target="_blank" rel="noopener noreferrer">
              Résumé ↗
            </a>
          </div>
        </div>
        <span className={s.copy}>© 2026 Manan Arora</span>
      </div>
    </footer>
  );
}
