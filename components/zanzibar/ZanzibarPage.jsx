'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import useScrollReveal from '@/components/shared/useScrollReveal';
import FallbackImage from '@/components/shared/FallbackImage';
import zanzibarSpots from '@/lib/zanzibarSpots';
import styles from './ZanzibarPage.module.css';

export default function ZanzibarPage() {
  const wrapRef = useRef(null);
  useScrollReveal();

  // Subtle parallax drift on each row's background image as it scrolls —
  // ported as-is from the original vanilla build.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !wrapRef.current) return;
    const bgs = Array.from(wrapRef.current.querySelectorAll(`.${styles.zbBg}, .${styles.zbPhoto}`));
    function onScroll() {
      bgs.forEach((bg) => {
        const r = bg.parentElement.getBoundingClientRect();
        const centerOffset = (r.top + r.height / 2 - window.innerHeight / 2) * 0.06;
        bg.style.transform = `translateY(${centerOffset}px)`;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page" data-page="zanzibar">
      <PageHeader title="Zanzibar" />

      <section style={{ paddingTop: 0 }}>
        <div className="intro-block reveal" style={{ maxWidth: 820, margin: '0 auto 3.5rem' }}>
          <p>
            Zanzibar Beach is one of the most stunning coastal destinations in the world, offering travelers a perfect
            blend of natural beauty, relaxation, and cultural charm. With its powdery white sand, swaying palm trees, and
            turquoise waters of the Indian Ocean, it creates an idyllic setting for sunbathing, swimming, snorkeling, and
            diving. Beyond its breathtaking shores, Zanzibar is rich in history and culture, where visitors can explore
            Stone Town&rsquo;s narrow alleys, spice farms, and vibrant local markets. Whether you are seeking a romantic
            getaway, family holiday, or adventure-filled escape, Zanzibar Beach provides a serene paradise with warm
            hospitality and unforgettable experiences.
          </p>
        </div>

        <div ref={wrapRef}>
          {zanzibarSpots.map((spot, i) => (
            <div
              key={spot.name}
              className={`${styles.zbarRow} reveal ${i % 2 === 1 ? styles.reverse : ''} ${i % 2 === 1 ? styles.even : ''}`}
            >
              <div className={styles.zbarMedia}>
                <div className={styles.zbBg} style={{ background: `linear-gradient(150deg, ${spot.grad[0]}, ${spot.grad[1]})` }} />
                {spot.slug && (
                  <FallbackImage
                    className={styles.zbPhoto}
                    src={`/images/zanzibar/${spot.slug}.jpg`}
                    alt={spot.name}
                  />
                )}
              </div>
              <div className={styles.zbarText}>
                <span className={styles.zbEyebrow}>{spot.eyebrow}</span>
                <h3>{spot.name}</h3>
                <p>{spot.text}</p>
                <Link href="/contact" className={styles.zbCta}>
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
