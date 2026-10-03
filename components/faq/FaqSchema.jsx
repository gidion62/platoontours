import JsonLd from '@/components/shared/JsonLd';
import faqs from '@/lib/faqs';

// FAQPage schema for the homepage FAQ section (rendered by FaqList) — kept
// as a separate server component since FaqList itself is a client component
// ('use client', for the open/close state) and can't export metadata/JSON-LD.
export default function FaqSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return <JsonLd data={data} />;
}
