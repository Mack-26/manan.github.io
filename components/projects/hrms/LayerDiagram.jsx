import s from './hrms.module.css';

// The app's Clean Architecture layers, as laid out in the repo's lib/ folder.
const LAYERS = [
  { name: 'Presentation', note: 'Flutter UI · BLoC / Cubit', chips: ['attendance', 'employee', 'events', 'expenses', 'leave', 'travel'] },
  { name: 'Domain', note: 'pure Dart, no Flutter', chips: ['entities', 'use cases', 'repository interfaces'], tone: 'domain' },
  { name: 'Data', note: 'models · repositories', chips: ['REST API client', 'Hive offline cache', 'shared preferences'] },
];

export default function LayerDiagram() {
  return (
    <div className={s.layers} role="list" aria-label="App architecture layers">
      {LAYERS.map((l, i) => (
        <div key={l.name} role="listitem">
          <div className={s.layer} data-tone={l.tone}>
            <div className={s.layerName}>
              {l.name}
              <small>{l.note}</small>
            </div>
            <div className={s.chips}>
              {l.chips.map((c) => <span key={c} className={s.chip}>{c}</span>)}
            </div>
          </div>
          {i < LAYERS.length - 1 && <div className={s.arrowDown} aria-hidden="true">↓ calls</div>}
        </div>
      ))}
    </div>
  );
}
