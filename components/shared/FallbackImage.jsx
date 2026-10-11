'use client';

import { useEffect, useRef, useState } from 'react';

// A plain <img> that tells its siblings when it has finished loading, by
// setting data-ready on itself. Cards use that (img:not([data-ready]) ~ ...)
// to keep their dark fade and text hidden until the photo is there, so no
// placeholder colour or gradient ever shows before the picture. If the file
// is missing the image hides itself instead of showing a broken-image icon.
// Event handlers can't be passed as props from a Server Component straight
// to a DOM element, so any page that stays a Server Component (like
// HomePage.jsx) needs the logic wrapped in a small Client Component — this
// is that wrapper.
export default function FallbackImage({ className, src, alt, loading = 'lazy' }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  // The photo may already be in the browser cache and finished loading
  // before React attached onLoad, so check once on mount as well.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete) setReady(true);
  }, []);

  return (
    <img
      ref={ref}
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      data-ready={ready ? 'true' : undefined}
      onLoad={() => setReady(true)}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        setReady(true);
      }}
    />
  );
}
