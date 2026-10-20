import SafarisPage from '@/components/safaris/SafarisPage';

export const metadata = {
  title: 'Tanzania Safaris & East Africa Packages',
  description: 'Browse every Platoon Tours safari package — from short Tarangire & Ngorongoro express trips to the full Northern Circuit and Zanzibar add-ons, plus East Africa packages: Rwanda and Uganda gorilla trekking and a Kenya–Tanzania Masai Mara to Serengeti safari.',
  alternates: { canonical: '/safaris' },
};

export default function Page() {
  return <SafarisPage />;
}
