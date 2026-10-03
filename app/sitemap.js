import packageDetails from '@/lib/packages';
import { SITE_URL } from '@/lib/siteConfig';

const BASE_URL = SITE_URL;

export default function sitemap() {
  const staticRoutes = ['', '/about', '/safaris', '/zanzibar', '/destinations', '/contact', '/blog', '/terms'].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const packageRoutes = Object.keys(packageDetails).map((slug) => ({
    url: `${BASE_URL}/safaris/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...packageRoutes];
}
