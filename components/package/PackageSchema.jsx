import JsonLd from '@/components/shared/JsonLd';
import { SITE_URL } from '@/lib/siteConfig';

function parsePrice(priceStr) {
  const match = /[\d,]+/.exec(priceStr || '');
  return match ? match[0].replace(/,/g, '') : undefined;
}

function parseDurationDays(durationStr) {
  const match = /\d+/.exec(durationStr || '');
  return match ? match[0] : undefined;
}

// TouristTrip + BreadcrumbList schema for one package detail page.
export default function PackageSchema({ data, slug }) {
  const days = parseDurationDays(data.duration);
  const price = parsePrice(data.price);
  const pageUrl = `${SITE_URL}/safaris/${slug}`;

  const tripData = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: data.title,
    description: data.intro,
    url: pageUrl,
    touristType: 'Safari travelers',
    ...(data.itinerary?.length && {
      itinerary: data.itinerary.map((day) => ({
        '@type': 'TouristAttraction',
        name: day.title,
        description: day.text,
      })),
    }),
    ...(days && { duration: `P${days}D` }),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      ...(price && { price }),
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
    provider: { '@type': 'TravelAgency', name: 'Platoon Tours', url: SITE_URL },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Safaris', item: `${SITE_URL}/safaris` },
      { '@type': 'ListItem', position: 3, name: data.title, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={tripData} />
      <JsonLd data={breadcrumbData} />
    </>
  );
}
