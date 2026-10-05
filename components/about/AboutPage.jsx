'use client';

import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import useScrollReveal from '@/components/shared/useScrollReveal';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const [storyOpen, setStoryOpen] = useState(false);
  useScrollReveal();

  return (
    <div className={`page ${styles.camoPage}`} data-page="about">
      <PageHeader title="About Us" />

      <section>
        <div className={`${styles.introBlock} reveal`}>
          <p>
            Platoon Tours is a proudly Tanzanian company founded by two brothers and former soldiers. We trade rifles for
            compasses and combat missions for discovery—bringing military-grade safety, advanced medical training, and
            genuine warmth to every journey. With small groups and founder-led guiding, we take you off the beaten path to
            experience the real Africa, not the tourist traps.
          </p>
          <button
            className={`${styles.storyToggle} ${storyOpen ? styles.open : ''}`}
            onClick={() => setStoryOpen((v) => !v)}
          >
            <span>Read our full story</span>
            <span className={styles.arrow}>›</span>
          </button>
        </div>

        <div className={`${styles.fullStory} ${storyOpen ? styles.open : ''}`}>
          <div className={`${styles.fullStoryInner} section-inner`}>
            <p>
              Platoon Tours was founded by two brothers—former soldiers who once served their country with honor and
              discipline. Today, they serve their guests with the same unwavering commitment, guiding travelers through
              the wilds of Tanzania with military precision and genuine warmth.
            </p>

            <h3>From Service to Safari</h3>
            <p>With over 36 years of combined active-duty military experience, our founders bring a unique skillset to every safari:</p>
            <ul className={styles.skillList}>
              <li>
                <strong>Advanced medical training</strong> and emergency response expertise
              </li>
              <li>
                <strong>Terrain navigation</strong> honed in challenging environments
              </li>
              <li>
                <strong>Crisis management</strong> and split-second decision-making
              </li>
              <li>
                <strong>Unbreakable trust</strong> forged through years of service together
              </li>
            </ul>
            <p>
              We traded our rifles for compasses, our uniforms for safari gear, and our missions of combat for missions of
              discovery. But our core values remain unchanged: loyalty, discipline, and an unbreakable bond with every
              traveler who joins us.
            </p>

            <h3>What Sets Us Apart</h3>
            <div className={styles.apartGrid}>
              <div className={styles.apartItem}>
                <h4>Military-Grade Safety</h4>
                <p>
                  Every tour is led by trained medics carrying advanced trauma kits. We pre-map every route for emergency
                  evacuation and anticipate risks before they arise.
                </p>
              </div>
              <div className={styles.apartItem}>
                <h4>Personal &amp; Authentic</h4>
                <p>
                  We never outsource to freelancers. Every safari is personally guided by one of the founders—ensuring
                  genuine storytelling, seamless coordination, and a family atmosphere.
                </p>
              </div>
              <div className={styles.apartItem}>
                <h4>Small Groups, Big Experiences</h4>
                <p>We keep our groups intimate to ensure every guest receives our full attention and a truly personalized adventure.</p>
              </div>
              <div className={styles.apartItem}>
                <h4>Zero Tourist Traps</h4>
                <p>We take you off the beaten path—to hidden viewpoints, local communities, and authentic experiences that mass tourism never reaches.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.missionBlock}>
        <div className={`section-inner reveal`}>
          <h2 className="centered">Our Mission</h2>
          <p>
            To deliver unforgettable, life-changing safaris without compromising safety. Whether you&rsquo;re a solo
            traveler, a couple, or a family, we treat every guest like a member of our unit—not just a customer. We
            listen, adapt, and go the extra mile to ensure your journey exceeds every expectation.
          </p>
        </div>
      </section>

      <section className={styles.joinBlock}>
        <div className="section-inner reveal">
          <h2>Join the Platoon</h2>
          <p>
            When you travel with us, you&rsquo;re not just booking a safari. You&rsquo;re joining a brotherhood.
            You&rsquo;re becoming part of our story. And we promise—we never leave a man behind.
          </p>
          <span className={`font-accent ${styles.joinAccent}`}>
            Experience Tanzania with experts who call it home. Experience it with Platoon Tours.
          </span>
        </div>
      </section>

      <p className={`${styles.partnersLine} reveal`}>
        Platoon Tours is a proud partner of{' '}
        <a href="https://www.africa-safaris.com/" target="_blank" rel="noopener noreferrer">
          Africa Safaris
        </a>
        {'\u00a0and\u00a0'}
        <a href="https://nomiddlemantours.com/tour-operators/platoon-tours" target="_blank" rel="noopener noreferrer">
          No Middleman Tours
        </a>
        .
      </p>
    </div>
  );
}
