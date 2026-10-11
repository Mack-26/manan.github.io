'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import s from './blocks.module.css';

// Muted looping clip. With reduced motion it stays on the poster until played.
export default function Video({ src, poster, label }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    v.play().catch(() => {});
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className={s.video}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {label && <span className={s.videoLabel}>{label}</span>}
      <button type="button" className={s.playBtn} onClick={toggle}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
