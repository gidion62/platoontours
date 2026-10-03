import AboutPage from '@/components/about/AboutPage';

export const metadata = {
  title: 'About Us',
  description:
    'Platoon Tours is a proudly Tanzanian company founded by two brothers and former soldiers, bringing military-grade safety and genuine warmth to every safari.',
  alternates: { canonical: '/about' },
};

export default function Page() {
  return <AboutPage />;
}
