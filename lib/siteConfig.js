// Central place for the facts that show up in metadata, schema.org markup,
// sitemap.js and robots.js — one spot to update once the new domain/email
// are fully live, instead of hunting through every file that mentions them.

export const SITE_URL = 'https://www.platoontours.com';
export const SITE_NAME = 'Platoon Tours';

export const CONTACT = {
  // TODO: switch to info@platoontours.com once the new domain's business
  // email is live (see the launch plan, Phase 2) — kept as the real,
  // currently-working address until then.
  email: 'info@platoon-tours.com',
  phone: '+255758979598',
  phoneDisplay: '+255 758 979 598',
  locality: 'Arusha',
  region: 'Arusha Region',
  country: 'TZ',
};

// Kept in sync with the icons rendered in components/footer/SiteFooter.jsx.
export const SOCIAL_LINKS = [
  'https://www.facebook.com/people/Platoon-Tours/61582170338875/',
  'https://www.tripadvisor.co.uk/Attraction_Review-g297913-d34317704-Reviews-Platoon_Tours-Arusha_Arusha_Region.html',
  'https://www.instagram.com/platoontours',
  'https://wa.me/c/255758979598',
];

// A landscape photo used as the default Open Graph / Twitter card image
// whenever a page doesn't set its own.
export const DEFAULT_OG_IMAGE = '/images/home/caldera-rim.jpg';
