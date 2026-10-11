import Link from 'next/link';
import s from './FeaturedCard.module.css';

export function FeaturedGrid({ children }) {
  return <div className={s.grid}>{children}</div>;
}

export default function FeaturedCard({ project }) {
  const { card } = project;
  return (
    <Link href={`/projects/${project.slug}`} className={s.card}>
      <div className={s.thumb}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.thumb} alt="" loading="lazy" />
      </div>
      <div className={s.body}>
        <div className={s.top}>
          <span className={s.type}>{project.type}</span>
          <span>{project.meta}</span>
        </div>
        <h2 className={s.title}>{project.title}</h2>
        <p className={s.hook}>{card.hook}</p>
        <div className={s.tags}>
          {project.tags.map((t) => (
            <span key={t} className={s.tag}>{t}</span>
          ))}
        </div>
        <div className={s.metric}>
          <span className={s.metricValue}>{card.metric.value}</span>
          {card.metric.placeholder && <span className={s.prelim} title="Preliminary value, to be replaced">prelim.</span>}
          <span className={s.metricLabel}>{card.metric.label}</span>
        </div>
      </div>
    </Link>
  );
}
