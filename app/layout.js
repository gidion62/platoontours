import SiteHeader from '@/components/nav/SiteHeader';
import SiteFooter from '@/components/footer/SiteFooter';
import OrganizationSchema from '@/components/shared/OrganizationSchema';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/siteConfig';
import '@/styles/globals.css';

// ---------------------------------------------------------------------------
// Fonts: Montserrat (headings) / Lato (body) / Lora (accent/italic), loaded
// the same way the original preview HTML loads them — a plain Google Fonts
// <link> in <head>, fetched by the browser at runtime. (We tried next/font/
// google here first, but it self-hosts by downloading the font files at
// *build* time, which needs network access during `next build`/`next dev`;
// if that fetch is blocked or slow in a given environment it fails silently
// and falls back to the browser default, which is the "wrong/ugly font"
// symptom. This <link> approach has no build-time dependency at all.)
//
// Once the paid Druk Wide (headings) / Gotham (body) fonts are licensed,
// replace this <link> with @font-face rules pointing at files in
// /public/fonts, and update the --font-montserrat / --font-lato /
// --font-lora values in styles/globals.css's :root block to the new family
// names — every *.module.css file already reads those variables, so that's
// the only change needed.
// ---------------------------------------------------------------------------

const DEFAULT_TITLE = 'Platoon Tours — Unforgettable Tanzania Safari Adventures';
const DEFAULT_DESCRIPTION =
  'Founder-guided Tanzania safari adventures — Serengeti, Ngorongoro Crater, Tarangire and Zanzibar — designed your way.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Platoon Tours',
  },
  description: DEFAULT_DESCRIPTION,
  verification: {
    google: 'rrwTsMZCjEGBtk_RdkKiFmJ_WBKE2KJS2wv0AVWTubE',
  },
  openGraph: {
    type: 'website',
    siteName: 'Platoon Tours',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1080, height: 720, alt: 'Ngorongoro Crater rim, Tanzania' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Lato:wght@400;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OrganizationSchema />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
