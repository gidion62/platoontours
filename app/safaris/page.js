import SafarisPage from '@/components/safaris/SafarisPage';

export const metadata = {
  title: 'Safari Packages',
  description: 'Browse every Platoon Tours safari package — from short Tarangire & Ngorongoro express trips to the full Northern Circuit and Zanzibar add-ons.',
  alternates: { canonical: '/safaris' },
};

export default function Page() {
  return <SafarisPage />;
}
