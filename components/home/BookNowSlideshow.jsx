import styles from './HomePage.module.css';

// Lightweight alternative to a second autoplay video: 4 real safari photos
// slowly crossfading on a loop, pure CSS (no JS timers, no video decode
// cost). Each <img> shares one keyframe animation and is staggered with a
// negative animation-delay so they're already mid-cycle on first paint —
// no blank flash waiting for the loop to "start".
const SLIDES = [
  { src: '/images/home/migration-on-the-move.jpg', alt: 'Wildebeest leaping across the Mara River' },
  { src: '/images/home/caldera-big-five.jpg', alt: 'Lion pride resting on a fallen tree' },
  { src: '/images/destinations/ngorongoro.jpg', alt: 'Black rhino in the Ngorongoro Crater' },
  { src: '/images/home/migration-river-crossing.jpg', alt: 'Zebra herd at a river crossing' },
];

const SECONDS_PER_SLIDE = 5; // must match the keyframe math in HomePage.module.css

export default function BookNowSlideshow() {
  return (
    <div className={styles.bookNowSlideshow} aria-hidden="true">
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={styles.bookNowSlide}
          loading={i === 0 ? 'eager' : 'lazy'}
          style={{ animationDelay: `-${i * SECONDS_PER_SLIDE}s` }}
        />
      ))}
    </div>
  );
}