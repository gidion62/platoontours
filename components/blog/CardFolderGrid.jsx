'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BlogPage.module.css';

const ACCENTS = ['#c9a227', '#3d5c42', '#3a5a6e']; // sunset gold / moss / teal — rotate per card
const OBJECT_SHAPES = [
  <svg viewBox="0 0 64 64" key="circle">
    <circle cx="32" cy="32" r="26" fill="rgba(0,0,0,0.28)" />
  </svg>,
  <svg viewBox="0 0 64 64" key="triangle">
    <polygon points="32,6 58,58 6,58" fill="rgba(0,0,0,0.28)" />
  </svg>,
  <svg viewBox="0 0 64 64" key="diamond">
    <rect x="12" y="12" width="40" height="40" rx="8" transform="rotate(45 32 32)" fill="rgba(0,0,0,0.28)" />
  </svg>,
];

function CardFolder({ post, index, openIndex, setOpenIndex }) {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);
  const isOpen = openIndex === index;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setInView(true), (index % 6) * 70);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  const accent = ACCENTS[index % ACCENTS.length];
  const shape = OBJECT_SHAPES[index % OBJECT_SHAPES.length];

  return (
    <div
      ref={cardRef}
      className={`${styles.cfCard} ${inView ? styles.in : ''} ${isOpen ? styles.open : ''}`}
      onClick={(e) => {
        if (e.target.closest('a')) return; // let the real "read more" link work normally
        setOpenIndex(isOpen ? null : index);
      }}
    >
      <div className={styles.cfNotchZone}>
        <div className={styles.cfAccent} style={{ background: accent }}>
          <span className={styles.cfObject}>{shape}</span>
        </div>
        <div
          className={styles.cfFaceCut}
          style={{
            background: post.slug
              ? `url(/images/home/blog-${post.slug}.jpg) center/cover no-repeat, linear-gradient(150deg, ${post.grad[0]}, ${post.grad[1]})`
              : `linear-gradient(150deg, ${post.grad[0]}, ${post.grad[1]})`,
          }}
        />
        <div className={styles.cfTop}>
          <span className={styles.cfNum}>
            {String(index + 1).padStart(2, '0')} · {post.tag}
          </span>
          <span className={styles.cfIconBtn}>↗</span>
        </div>
      </div>
      <div className={styles.cfBody}>
        <h3>{post.title}</h3>
        <p className={styles.cfExcerpt}>{post.excerpt}</p>
        <div className={styles.cfExpandWrap}>
          <div className={styles.cfExpandInner}>
            <div className={styles.cfMeta}>
              {post.tag} · {post.readTime}
            </div>
            <p className={styles.cfFull}>{post.full}</p>
            {post.url ? (
              <a className={styles.cfReadmore} href={post.url} target="_blank" rel="noopener noreferrer">
                Read the full post →
              </a>
            ) : (
              <span className={styles.cfSoon}>Coming soon</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardFolderGrid({ posts }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className={styles.blogGrid}>
      {posts.map((post, i) => (
        <CardFolder key={post.title} post={post} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
      ))}
    </div>
  );
}
