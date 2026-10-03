'use client';

// A plain <img> with an onError fallback (hide itself so the parent's
// gradient/background shows through instead of a broken-image icon).
// Event handlers can't be passed as props from a Server Component straight
// to a DOM element, so any page that stays a Server Component (like
// HomePage.jsx) needs the onError logic wrapped in its own small Client
// Component — this is that wrapper. Pages that are already 'use client'
// (CinematicSection, DestGallery, PackageCarousel) don't need this; they
// use the same onError pattern directly since they're already client-side.
export default function FallbackImage({ className, src, alt, loading = 'lazy' }) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}
