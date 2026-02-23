'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Horizontal slideshow supporting both images and videos.
 * Props:
 *   slides: Array<{ type: 'image'|'video', src: string, caption?: string }>
 *   theme: 'light' | 'dark'  (controls dot/arrow colors)
 */
export default function Slideshow({ slides = [], theme = 'light' }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const dragStart = useRef(0);

  const go = useCallback(
    (next) => {
      const clamped = (next + slides.length) % slides.length;
      setDirection(clamped > index || (index === slides.length - 1 && clamped === 0) ? 1 : -1);
      setIndex(clamped);
    },
    [index, slides.length]
  );

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const dotColor   = theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)';
  const dotActive  = theme === 'dark' ? '#ffffff' : '#1a1a1a';
  const arrowColor = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.07)';
  const arrowHover = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.14)';

  const slide = slides[index];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit' }}>
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={(_, info) => { dragStart.current = info.point.x; }}
          onDragEnd={(_, info) => {
            const delta = info.point.x - dragStart.current;
            if (Math.abs(delta) > 60) delta < 0 ? next() : prev();
          }}
          style={{ position: 'absolute', inset: 0, cursor: 'grab' }}
        >
          {slide.type === 'video' ? (
            <video
              src={slide.src}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.caption || ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
              draggable={false}
            />
          )}

          {/* Caption */}
          {slide.caption && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2.5rem 1.5rem 1.25rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}>
              {slide.caption}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, background: arrowColor, border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'background 0.2s',
              color: theme === 'dark' ? '#fff' : '#1a1a1a',
            }}
            onMouseEnter={e => e.currentTarget.style.background = arrowHover}
            onMouseLeave={e => e.currentTarget.style.background = arrowColor}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, background: arrowColor, border: 'none', borderRadius: '50%',
              width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', backdropFilter: 'blur(4px)', transition: 'background 0.2s',
              color: theme === 'dark' ? '#fff' : '#1a1a1a',
            }}
            onMouseEnter={e => e.currentTarget.style.background = arrowHover}
            onMouseLeave={e => e.currentTarget.style.background = arrowColor}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 6, zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 100,
                background: i === index ? dotActive : dotColor,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
