import JsonLd from './JsonLd';
import { SITE_URL, SITE_NAME, CONTACT, SOCIAL_LINKS } from '@/lib/siteConfig';

// Sitewide Organization/TravelAgency + LocalBusiness schema, rendered once
// in app/layout.js so every page carries it.
export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.locality,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    sameAs: SOCIAL_LINKS,
  };

  return <JsonLd data={data} />;
}
