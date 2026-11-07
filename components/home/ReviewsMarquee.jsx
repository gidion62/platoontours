'use client';

import { useEffect, useRef } from 'react';
import testimonials from '@/lib/testimonials';
import styles from './ReviewsMarquee.module.css';

// 12 reviews: the 3 original homepage ones, the 6 from the Destinations page,
// and 3 short excerpts taken word-for-word from the Tripadvisor listing.
const HOME_REVIEWS = [
  {
    name: 'Sarah M.',
    meta: 'Tripadvisor',
    text: 'The founders themselves guided us — you can feel the difference in how they read the terrain and the animals.',
  },
  {
    name: 'James & Priya K.',
    meta: 'Google',
    text: 'Our honeymoon safari was unforgettable. Private sundowners on the crater rim, exactly as promised.',
  },
  {
    name: 'Daniel R.',
    meta: 'Trustpilot',
    text: 'Small group, real expertise, zero tourist-trap energy. Booking again for Zanzibar.',
  },
];

const TRIPADVISOR_REVIEWS = [
  {
    name: 'NM',
    meta: 'Tripadvisor · Nov 2025',
    title: 'Exceptional Personalised Trip with Knowledgeable Guide',
    text: 'Almasi was patient, professional, knowledgeable and accommodating throughout.',
  },
  {
    name: 'Liam L',
    meta: 'Tripadvisor · May 2026',
    title: 'Magical Safari',
    text: 'I cannot recommend them enough, you can trust them with your eyes closed.',
  },
  {
    name: 'Jan V',
    meta: 'Tripadvisor · Jul 2026',
    title: 'Platoon Tours Safari',
    text: 'Without a doubt, they are the best.',
  },
];

const REVIEWS = [
  ...HOME_REVIEWS,
  ...testimonials.map((t) => ({ name: t.name, meta: t.time, title: t.title, text: t.text })),
  ...TRIPADVISOR_REVIEWS,
];

function Card({ r }) {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>★★★★★</div>
      {r.title ? <div className={styles.title}>{r.title}</div> : null}
      <p>&ldquo;{r.text}&rdquo;</p>
      <div className={styles.meta}>
        {r.name} · {r.meta}
      </div>
    </div>
  );
}

const LOOP_SECONDS = 65; // time for the strip to travel through all 12 cards once
const NUDGE = 700; // how far (px) an arrow click moves the strip

export default function ReviewsMarquee() {
  const trackRef = useRef(null);
  const state = useRef({ offset: 0, kick: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let half = track.scrollWidth / 2;
    const onResize = () => {
      half = track.scrollWidth / 2;
    };
    window.addEventListener('resize', onResize);
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const s = state.current;
      if (half > 0) {
        // continuous drift, plus a smoothly-decaying nudge from the arrows
        const step = reduce ? 0 : half / LOOP_SECONDS * dt;
        const eased = s.kick * (1 - Math.exp(-dt * 7));
        s.kick -= eased;
        s.offset = (((s.offset + step + eased) % half) + half) % half;
        track.style.transform = `translate3d(${-s.offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const nudge = (dir) => {
    state.current.kick += dir * NUDGE;
  };

  return (
    <div className={styles.wrap}>
      <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Previous reviews" onClick={() => nudge(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next reviews" onClick={() => nudge(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    <div className={styles.marquee}>
      <div className={styles.track} ref={trackRef}>
        {REVIEWS.map((r) => (
          <Card r={r} key={r.name} />
        ))}
        <div className={styles.dup} aria-hidden="true">
          {REVIEWS.map((r) => (
            <Card r={r} key={r.name} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
