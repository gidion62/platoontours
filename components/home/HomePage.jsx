import Link from 'next/link';
import CinematicSection from './CinematicSection';
import PackageCarousel from './PackageCarousel';
import DestGallery from './DestGallery';
import InquiryForm from './InquiryForm';
import FaqList from '@/components/faq/FaqList';
import FaqSchema from '@/components/faq/FaqSchema';
import styles from './HomePage.module.css';
import RevealOnMount from '@/components/shared/RevealOnMount';
import FallbackImage from '@/components/shared/FallbackImage';
import BookNowSlideshow from './BookNowSlideshow';

export default function HomePage() {
  return (
    <div className="page" data-page="home">
      <RevealOnMount />
      {/* Preload the hero poster/video so the browser fetches them immediately,
          in parallel with everything else, instead of waiting until the <video>
          tag is parsed — this is what closes the visible gap where the
          .heroBg gradient shows before the real hero paints. */}
      <link rel="preload" as="image" href="/images/hero-poster.jpg" />
      <link rel="preload" as="video" href="/videos/hero.mp4" type="video/mp4" />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        {/* Drop the real file in /public/videos/hero.mp4 (+ optionally hero.webm
            for smaller size) and a first-frame still in /public/images/hero-poster.jpg.
            Until those exist this <video> has no source to play, so it just
            renders as empty/transparent and the .heroBg gradient above shows
            through — nothing breaks, nothing to change here once the files land. */}
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroScrim} />
        <div className={styles.heroBody}>
          {/* TODO: swap for the SplitText per-character reveal used in the original build */}
          <h1 className={`${styles.heroTitle} fade-rise d1`}>Unforgettable adventures, designed your way.</h1>
          <p className={`${styles.heroSub} fade-rise d2`}>
            Founder-guided journeys through the Serengeti, Ngorongoro, and beyond — built around the moments no itinerary
            can promise, but ours usually finds.
          </p>
          <div className={`${styles.heroCtas} fade-rise d3`}>
            <Link href="/safaris" className={styles.btnOutline}>
              Explore packages
            </Link>
            <Link href="/contact" className={styles.btnOutline}>
              Plan my safari
            </Link>
          </div>
        </div>
      </section>

      <CinematicSection />

      <section className={styles.carouselSection} id="packages">
        <div className="section-inner">
          <h2 className="reveal">Every safari, arranged around you.</h2>
          <p className="reveal" style={{ color: 'var(--clay)', fontWeight: 600 }}>Browse with the arrows.</p>
          <PackageCarousel />
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className="section-inner reveal">
          <h2 className={styles.trustHeading}>What guests are saying</h2>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>&ldquo;The founders themselves guided us — you can feel the difference in how they read the terrain and the animals.&rdquo;</p>
              <div className={styles.trustMeta}>Sarah M. · Tripadvisor</div>
            </div>
            <div className={styles.trustCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>&ldquo;Our honeymoon safari was unforgettable. Private sundowners on the crater rim, exactly as promised.&rdquo;</p>
              <div className={styles.trustMeta}>James &amp; Priya K. · Google</div>
            </div>
            <div className={styles.trustCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>&ldquo;Small group, real expertise, zero tourist-trap energy. Booking again for Zanzibar.&rdquo;</p>
              <div className={styles.trustMeta}>Daniel R. · Trustpilot</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-inner reveal">
          <div className={styles.teaserGrid}>
            {/* Photos: /public/images/home/teaser-zanzibar.jpg and teaser-kilimanjaro.jpg
                — the inline gradient stays as a fallback if either is missing. */}
            <Link href="/zanzibar" className={styles.teaserCard} style={{ background: 'linear-gradient(150deg,#3a5a6e,#12242c)' }}>
              <FallbackImage className={styles.teaserImg} src="/images/home/teaser-zanzibar.jpg" alt="Zanzibar beach" />
              <div className={styles.teaserShade} />
              <div className={styles.teaserContent}>
                <div className={styles.teaserEyebrow}>After the wild</div>
                <h3>Zanzibar</h3>
                <p>White sand, warm water, and Stone Town — the safari&apos;s natural epilogue.</p>
              </div>
            </Link>
            <Link href="/destinations" className={styles.teaserCard} style={{ background: 'linear-gradient(150deg,#4a4a4a,#161616)' }}>
              <FallbackImage className={styles.teaserImg} src="/images/home/teaser-kilimanjaro.jpg" alt="Mount Kilimanjaro" />
              <div className={styles.teaserShade} />
              <div className={styles.teaserContent}>
                <div className={styles.teaserEyebrow}>Africa&apos;s roof</div>
                <h3>Mount Kilimanjaro</h3>
                <p>Climbable without technical experience on the Machame route.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="section-inner reveal">
          {/* TODO: swap for the MaskedHeading reveal treatment used in the original build */}
          <h2 className="font-display">How it works</h2>
          <div className={styles.steps}>
            <div className={styles.stepItem}>
              <div className={styles.stepNum}>1</div>
              <h3>Tell us your trip</h3>
              <p>A few details on the quick form below — dates, group size, what you&apos;re after.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNum}>2</div>
              <h3>We design your itinerary</h3>
              <p>A tailor-made route built around your pace, not a fixed package.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNum}>3</div>
              <h3>Travel</h3>
              <p>We handle the logistics; you show up and experience Tanzania.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bookNow} id="book-now">
        <div className={styles.bookNowBg} />
        {/* Crossfading photo slideshow instead of a second autoplay video —
            same cinematic feel, a fraction of the load weight. */}
        <BookNowSlideshow />
        <div className={styles.bookNowShade} />
        <div className={styles.bookNowBody}>
          <h2>Your Tanzania is waiting.</h2>
          <Link href="/contact" className={styles.bookNowBtn}>
            Book Now
          </Link>
        </div>
      </section>

      <section className={styles.inquirySection}>
        <div className="section-inner reveal">
          <h2>Start planning</h2>
          <p style={{ textAlign: 'center', color: 'rgba(74,63,54,0.65)' }}>No obligation — just tell us what you&apos;re dreaming of.</p>
          <InquiryForm />
        </div>
      </section>

      <section>
        <div className="section-inner reveal">
          <h2>Northern Tanzania&apos;s celebrated landscapes</h2>
          <DestGallery />
        </div>
      </section>

      <section>
        <div className="section-inner reveal">
          <h2>Frequently asked questions</h2>
          <FaqSchema />
          <FaqList />
        </div>
      </section>

      <section>
        <div className="section-inner reveal">
          <div className={styles.blogHead}>
            <h2>From the journal</h2>
            <Link href="/blog">Read the blog</Link>
          </div>
          <div className={styles.blogGridHome}>
            {/* Photos: /public/images/home/blog-serengeti-timing.jpg,
                blog-packing-list.jpg, blog-ndutu-calving.jpg */}
            <Link className={styles.blogCardHome} href="/blog">
              <div className={styles.blogThumb}>
                <FallbackImage
                  className={styles.blogThumbImg}
                  src="/images/home/blog-serengeti-timing.jpg"
                  alt="The Best Time to Visit the Serengeti"
                />
              </div>
              <h3>The Best Time to Visit the Serengeti</h3>
              <p>A month-by-month breakdown of the migration, the rains, and the crowds.</p>
            </Link>
            <Link className={styles.blogCardHome} href="/blog">
              <div className={styles.blogThumb}>
                <FallbackImage
                  className={styles.blogThumbImg}
                  src="/images/home/blog-packing-list.jpg"
                  alt="What to Actually Pack for a Tanzania Safari"
                />
              </div>
              <h3>What to Actually Pack for a Tanzania Safari</h3>
              <p>Beyond the generic checklist — what guides really tell first-timers.</p>
            </Link>
            <Link className={styles.blogCardHome} href="/blog">
              <div className={styles.blogThumb}>
                <FallbackImage
                  className={styles.blogThumbImg}
                  src="/images/home/blog-ndutu-calving.jpg"
                  alt="Inside the Ndutu Calving Season"
                />
              </div>
              <h3>Inside the Ndutu Calving Season</h3>
              <p>Why this three-month window is unlike anywhere else in Africa.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
