import DestinationsPage from '@/components/destinations/DestinationsPage';
import DestinationsSchema from '@/components/destinations/DestinationsSchema';

export const metadata = {
  title: 'Destinations',
  description:
    'Serengeti, Ngorongoro Crater, Tarangire, Lake Manyara, Lake Natron and Mount Kilimanjaro — explore Tanzania’s top safari destinations.',
  alternates: { canonical: '/destinations' },
};

export default function Page() {
  return (
    <>
      <DestinationsSchema />
      <DestinationsPage />
    </>
  );
}
