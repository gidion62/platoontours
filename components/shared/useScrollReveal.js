'use client';

import { useEffect } from 'react';

/**
 * Generic scroll-reveal: any element with the global `.reveal` class
 * (see styles/globals.css) fades/rises into view once it crosses the
 * viewport threshold, by getting an `.in` class added via IntersectionObserver.
 * Ported as-is from the original vanilla-JS build — call this once per page
 * that renders `.reveal` elements.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
