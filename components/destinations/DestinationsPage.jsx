'use client';

import { useEffect, useRef } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import useScrollReveal from '@/components/shared/useScrollReveal';
import destinations from '@/lib/destinations';
import testimonials from '@/lib/testimonials';
import styles from './DestinationsPage.module.css';

// Horizontal Track Switch + Image Reveal — pinned section where vertical
// scroll drives horizontal movement across all destinations, with each
// panel's two images wiping open as it becomes current. Ported as-is from
// the vanilla build (was explicitly re-asserted multiple times during
// design review — do not replace with a static/editorial layout).
export default function DestinationsPage() {
  const rigRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  useScrollReveal();

  useEffect(() => {
    const rig = rigRef.current;
    const track = trackRef.current;
    if (!rig || !track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = destinations.length;

    const panels = Array.from(track.children);
    const imagePairs = panels.map((p) => Array.from(p.querySelectorAll(`.${styles.destHImg}`)));
    const dots = progressRef.current ? Array.from(progressRef.current.children) : [];

    if (reduce) {
      imagePairs.forEach((pair) => pair.forEach((el) => (el.style.clipPath = 'none')));
      return;
    }

    rig.style.height = n * 100 + 'vh';

    function clamp01(v) {
      return Math.min(1, Math.max(0, v));
    }

    function onScroll() {
      const rect = rig.getBoundingClientRect();
      const total = rig.offsetHeight - window.innerHeight;
      const progress = clamp01(-rect.top / total);
      const trackProgress = progress * (n - 1);

      track.style.transform = `translateX(${-trackProgress * 100}vw)`;

      // On phones the two photos sit side by side, so the second one's delayed
      // wipe would leave it ~12% cut off whenever a destination is centered.
      // No stagger there; desktop keeps the original staggered timing.
      const narrow = window.matchMedia('(max-width: 640px)').matches;

      imagePairs.forEach((pair, i) => {
        pair.forEach((el, imgIdx) => {
          const stagger = narrow ? 0 : imgIdx * 0.12;
          const local = clamp01(trackProgress - (i - 1) - stagger);
          el.style.clipPath = `inset(0 ${(1 - local) * 100}% 0 0)`;
        });
      });

      const activeIndex = Math.round(trackProgress);
      dots.forEach((dot, i) => dot.classList.toggle(styles.active, i === activeIndex));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      rig.style.height = '';
    };
  }, []);

  return (
    <div className="page" data-page="destinations">
      <PageHeader title="Tanzania Safari Destinations" />

      <section style={{ paddingTop: 0 }}>
        <div className="intro-block reveal" style={{ maxWidth: 820, marginBottom: '1rem' }}>
          <p>
            Tanzania is home to some of Africa&rsquo;s most spectacular wildlife parks, breathtaking landscapes, and
            world-famous natural wonders. From the endless plains of Serengeti National Park and the iconic Ngorongoro
            Crater to the elephant-rich Tarangire National Park, the tree-climbing lions of Lake Manyara, the pristine
            beaches of Zanzibar, and the majestic Mount Kilimanjaro, every destination offers a unique adventure. Explore
            our carefully selected Tanzania safari destinations and find the perfect place for your next unforgettable
            journey with Platoon Tours.
          </p>
        </div>
      </section>

      <div className={styles.destHRig} ref={rigRef}>
        <div className={styles.destHStage}>
          <div className={styles.destHTrack} ref={trackRef}>
            {destinations.map((d, i) => (
              <div key={d.slug} className={`${styles.destHPanel} ${i % 2 === 1 ? styles.even : ''}`}>
                <div className={styles.destHPanelInner}>
                  <div className={styles.destHContent}>
                    <h2>{d.name}</h2>
                    <div className={`${styles.destHTagline} font-accent`}>{d.tagline}</div>
                    <p>{d.intro}</p>
                    {d.subs.map((s) => (
                      <div className={styles.destHSub} key={s.h}>
                        <h4>{s.h}</h4>
                        <p>{s.p}</p>
                      </div>
                    ))}
                  </div>
                                    <div className={styles.destHImages}>
                    <div
                      className={styles.destHImg}
                      style={{
                        background: `url(/images/destinations-wide/${d.slug}-1.jpg) center/cover no-repeat, linear-gradient(150deg, ${d.grad[0]}, ${d.grad[1]})`,
                        clipPath: 'inset(0 100% 0 0)',
                      }}
                    />
                    <div
                      className={styles.destHImg}
                      style={{
                        background: `url(/images/destinations-wide/${d.slug}-2.jpg) center/cover no-repeat, linear-gradient(200deg, ${d.grad[1]}, ${d.grad[0]})`,
                        clipPath: 'inset(0 100% 0 0)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.destHProgress} ref={progressRef}>
            {destinations.map((d) => (
              <div className={styles.destHDot} key={d.slug} />
            ))}
          </div>
        </div>
      </div>

      <section className={styles.testimonialSection}>
        <div className="section-inner reveal">
          <h2>What travelers are saying</h2>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t) => (
              <div className={styles.testimonialCard} key={t.name}>
                <div className={styles.tcHead}>
                  <span className={styles.tcName}>{t.name}</span>
                  <span className={styles.tcTime}>{t.time}</span>
                </div>
                <div className={styles.tcTitle}>{t.title}</div>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
