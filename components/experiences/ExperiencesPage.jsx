'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import FallbackImage from '@/components/shared/FallbackImage';
import JournalSection from '@/components/blog/JournalSection';
import useScrollReveal from '@/components/shared/useScrollReveal';
import experiences from '@/lib/experiences';
import styles from './ExperiencesPage.module.css';

const LAYOUTS = ['lay0', 'lay1', 'lay1', 'lay2', 'lay1', 'lay0'];
const TICKER = ['Hadzabe hunters', 'Crater-lake canoes', 'Turquoise hot springs', 'Kilimanjaro coffee', 'Maasai markets', 'An 80-metre waterfall', 'Flamingo shores'];

function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span className={styles.w} key={i}>
      <span style={{ transitionDelay: `${0.12 + i * 0.06}s` }}>{w}&nbsp;</span>
    </span>
  ));
}

export default function ExperiencesPage() {
  const stackRef = useRef(null);
  useScrollReveal();

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const panels = Array.from(stack.querySelectorAll(`.${styles.panel}`));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stickyMq = window.matchMedia('(min-width: 1000px) and (min-height: 780px)');

    // Reveal each card the first time it comes into view.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.in);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    panels.forEach((p) => io.observe(p));
    if (reduce) {
      panels.forEach((p) => p.classList.add(styles.in));
      return () => io.disconnect();
    }

    let raf = 0;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    function update() {
      raf = 0;
      const vh = window.innerHeight;
      const sticky = stickyMq.matches;
      panels.forEach((p, i) => {
        const r = p.getBoundingClientRect();
        // -1 (just below the screen) .. 0 (centered) .. 1 (just above): drives the photo parallax.
        const prog = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        p.style.setProperty('--p', prog.toFixed(3));

        // Deck effect: while the next card slides up over this one, this one shrinks and dims.
        let s = 1;
        let dim = 0;
        const next = panels[i + 1];
        if (sticky && next) {
          const nTop = next.getBoundingClientRect().top;
          const rest = parseFloat(getComputedStyle(next).top) || 0;
          const t = clamp(1 - (nTop - rest) / (vh * 0.9), 0, 1);
          s = 1 - t * 0.06;
          dim = t * 0.4;
        }
        p.style.setProperty('--s', s.toFixed(4));
        p.style.setProperty('--dim', dim.toFixed(3));
      });
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const total = String(experiences.length).padStart(2, '0');

  return (
    <div className="page" data-page="experiences">
      <PageHeader title="Experiences" subtitle="Beyond the safari vehicle" />

      <div className={styles.intro}>
        <p>
          Safaris are the heart of what we do — but Tanzania is bigger than its parks. These are the days we plan for
          our own friends: real people, real places, no tourist theatre. Add one to your safari, or make one the reason
          you come.
        </p>
        <nav className={styles.chips} aria-label="Experiences">
          {experiences.map((x, i) => (
            <a key={x.slug} href={`#${x.slug}`}>
              <b>{String(i + 1).padStart(2, '0')}</b> {x.name}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.tickerWrap} aria-hidden="true">
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[0, 1].map((n) => (
              <span key={n}>
                {TICKER.map((t) => (
                  <em key={t}>{t}</em>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.stack} ref={stackRef}>
        {experiences.map((x, i) => (
          <article
            key={x.slug}
            id={x.slug}
            className={`${styles.panel} ${styles[LAYOUTS[i % LAYOUTS.length]]} ${i % 2 === 1 ? styles.flip : ''}`}
            style={{ '--i': i }}
          >
            <div className={styles.card}>
              <span className={styles.bigNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className={styles.text}>
                <div className={styles.metaRow}>
                  <span className={styles.tag}>{x.tag}</span>
                  <span className={styles.count}>
                    {String(i + 1).padStart(2, '0')} / {total}
                  </span>
                </div>
                <h2 className={styles.title}>
                  <small>{x.name}</small>
                  <Words text={x.title} />
                </h2>
                <p className={`${styles.tagline} font-accent`}>{x.tagline}</p>
                <p className={styles.blurb}>{x.blurb}</p>

                <ul className={styles.facts}>
                  {x.facts.map((f) => (
                    <li key={f.k}>
                      <span>{f.k}</span>
                      {f.v}
                    </li>
                  ))}
                </ul>

                <ul className={styles.highlights}>
                  {x.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <Link href="/contact" className={styles.cta}>
                  Plan this experience <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className={styles.side}>
                <div className={styles.gallery}>
                  {x.images.map((img, k) => (
                    <figure key={img.src} className={styles.shot} style={{ '--d': 18 + k * 22, '--k': k }}>
                      <FallbackImage src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                    </figure>
                  ))}
                </div>

                <ol className={styles.plan}>
                  {x.plan.map((s, k) => (
                    <li key={`${s.t}-${k}`} style={{ transitionDelay: `${0.5 + k * 0.09}s` }}>
                      <b>{s.t}</b>
                      <span>{s.d}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.fine}>
                  <strong>Includes:</strong> {x.includes}
                </p>
                <p className={styles.fine}>{x.note}</p>
              </div>
            </div>
            <div className={styles.dimmer} aria-hidden="true" />
          </article>
        ))}
      </div>

      <div className={styles.flex}>
        <div className={`${styles.flexInner} reveal`}>
          <div className={styles.flexHead}>
            <span>Flexible booking</span>
            <h2>Standalone or part of your safari.</h2>
            <p>Every experience here can be booked on its own or added to a safari itinerary — your choice.</p>
          </div>
          <div className={styles.flexGrid}>
            <div>
              <b>01</b>
              <h3>Book it standalone</h3>
              <p>Already in Tanzania? Take a single day trip or half-day activity and pay for that experience only. No safari required.</p>
            </div>
            <div>
              <b>02</b>
              <h3>Add it to your safari</h3>
              <p>Planning a trip and want more than wildlife? We fit the experience into your route naturally — no backtracking, no wasted days.</p>
            </div>
            <div>
              <b>03</b>
              <h3>Build a custom journey</h3>
              <p>Combine wildlife, culture, coast and community experiences around your interests and pace, from one day to two weeks.</p>
            </div>
          </div>
          <p className={styles.flexFoot}>No forced packages. No wasted time. Clear pricing. Not sure what fits? Send us your dates and interests and we&rsquo;ll recommend the easiest, most cost-effective way.</p>
        </div>
      </div>

      <div className={styles.closing}>
        <h2>Pair an experience with your safari.</h2>
        <p>Tell us your dates and we&rsquo;ll fit these days around your game drives.</p>
        <div className={styles.closingBtns}>
          <Link href="/contact" className={styles.cta}>
            Start planning <span aria-hidden="true">→</span>
          </Link>
          <Link href="/safaris" className={styles.ghost}>
            See safari packages
          </Link>
        </div>
      </div>

      <JournalSection />
    </div>
  );
}
