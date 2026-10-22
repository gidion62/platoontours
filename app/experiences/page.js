import ExperiencesPage from '@/components/experiences/ExperiencesPage';

export const metadata = {
  title: 'Experiences',
  description:
    'Beyond the safari: meet the Hadzabe at Lake Eyasi, paddle Lake Duluti, swim at Kikuletwa Hot Springs, hike Materuni Waterfall and explore Arusha with Platoon Tours.',
  alternates: { canonical: '/experiences' },
};

export default function Page() {
  return <ExperiencesPage />;
}
