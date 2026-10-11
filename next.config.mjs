/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Real safari/property photography will live under /public/images — once
    // dropped in, remote patterns below are only needed if you later serve
    // images from an external CMS or bucket instead.
    remotePatterns: []
  },

  // Let browsers keep the photos and videos they have already downloaded, so
  // a returning visitor sees them straight away instead of fetching them again.
  // One day fresh, then served from memory while a newer copy is checked in the
  // background (up to a week) — so if you swap a photo under the same file
  // name, visitors still get the new one within a day. Only /images and
  // /videos are affected; no file is changed.
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];
    return [
      { source: '/images/:path*', headers: cache },
      { source: '/videos/:path*', headers: cache },
    ];
  }
};

export default nextConfig;
