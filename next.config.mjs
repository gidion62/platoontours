/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Real safari/property photography will live under /public/images — once
    // dropped in, remote patterns below are only needed if you later serve
    // images from an external CMS or bucket instead.
    remotePatterns: []
  }
};

export default nextConfig;
