import s from './home.module.css';
import { RESUME_URL } from './SiteHeader';

export const LINKS = {
  github: 'https://github.com/Mack-26',
  linkedin: 'https://www.linkedin.com/in/mananarora2611/',
  email: 'aromanan@umich.edu',
};

export default function About() {
  return (
    <section id="about" className={`${s.wrap} ${s.about} ${s.snap}`}>
      <div className={s.aboutGrid}>
        <div className={s.kicker}>
          <span>About</span>
        </div>
        <p className={`${s.aboutP} ${s.p1}`}>
          I’m Manan, an AI engineer and researcher doing my MS in Electrical &amp; Computer Engineering at
          the University of Michigan.
        </p>

        {/* Right column on desktop; between paragraphs 1 and 2 on mobile. */}
        <figure className={s.photo}>
          <div className={s.photoFrame}>
            <img
              className={s.phB}
              src="/assets/photo-dive.jpg"
              alt="Manan sitting cross-legged in mid-water on a scuba dive, bubbles rising above him"
              style={{ objectPosition: '50% 40%' }}
            />
            <img
              className={s.phA}
              src="/assets/photo-hike.jpg"
              alt="Manan smiling on a canyon hike, red cliffs and a river behind him"
              style={{ objectPosition: '50% 30%' }}
            />
          </div>
          <figcaption className={s.photoCaption}>
            <span className={s.capText}>
              <span className={s.phA}>Out on a canyon hike.</span>
              <span className={s.phB}>Mid-dive, holding very still.</span>
            </span>
            <span aria-hidden="true" className={s.capBars}>
              <span className={s.phA} />
              <span className={s.phB} />
            </span>
          </figcaption>
        </figure>

        <p className={`${s.aboutP} ${s.p2}`}>
          These days I’ve been spending most of my time messing around with reinforcement learning and
          vision-language models.
        </p>
        <p className={`${s.aboutP} ${s.p3}`}>
          I learn best by building, so a lot of what’s here started as a question I wanted to see working
          for myself. I’d love to give back too, so if there’s any way I can help, my inbox is open :)
        </p>
        <div className={s.links}>
          <a className={s.link} href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
          <a className={s.link} href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a className={s.link} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a className={s.link} href={`mailto:${LINKS.email}`}>
            Email
          </a>
        </div>
      </div>
      <a href="#explore" className={s.next}>
        <span>next · what I’m exploring</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
