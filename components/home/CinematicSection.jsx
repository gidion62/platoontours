'use client';

import { useEffect, useRef } from 'react';
import styles from './HomePage.module.css';
import useScrollReveal from '@/components/shared/useScrollReveal';

// Each polaroid tile below still carries its original CSS-gradient
// `background` as a fallback — the <img> just layers on top of it. Drop
// files at these paths (any of jpg/png/webp — just fix the extension in the
// `src` below to match) and they display immediately, no code change:
//   /public/images/home/migration-plains.jpg
//   /public/images/home/migration-herd.jpg
//   /public/images/home/migration-on-the-move.jpg
//   /public/images/home/migration-river-crossing.jpg
//   /public/images/home/caldera-rim.jpg
//   /public/images/home/caldera-big-five.jpg
//   /public/images/home/caldera-floor.jpg
//   /public/images/home/caldera-flamingo-lake.jpg
// See IMAGE-GUIDE.md at the project root for the full list across every page.
function Tile({ src, alt }) {
  return (
    <>
      <img
        className={styles.cinePhotoImg}
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className={styles.cinePhotoShade} />
    </>
  );
}

// Pinned cinematic scroll story: intro -> migration -> caldera -> "what sets
// us apart". Ported as-is from the vanilla build — each .cineMoment fades
// and slides in/out based on scroll position within the tall .cineRig, and
// two "edge" photos bridge the Migration and Caldera moments so the
// transition reads as one continuous camera move rather than a hard cut.
export default function CinematicSection() {
  // Drives the "Founded on the frontline" / "The Great Migration" /
  // "Ngorongoro — Africa's Eden" headings' fall-in entrance below (see the
  // .fall-in utility in styles/globals.css) — separate from the scroll-rig
  // opacity/transform math further down, which still drives the surrounding
  // .cineMoment panels.
  useScrollReveal();

  const rigRef = useRef(null);
  const introRef = useRef(null);
  const migrationRef = useRef(null);
  const calderaRef = useRef(null);
  const whyRef = useRef(null);
  const migEdgeRef = useRef(null);
  const calEdgeRef = useRef(null);

  useEffect(() => {
    const rig = rigRef.current;
    const intro = introRef.current;
    const migration = migrationRef.current;
    const caldera = calderaRef.current;
    const why = whyRef.current;
    const migEdge = migEdgeRef.current;
    const calEdge = calEdgeRef.current;
    if (!rig) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      [intro, migration, caldera, why].forEach((el) => {
        if (!el) return;
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      return;
    }

    function clamp01(v) {
      return Math.min(1, Math.max(0, v));
    }
    function smooth(a, b, v) {
      const x = clamp01((v - a) / (b - a));
      return x * x * (3 - 2 * x);
    }
    function band(el, s, inA, inB, outA, outB, dir) {
      if (!el) return;
      const enter = smooth(inA, inB, s);
      const exit = outB != null ? smooth(outA, outB, s) : 0;
      el.style.opacity = enter * (1 - exit);
      el.style.transform = dir === 'x' ? `translateX(${(1 - enter) * 160 - exit * 120}px)` : `translateY(${(1 - enter) * 24 - exit * 20}px)`;
    }

    function onScroll() {
      const rect = rig.getBoundingClientRect();
      const total = rig.offsetHeight - window.innerHeight;
      const s = clamp01(-rect.top / total) * total;

      band(intro, s, 100, 420, 750, 980);
      band(migration, s, 980, 1300, 1650, 1880, 'x');
      band(caldera, s, 1880, 2200, 2550, 2780, 'x');
      band(why, s, 2780, 3150);

      // Phones only: the "What sets us apart" box scrolls internally (its
      // content is taller than the screen). While it was still invisible
      // (fading in) it was already catching swipes and scrolling its own text,
      // so by the time it appeared the heading had scrolled out of sight.
      // Keep it inert and reset to the top until it's fully visible; once
      // it is, it scrolls normally. Desktop never enters this branch.
      if (why && window.matchMedia('(max-width: 820px)').matches) {
        const whyOpacity = parseFloat(why.style.opacity) || 0;
        why.style.pointerEvents = whyOpacity < 0.98 ? 'none' : 'auto';
        if (whyOpacity < 0.02) why.scrollTop = 0;
      }

      // The bridge: as the Migration photo at the right edge approaches its
      // own exit, it leads the handoff — sliding further right, lifting,
      // and scaling up, as if about to become the next scene. The Caldera
      // photo on the matching (left) edge starts in that same "just
      // arrived" oversized position and settles back to rest as Caldera
      // takes over — so the two moments feel like one continuous camera
      // move, not a cut.
      if (migEdge) {
        const bridge = smooth(1450, 1880, s);
        migEdge.style.transform = `rotate(-6deg) translateX(${bridge * 100}px) translateY(${-bridge * 34}px) scale(${1 + bridge * 0.18})`;
      }
      if (calEdge) {
        const settle = 1 - smooth(1880, 2380, s);
        calEdge.style.transform = `rotate(7deg) translateX(${-settle * 100}px) translateY(${-settle * 34}px) scale(${1 + settle * 0.18})`;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.cineRig} ref={rigRef}>
      <div className={styles.cineStage}>
        <div className={styles.cineBg} />

        <div className={styles.cineMoment} ref={introRef}>
          {/* Camo test layer — fades in/out with this moment only. Remove this
              line (and the .cineCamo CSS) to switch it off. */}
          <div className={styles.cineCamo} aria-hidden="true" />
          {/* TODO: swap for the MaskedHeading reveal treatment once that engine is ported */}
          <h2 className="font-display reveal fall-in">Founded on the frontline of adventure.</h2>
          <p>
            Platoon Tours is a proudly Tanzanian company founded by two brothers and former soldiers. We trade rifles for
            compasses and combat missions for discovery—bringing military-grade safety, advanced medical training, and
            genuine warmth to every journey. With small groups and founder-led guiding, we take you off the beaten path to
            experience the real Africa, not the tourist traps.
          </p>
          <p className={`${styles.cineSignature} font-accent`}>— Welcome to the Platoon</p>
        </div>

        <div className={styles.cineMoment} ref={migrationRef}>
          {/* .cineCollage is display:contents on desktop (no box, so the photos
              below keep positioning against .cineMoment exactly as before) and
              becomes a fanned row of polaroids on phones. */}
          <div className={styles.cineCollage}>
          <div className={styles.cinePhoto} style={{ top: '-8%', left: '-16%', width: 165, transform: 'rotate(-9deg)', background: 'linear-gradient(150deg,#c9a25a,#5a3d1a)' }}>
            <Tile src="/images/home/migration-plains.jpg" alt="Endless plains of the Serengeti" />
            <span>Endless plains</span>
          </div>
          <div className={styles.cinePhoto} style={{ bottom: '-6%', left: '-10%', width: 140, transform: 'rotate(6deg)', background: 'linear-gradient(150deg,#8a6a2f,#241d0e)' }}>
            <Tile src="/images/home/migration-herd.jpg" alt="Wildebeest herd on the move" />
            <span>The herd</span>
          </div>
          <div className={styles.cinePhoto} style={{ top: '-4%', right: '-14%', width: 150, transform: 'rotate(5deg)', background: 'linear-gradient(150deg,#6e5a35,#241d0e)' }}>
            <Tile src="/images/home/migration-on-the-move.jpg" alt="The Great Migration on the move" />
            <span>On the move</span>
          </div>
          <div
            className={`${styles.cinePhoto} ${styles.cinePhotoEdge}`}
            ref={migEdgeRef}
            style={{ bottom: '-10%', right: '-18%', width: 180, transform: 'rotate(-6deg)', background: 'linear-gradient(150deg,#d4a839,#4a3410)' }}
          >
            <Tile src="/images/home/migration-river-crossing.jpg" alt="Wildebeest river crossing" />
            <span>River crossing</span>
          </div>
          </div>

          <div className={styles.cineGiantStat}>
            <span className={styles.cineGiantNum}>1.5M+</span>
            <span className={styles.cineGiantLabel}>wildebeest on the move, every year</span>
          </div>
          <p className={`${styles.cineHook} font-accent`}>Ready to experience it?</p>
          <h2 className={`font-display reveal fall-in ${styles.cineH2Sm}`}>The Great Migration</h2>
          <p>
            Over a million wildebeest move in a circuit across the Serengeti-Mara ecosystem — chased by predators, timed
            by rain — with <strong>8,000</strong> calves born daily at the peak of calving season.
          </p>
        </div>

        <div className={styles.cineMoment} ref={calderaRef}>
          <div className={styles.cineCollage}>
          <div
            className={`${styles.cinePhoto} ${styles.cinePhotoEdge}`}
            ref={calEdgeRef}
            style={{ top: '-24%', left: '-42%', width: 190, transform: 'rotate(7deg)', background: 'linear-gradient(150deg,#e0c68a,#5a4420)' }}
          >
            <Tile src="/images/home/caldera-rim.jpg" alt="Ngorongoro Crater rim" />
            <span>Crater rim</span>
          </div>
          <div className={styles.cinePhoto} style={{ bottom: '-26%', left: '-28%', width: 160, transform: 'rotate(-5deg)', background: 'linear-gradient(150deg,#3d5c42,#12201a)' }}>
            <Tile src="/images/home/caldera-big-five.jpg" alt="Big Five wildlife in the crater" />
            <span>Big Five</span>
          </div>
          <div className={styles.cinePhoto} style={{ top: '-20%', right: '-34%', width: 170, transform: 'rotate(-7deg)', background: 'linear-gradient(150deg,#4a6b4f,#182b1c)' }}>
            <Tile src="/images/home/caldera-floor.jpg" alt="Ngorongoro Crater floor" />
            <span>The caldera floor</span>
          </div>
          {/* cineHideMobile: this photo file isn't in /public/images/home yet, so
              on phones it's skipped rather than shown as a bare gradient tile.
              Remove that class once caldera-flamingo-lake.jpg is added. */}
          <div className={`${styles.cinePhoto} ${styles.cineHideMobile}`} style={{ bottom: '-24%', right: '-30%', width: 140, transform: 'rotate(4deg)', background: 'linear-gradient(150deg,#5c7a5f,#1c2f1f)' }}>
            <Tile src="/images/home/caldera-flamingo-lake.jpg" alt="Flamingos on Lake Magadi" />
            <span>Flamingo lake</span>
          </div>
          </div>

          <p className={`${styles.cineHook} font-accent`}>Visit the Greatest Caldera</p>
          <h2 className="font-display reveal fall-in">Ngorongoro — Africa&apos;s Eden.</h2>
          <p>
            The world&apos;s largest intact volcanic caldera, home to <strong>30,000</strong> animals within walls
            plunging <strong>2,000ft</strong> into a self-contained ecosystem where the Big Five odds are as close to
            guaranteed as safari gets.
          </p>
        </div>

        <div className={`${styles.cineMoment} ${styles.cineWhy}`} style={{ maxWidth: '52rem' }} ref={whyRef}>
          <h2 className="font-display">What sets us apart.</h2>
          <div className={styles.cineDiffGrid}>
            <div className={styles.cineDiffItem}>
              <h3>Founder-Led Guiding</h3>
              <p>Every safari is personally guided by one of the founders — no outsourcing to freelancers.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Military-Grade Safety</h3>
              <p>Trained medics, advanced trauma kits, and routes pre-mapped for emergency evacuation.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Small Groups Only</h3>
              <p>We keep every group intimate so you get our full attention, not a bus-tour pace.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Zero Tourist Traps</h3>
              <p>Off the beaten path — hidden viewpoints and local communities mass tourism never reaches.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Expert Knowledge</h3>
              <p>With years of experience in Tanzania, our team is made up of local experts who know the ins and outs of the country&apos;s parks, culture, and wildlife.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Tailor-Made Safaris</h3>
              <p>Whether you&apos;re looking for a luxury safari, a budget-friendly adventure, or a family-friendly experience, we create bespoke travel plans designed just for you.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Authentic Local Connections</h3>
              <p>We believe in offering an authentic Tanzanian experience — helping you connect with the people and cultures of Tanzania in meaningful ways.</p>
            </div>
            <div className={styles.cineDiffItem}>
              <h3>Exceptional Customer Care</h3>
              <p>From the moment you contact us until you return home, we provide attentive, personalized service.</p>
            </div>
          </div>
          <div className={styles.cineStats} style={{ marginTop: '2.2rem' }}>
            <div>
              <div className={styles.cineStatNum}>8+</div>
              <div className={styles.cineStatLabel}>years of experience</div>
            </div>
            <div>
              <div className={styles.cineStatNum}>20+</div>
              <div className={styles.cineStatLabel}>tailor-made safari itineraries</div>
            </div>
            <div>
              <div className={styles.cineStatNum}>5.0</div>
              <div className={styles.cineStatLabel}>average guest rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
