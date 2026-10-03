import { SITE_URL } from '@/lib/siteConfig';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/terms', // general-template legal page — see components/terms/TermsPage.jsx
      },
      // Explicitly named so it's unambiguous these AI crawlers are welcome —
      // they'd already be covered by the '*' rule above, but naming them
      // removes any doubt for AI-visibility purposes.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
