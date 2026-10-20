import PageHeader from '@/components/shared/PageHeader';
import RevealOnMount from '@/components/shared/RevealOnMount';
import TourGrid from './TourGrid';
import { eastAfricaPackages } from '@/lib/safariPackages';

export default function SafarisPage() {
  return (
    <div className="page" data-page="safaris">
      <RevealOnMount />
      <PageHeader title="Tanzania Safaris" subtitle="and East Africa Packages" />

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

      <section>
        <div className="intro-block reveal" style={{ maxWidth: 820 }}>
          <h2>East Africa Packages</h2>
          <p>
            Go beyond Tanzania with our East Africa packages &mdash; mountain gorilla trekking in Rwanda&rsquo;s
            Volcanoes National Park and Uganda&rsquo;s Bwindi Impenetrable Forest, and a cross-border Kenya&ndash;Tanzania
            safari from the Masai Mara to the Serengeti, Ngorongoro Crater and Tarangire.
          </p>
        </div>

        <TourGrid packages={eastAfricaPackages} />
      </section>
    </div>
  );
}
