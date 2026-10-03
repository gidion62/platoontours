import PageHeader from '@/components/shared/PageHeader';
import RevealOnMount from '@/components/shared/RevealOnMount';
import TourGrid from './TourGrid';

export default function SafarisPage() {
  return (
    <div className="page" data-page="safaris">
      <RevealOnMount />
      <PageHeader title="Tanzania Safaris" />

      <section>
        <div className="intro-block reveal" style={{ maxWidth: 820 }}>
          <p>
            Discover the beauty of Tanzania with our carefully crafted safari packages designed for unforgettable
            wildlife adventures. From the endless plains of Serengeti National Park and the breathtaking Ngorongoro
            Crater to the elephant-rich landscapes of Tarangire and the scenic Lake Manyara, Platoon Tours offers
            exceptional safari experiences for every traveler. Whether you&rsquo;re looking for a luxury safari, a
            budget-friendly adventure, a family holiday, or a romantic honeymoon, our experienced guides will help you
            explore Tanzania&rsquo;s incredible wildlife, stunning landscapes, and rich cultural heritage.
          </p>
        </div>

        <TourGrid />
      </section>
    </div>
  );
}
