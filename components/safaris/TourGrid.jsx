import safariPackages from '@/lib/safariPackages';
import packageDetails from '@/lib/packages';
import TourCard from './TourCard';
import styles from './TourGrid.module.css';

// Normal 2-3-per-row card grid, replacing the old pinned/scroll Card Queue
// (which used the same full-screen scroll-hijack language as the homepage's
// cinematic section — repeating that effect right after it on the very next
// page a visitor lands on read as a worse experience, not a fancier one).
export default function TourGrid() {
  return (
    <div className={styles.grid}>
            {safariPackages.map((pkg, i) => (
        <TourCard
          key={pkg.slug}
          title={pkg.title}
          price={pkg.price}
          special={pkg.special}
          grad={pkg.grad}
          slug={pkg.slug}
          index={i}
          duration={packageDetails[pkg.slug]?.duration || ''}
        />
      ))}
    </div>
  );
}
