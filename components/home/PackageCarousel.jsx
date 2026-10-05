'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HomePage.module.css';
// The /bundle entrypoints pull in every Swiper module (coverflow effect,
// navigation, autoplay) pre-registered, matching how the original inlined
// Swiper build behaved — no separate `modules: [...]` wiring needed.
import 'swiper/css/bundle';
import './packageCard.css';

// The 17-package set for the homepage's Swiper CoverFlow carousel — kept in
// sync manually with lib/packages.js (see the comment on that file / on
// BookingEngine.jsx's PACKAGE_NAMES for the same tradeoff).
const CARD_DATA = [
  { title: '7-Day Luxury Tanzania Safari with Serengeti Balloon Safari', price: 'From $3,700', special: true, tint1: '#8a6a2f', tint2: '#241d0e', slug: '7-day-luxury-tanzania-safari-with-serengeti-balloon-safari' },
  { title: '6-Day Tanzania Safari + 5-Day Zanzibar Luxury Escape', price: 'From $3,400', special: true, tint1: '#3a5a6e', tint2: '#12242c', slug: '6-day-tanzania-safari-5-day-zanzibar-luxury-escape' },
  { title: "5-Day Luxury Honeymoon Safari: Tanzania's Northern Circuit", price: 'From $2,400', special: true, tint1: '#6e3550', tint2: '#2a1420', slug: '5-day-luxury-honeymoon-safari-tanzanias-northern-circuit' },
  { title: '6-Day Mid-Range Safari: The Great Calving Season', price: 'From $2,800', special: true, tint1: '#3d5c42', tint2: '#12201a', slug: '6-day-mid-range-safari-the-great-calving-season' },
  { title: '9-Day Safari: The Ultimate Mara River Crossing Experience', price: 'From $2,500', special: true, tint1: '#3a5a6e', tint2: '#12242c', slug: '9-day-safari-the-ultimate-mara-river-crossing-experience' },
  { title: '9-Day Tanzania Safari Express: Lake Manyara, Lake Natron, Serengeti, Ngorongoro & Tarangire', price: 'From $3,600', special: false, tint1: '#6e3550', tint2: '#2a1420', slug: '9-day-tanzania-safari-express-lake-manyara-lake-natron-serengeti-ngorongoro-tarangire' },
  { title: '7-Day Wild South Safari: Nyerere & Ruaha', price: 'From $4,600', special: false, tint1: '#3d5c42', tint2: '#12201a', slug: '7-day-wild-south-safari-nyerere-ruaha' },
  { title: '8-Day Tanzania Safari Express: Arusha National Park, Lake Manyara, Serengeti, Ngorongoro & Tarangire', price: 'From $2,600', special: false, tint1: '#6e5a35', tint2: '#241d0e', slug: '8-day-tanzania-safari-express-arusha-national-park-lake-manyara-serengeti-ngorongoro-tarangire' },
  { title: '7-Day Tanzania Safari Express: Lake Manyara, Serengeti, Ngorongoro & Tarangire', price: 'From $2,200', special: false, tint1: '#4a4a4a', tint2: '#161616', slug: '7-day-express-lake-manyara-serengeti-ngorongoro-tarangire' },
  { title: '7-Day Southern Tanzania Safari: Nyerere, Mikumi & Udzungwa', price: 'From $3,700', special: false, tint1: '#6e5a35', tint2: '#241d0e', slug: '7-day-southern-tanzania-safari-nyerere-mikumi-udzungwa' },
  { title: '8-Day Tanzania Safari: Western Serengeti & Ngorongoro Crater', price: 'From $2,900', special: false, tint1: '#4a4a4a', tint2: '#161616', slug: '8-day-tanzania-safari-western-serengeti-ngorongoro-crater' },
  { title: '4-Day Tanzania Safari Express: Lake Manyara, Ngorongoro & Tarangire', price: 'From $1,350', special: false, tint1: '#5c3d2f', tint2: '#1e130e', slug: '4-day-express-lake-manyara-ngorongoro-tarangire' },
  { title: '3-Day Tanzania Safari Express: Tarangire & Ngorongoro Crater', price: 'From $1,100', special: false, tint1: '#5c3d2f', tint2: '#1e130e', slug: '3-day-express-tarangire-ngorongoro' },
  { title: '2-Day Tanzania Safari Express: Tarangire & Ngorongoro Crater', price: 'From $900', special: false, tint1: '#3d5c56', tint2: '#12201e', slug: '2-day-express-tarangire-ngorongoro' },
  { title: '10 Days - Tarangire, Lake Manyara, Lake Natron, Serengeti, Ngorongoro Crater, and Lake Eyasi', price: 'From $4,500', special: false, tint1: '#7d3f20', tint2: '#2a1c12', slug: '10-days-tarangire-lake-manyara-lake-natron-serengeti-ngorongoro-crater-and-lake-eyasi' },
  { title: '5 Days - Lake Manyara, Ngorongoro Crater, Serengeti (2 nights), and Tarangire', price: 'From $1,900', special: false, tint1: '#3a5a6e', tint2: '#12242c', slug: '5-days-lake-manyara-ngorongoro-crater-serengeti-2-nights-and-tarangire' },
  { title: '6 Days - Tarangire, Serengeti and Ngorongoro Crater', price: 'From $1,800', special: false, tint1: '#3d5c42', tint2: '#12201a', slug: '6-days-tarangire-serengeti-and-ngorongoro-crater' },
];

