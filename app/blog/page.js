import BlogPage from '@/components/blog/BlogPage';

export const metadata = {
  title: 'The Platoon Journal',
  description: 'Safari planning guides, packing lists, and stories from the field — the Platoon Tours blog.',
  alternates: { canonical: '/blog' },
};

export default function Page() {
  return <BlogPage />;
}
