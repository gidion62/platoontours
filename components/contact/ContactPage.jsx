import PageHeader from '@/components/shared/PageHeader';
import RevealOnMount from '@/components/shared/RevealOnMount';
import BookingEngine from './BookingEngine';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className="page" data-page="contact">
      <RevealOnMount />
      <PageHeader title="Get in Touch with Platoon Tours" />

      <section>
        <div className={styles.contactGrid}>
          <div className={`${styles.contactInfo} reveal`}>
            <h2>Let&apos;s plan your trip</h2>
            <p>
              Ready to explore Tanzania? Contact Platoon Tours to plan your safari, Zanzibar holiday, or tailor-made
              adventure. Our team is here to answer your questions, help you choose the right experience, and create a
              journey that suits your travel plans.
            </p>

            <div className={styles.ciItem}>
              <div className={styles.ciIcon}>📞</div>
              <div>
                <div className={styles.ciLabel}>Call us</div>
                <a className={styles.ciValue} href="tel:+15053867707">
                  +1 505 386 7707
                </a>
              </div>
            </div>
            <div className={styles.ciItem}>
              <div className={styles.ciIcon}>📞</div>
              <div>
                <div className={styles.ciLabel}>Call us</div>
                <a className={styles.ciValue} href="tel:+255758979598">
                  +255 758 979 598
                </a>
              </div>
            </div>
            <div className={styles.ciItem}>
              <div className={styles.ciIcon}>✉</div>
              <div>
                <div className={styles.ciLabel}>Email us</div>
                <a className={styles.ciValue} href="mailto:info@platoon-tours.com">
                  info@platoon-tours.com
                </a>
              </div>
            </div>

            <a className={styles.ciWhatsapp} href="https://wa.me/c/255758979598" target="_blank" rel="noopener noreferrer">
              Chat with us on WhatsApp
            </a>
          </div>

          <BookingEngine />
        </div>
      </section>
    </div>
  );
}
