import JsonLd from '@/components/shared/JsonLd';
import { SITE_URL } from '@/lib/siteConfig';

// BreadcrumbList schema for the destinations listing page.
export default function DestinationsSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${SITE_URL}/destinations` },
    ],
  };

  return <JsonLd data={data} />;
}