// Each card's photo lives at /public/images/packages/<slug>.jpg — same slug
// as its /safaris/<slug> detail page, so there's one name to remember per
// package, not two. `onerror` hides the <img> if that file isn't there yet,
// leaving the tint gradient (still set as this card's own background)
// showing through — see IMAGE-GUIDE.md for the full file list.
function cardMarkup(d) {
  const bg = `linear-gradient(160deg,${d.tint1},${d.tint2})`;
  return `
    <div class="card-fill k-package" data-slug="${d.slug || ''}" style="background:${bg}; cursor:${d.slug ? 'pointer' : 'default'};">
      <img class="pkg-img" src="/images/packages/${d.slug}.jpg" alt="${d.title}" loading="lazy" onerror="this.style.display='none'" />
      <div class="pkg-shade"></div>
      <div class="pkg-content">
        ${d.special ? '<span class="pkg-tag">Special</span>' : ''}
        <h3 class="pkg-title">${d.title}</h3>
        <span class="pkg-price">${d.price}</span>
      </div>
    </div>
  `;
}

export default function PackageCarousel() {
  const wrapperRef = useRef(null);
  const swiperElRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let swiperInstance;
    let cancelled = false;
    let resumeTimer;

    // Swiper ships as an ESM-only package in recent major versions — dynamic
    // import keeps it out of the server bundle and matches the "run the
    // original vanilla logic in an effect" approach used for the other
    // motion engines.
    import('swiper/bundle').then(({ default: Swiper }) => {
      if (cancelled) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      CARD_DATA.forEach((d) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = cardMarkup(d);
        wrapper.appendChild(slide);
      });

      // Delegated click — Swiper's loop:true mode duplicates slides
      // internally for seamless looping, and cloned DOM nodes never inherit
      // JS event listeners, so a single delegated listener on the wrapper
      // handles both the originals and Swiper's own clones correctly.
      function onClick(e) {
        const cardEl = e.target.closest('.card-fill');
        if (!cardEl) return;
        const slug = cardEl.dataset.slug;
        if (slug) router.push(`/safaris/${slug}`);
      }
      wrapper.addEventListener('click', onClick);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      swiperInstance = new Swiper(swiperElRef.current, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        speed: reduceMotion ? 600 : 4200, // long, linear transition = continuous crawl, not a snap
        autoplay: reduceMotion
          ? false
          : {
              delay: 0, // next transition starts the instant this one ends
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            },
        coverflowEffect: {
          rotate: 0, // no Y-axis turn — every card stays face-on to the viewer
          stretch: 0,
          depth: 220, // z-axis recession with distance from center still gives the arc
          modifier: 1,
          slideShadows: false,
        },
        // No `navigation` option here on purpose — Swiper's built-in nav
        // module just calls slideNext()/slidePrev(), which it silently
        // no-ops while `swiper.animating` is true. With speed:4200 and
        // delay:0 above, this carousel is *always* mid-transition (that's
        // the whole point of the continuous crawl), so every click on the
        // built-in nav buttons was getting swallowed — nothing ever
        // visibly happened. The manual handlers below force the step
        // through instead of asking Swiper nicely.
      });

      const normalSpeed = reduceMotion ? 600 : 4200;

      function step(direction) {
        if (!swiperInstance) return;
        swiperInstance.autoplay?.stop();
        // Cancel whatever transition is currently mid-flight so the
        // animating guard doesn't drop this click too, then step with a
        // snappy speed so the click feels immediate rather than waiting
        // out the long crawl duration.
        swiperInstance.setTransition(0);
        swiperInstance.animating = false;
        if (direction === 'next') swiperInstance.slideNext(450);
        else swiperInstance.slidePrev(450);

        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
          if (!swiperInstance) return;
          swiperInstance.params.speed = normalSpeed;
          swiperInstance.autoplay?.start();
        }, 500);
      }

      function onNextClick() {
        step('next');
      }
      function onPrevClick() {
        step('prev');
      }
      nextBtnRef.current?.addEventListener('click', onNextClick);
      prevBtnRef.current?.addEventListener('click', onPrevClick);

      swiperInstance.__cleanup = () => {
        wrapper.removeEventListener('click', onClick);
        nextBtnRef.current?.removeEventListener('click', onNextClick);
        prevBtnRef.current?.removeEventListener('click', onPrevClick);
        clearTimeout(resumeTimer);
      };
    });

    return () => {
      cancelled = true;
      clearTimeout(resumeTimer);
      if (swiperInstance) {
        swiperInstance.__cleanup?.();
        swiperInstance.destroy(true, true);
      }
      if (wrapperRef.current) wrapperRef.current.innerHTML = '';
    };
  }, [router]);

  return (
    <div className={styles.stageWrap}>
      <div className="swiper mySwiper" ref={swiperElRef}>
        <div className="swiper-wrapper" ref={wrapperRef} />
      </div>
      <button className={`${styles.navBtn} ${styles.navBtnLeft}`} ref={prevBtnRef} aria-label="Previous">
        <svg viewBox="0 0 24 24">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button className={`${styles.navBtn} ${styles.navBtnRight}`} ref={nextBtnRef} aria-label="Next">
        <svg viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
