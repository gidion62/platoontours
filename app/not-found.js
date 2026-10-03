import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="page" data-page="not-found">
      <PageHeader title="Page Not Found" />
      <section>
        <div className="section-inner reveal" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p>
            That page doesn&apos;t exist — it may have moved, or the link was mistyped. Here are a few places to pick
            up from:
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/safaris">Safaris</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
