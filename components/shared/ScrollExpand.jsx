'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollExpand.module.css';

function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}
// smoothstep easing — same curve used by the homepage cinematic scroll rig
function ease(x) {
  return x * x * (3 - 2 * x);
}

// A scroll-driven frame that starts as a small rounded card and grows as the
// page scrolls through it, revealing its background photo — used for the
// "Ready to book?" banner at the bottom of a package page. Pass `children`
// for the content laid over the photo (heading, button, etc).
export default function ScrollExpand({
  src,
  alt = '',
  scrollHint,
  children,
  startWidth = 68,
  startHeight = 46,
  endWidth = 94,
  endHeight = 74,
  startRadius = 28,
  endRadius = 20,
  mediaZoom = 1.3,
  scrollDistance = 0.9,
  holdDistance = 0.25,
  smoothing = 0.12,
  overlayScrim = 0.5,
  enabled = true,
}) {
  const wrapRef = useRef(null);
  const frameRef = useRef(null);
  const imgRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!wrap || !frame) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const expandShare = scrollDistance / (scrollDistance + holdDistance + 1);
      const totalTravel = Math.max(rect.height - vh, 1);
      const scrolled = clamp01(-rect.top / totalTravel);
      const rawProgress = clamp01(scrolled / Math.max(expandShare, 0.0001));
      const target = ease(rawProgress);

      if (reduce) {
        progressRef.current = target;
      } else {
        progressRef.current += (target - progressRef.current) * smoothing;
      }
      const p = progressRef.current;

      const w = startWidth + (endWidth - startWidth) * p;
      const h = startHeight + (endHeight - startHeight) * p;
      const r = startRadius + (endRadius - startRadius) * p;
      const zoom = mediaZoom - (mediaZoom - 1) * p;

      frame.style.width = `${w}vw`;
      frame.style.height = `${h}vh`;
      frame.style.borderRadius = `${r}px`;
      if (img) img.style.transform = `scale(${zoom})`;

      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, startWidth, startHeight, endWidth, endHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing]);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      style={{ height: `${(scrollDistance + holdDistance + 1) * 100}vh` }}
    >
      <div className={styles.stage}>
        <div ref={frameRef} className={styles.frame}>
          {src && (
            <img
              ref={imgRef}
              className={styles.media}
              src={src}
              alt={alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className={styles.scrim} style={{ opacity: overlayScrim }} />
          <div className={styles.content}>{children}</div>
        </div>
        {scrollHint && <div className={styles.hint}>{scrollHint}</div>}
      </div>
    </div>
  );
}
