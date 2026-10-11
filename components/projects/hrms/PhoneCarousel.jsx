'use client';

import { useRef } from 'react';
import blocks from '@/components/projects/blocks/blocks.module.css';
import s from './hrms.module.css';

const SCREENS = [
  { src: '/projects/hrms/screens/home.jpg', title: 'Home', body: 'Clock in, today’s tasks and leave balance, the first thing you see.' },
  { src: '/projects/hrms/screens/clockin-v2.jpg', title: 'Clock-in', body: 'Pick office or on tour, then a guided selfie.' },
  { src: '/projects/hrms/screens/selfie.jpg', title: 'Selfie check', body: 'Confirm the photo is clear before it’s logged.' },
  { src: '/projects/hrms/screens/notifications.jpg', title: 'Manager inbox', body: 'Requests sorted by type, approve or reject in one tap.' },
  { src: '/projects/hrms/screens/calendar.jpg', title: 'Company calendar', body: 'Holidays, events and birthdays in one shared place.' },
];

export default function PhoneCarousel() {
  const rail = useRef(null);
  const scroll = (dir) => {
    const el = rail.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <div className={s.carousel}>
      <div className={s.rail} ref={rail} tabIndex={0} aria-label="App screens">
        {SCREENS.map((sc) => (
          <figure key={sc.src} className={s.slide}>
            <div className={s.phone}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sc.src} alt={`${sc.title} screen`} loading="lazy" />
            </div>
            <figcaption className={s.slideCap}>
              <strong>{sc.title}</strong>
              {sc.body}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={s.controls}>
        <button type="button" className={blocks.btn} onClick={() => scroll(-1)} aria-label="Previous screens">←</button>
        <button type="button" className={blocks.btn} onClick={() => scroll(1)} aria-label="Next screens">→</button>
      </div>
    </div>
  );
}
