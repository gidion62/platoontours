import Link from 'next/link';
import FallbackImage from '@/components/shared/FallbackImage';
import experiences from '@/lib/experiences';
import styles from './HomeExperiences.module.css';

// Three hand-picked experiences shown on the homepage — change the slugs
// here to feature different ones (they must exist in lib/experiences.js).
const FEATURED = ['lake-eyasi', 'kikuletwa-hot-springs', 'materuni-waterfall-coffee'];

export default function HomeExperiences() {
  const picks = FEATURED.map((slug) => experiences.find((x) => x.slug === slug)).filter(Boolean);

  return (
    <section className={styles.wrap}>
      <div className="section-inner reveal">
        <div className={styles.head}>
          <div>
            <div className={styles.eyebrow}>Beyond the safari vehicle</div>
            <h2>Experiences worth the detour</h2>
          </div>
          <Link href="/experiences" className={styles.all}>
            See all experiences <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {picks.map((x) => (
            <Link key={x.slug} href={`/experiences#${x.slug}`} className={styles.card}>
              <FallbackImage className={styles.img} src={x.images[x.images.length - 1].src} alt={x.images[x.images.length - 1].alt} />
              <div className={styles.shade} />
              <span className={styles.tag}>{x.tag}</span>
              <div className={styles.body}>
                <h3>{x.title}</h3>
                <p>{x.tagline}</p>
                <span className={styles.more}>
                  Discover <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
