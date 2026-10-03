import Link from 'next/link';
import styles from './PackagePage.module.css';
import FallbackImage from '@/components/shared/FallbackImage';
import ScrollExpand from '@/components/shared/ScrollExpand';
import PackageSchema from './PackageSchema';

export default function PackagePage({ data, slug }) {
  const d = data;
  return (
    <div className="page" data-page="package">
      <PackageSchema data={d} slug={slug} />
      {/* Preload the cover photo so the browser starts fetching it immediately,
          instead of waiting until this point in the page to request it — closes
          the gap where the plain background color shows before the photo paints. */}
      <link rel="preload" as="image" href={`/images/packages/${slug}-detail.jpg`} />
      <header className={styles.pkgHero}>
        <p className={styles.pkgDuration}>{d.duration}</p>
        {/* TODO: swap this h1 for the MaskedHeading reveal treatment used on other headings once that engine is ported (see components/shared/MaskedHeading) */}
        <h1 className="font-display">{d.title}</h1>
        <div className={styles.pkgHeroMeta}>
          <span className={styles.pkgPriceBadge}>{d.price} / person</span>
          {d.special && <span className={styles.pkgSpecialBadge}>Special Package</span>}
        </div>
        <p className={styles.pkgIntro}>{d.intro}</p>
      </header>

      {/* A different photo from the one used on the safaris grid card /
          carousel for this package — /public/images/packages/<slug>-detail.jpg.
          If that file isn't there yet, FallbackImage just hides itself, no
          broken-image icon. */}
      <div className={styles.pkgCoverWrap}>
        <FallbackImage className={styles.pkgCoverImg} src={`/images/packages/${slug}-detail.jpg`} alt={d.title} loading="eager" />
      </div>

      <section>
        <div className="section-inner">
          <h2>Tour Highlights</h2>
          <div className={styles.pkgHighlights}>
            {d.highlights.map((h, i) => (
              <div className={styles.pkgHighlightItem} key={i}>
                <h4>{h.title}</h4>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--sand-100)' }}>
        <div className="section-inner" style={{ maxWidth: 820 }}>
          <h2>Day by Day</h2>
          <div>
            {d.itinerary.map((day, i) => (
              <div className={styles.pkgItineraryItem} key={i}>
                <div className={styles.pkgDayNum}>{day.day}</div>
                <div>
                  <h4>{day.title}</h4>
                  <p>{day.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section-inner">
          <div className={styles.pkgInclusions}>
            <div>
              <h4>What&apos;s Included</h4>
              <ul className={styles.pkgIncluded}>
                {d.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>What&apos;s Not Included</h4>
              <ul className={styles.pkgExcluded}>
                {d.excluded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {d.extraBoxes && d.extraBoxes.length > 0 && (
            <div>
              {d.extraBoxes.map((b, i) => (
                <div className={styles.pkgExtraBox} key={i}>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ScrollExpand
        src="/images/packages/cta-elephants-sunrise.jpg"
        alt="Elephants at sunrise"
        scrollHint="Scroll"
      >
        <h3 className={styles.pkgCtaTitle}>Ready to book this safari?</h3>
        <Link href="/contact" className={styles.btnCtaBig}>
          Start Booking
        </Link>
      </ScrollExpand>

      <div style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <Link href="/safaris" className={styles.pkgBackLink}>
          ← Back to all safaris
        </Link>
      </div>
    </div>
  );
}
