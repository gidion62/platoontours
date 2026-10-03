import { notFound } from 'next/navigation';
import packageDetails from '@/lib/packages';
import PackagePage from '@/components/package/PackagePage';

export function generateStaticParams() {
  return Object.keys(packageDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = packageDetails[slug];
  if (!d) return {};
  const ogImage = `/images/packages/${slug}-detail.jpg`;
  return {
    title: d.title,
    description: d.intro,
    alternates: { canonical: `/safaris/${slug}` },
    openGraph: {
      title: d.title,
      description: d.intro,
      url: `/safaris/${slug}`,
      images: [{ url: ogImage, alt: d.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.title,
      description: d.intro,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const d = packageDetails[slug];
  if (!d) notFound();
  return <PackagePage data={d} slug={slug} />;
}
