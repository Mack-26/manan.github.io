import s from './blocks.module.css';

const PROVENANCE = {
  real: 'Real output',
  replotted: 'Re-plotted from logs',
  illustrative: 'Illustrative',
};

export default function Figure({ children, caption, provenance, bare }) {
  return (
    <figure className={s.figure}>
      <div className={`${s.figureBody} ${bare ? s.bare : ''}`}>{children}</div>
      {(caption || provenance) && (
        <figcaption className={s.caption}>
          {provenance && (
            <span className={s.provenance} data-kind={provenance}>{PROVENANCE[provenance]}</span>
          )}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
