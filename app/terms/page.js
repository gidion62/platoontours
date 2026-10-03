import TermsPage from '@/components/terms/TermsPage';

export const metadata = {
  title: 'Terms and Conditions',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <TermsPage />;
}
