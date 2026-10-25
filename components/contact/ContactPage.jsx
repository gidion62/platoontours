import PageHeader from '@/components/shared/PageHeader';
import RevealOnMount from '@/components/shared/RevealOnMount';
import BookingEngine from './BookingEngine';
import styles from './ContactPage.module.css';

// Clean outline phone icon (replaces the 📞 emoji) — takes the colour of the
// surrounding text so it matches the rest of the page.
function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: 'var(--ink)' }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Small inline SVG flags (emoji flags don't render on Windows, they show up
// as plain letters, so these are drawn instead).
const flagStyle = { width: 21, height: 14, borderRadius: 2, marginRight: 7, verticalAlign: '-3px', boxShadow: '0 0 0 1px rgba(74, 63, 54, 0.18)' };

function UsFlag() {
  return (
    <svg viewBox="0 0 30 20" style={flagStyle} role="img" aria-label="United States flag">
      <rect width="30" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(20 * 7) / 13} fill="#3c3b6e" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={2 + c * 4 + (r % 2) * 0} cy={1.8 + r * 2.6} r="0.6" fill="#fff" />)
      )}
    </svg>
  );
}

function TzFlag() {
  return (
    <svg viewBox="0 0 30 20" style={flagStyle} role="img" aria-label="Tanzania flag">
      <defs>
        <clipPath id="tzClip">
          <rect width="30" height="20" />
        </clipPath>
      </defs>
      <g clipPath="url(#tzClip)">
        <polygon points="0,0 30,0 0,20" fill="#1eb53a" />
        <polygon points="30,0 30,20 0,20" fill="#00a3dd" />
        <line x1="-2" y1="22" x2="32" y2="-2" stroke="#fcd116" strokeWidth="8" />
        <line x1="-2" y1="22" x2="32" y2="-2" stroke="#000" strokeWidth="5.2" />
      </g>
    </svg>
  );
}

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
              <div className={styles.ciIcon}>
                <PhoneIcon />
              </div>
              <div>
                <div className={styles.ciLabel}>
                  <UsFlag />
                  Call us · United States
                </div>
                <a className={styles.ciValue} href="tel:+15053867707">
                  +1 505 386 7707
                </a>
              </div>
            </div>
            <div className={styles.ciItem}>
              <div className={styles.ciIcon}>
                <PhoneIcon />
              </div>
              <div>
                <div className={styles.ciLabel}>
                  <TzFlag />
                  Call us · Tanzania
                </div>
                <a className={styles.ciValue} href="tel:+255758979598">
                  +255 758 979 598
                </a>
              </div>
            </div>
            <div className={styles.ciItem}>
              <div className={styles.ciIcon}>✉</div>
              <div>
                <div className={styles.ciLabel}>Email us</div>
                <a className={styles.ciValue} href="mailto:info@platoontours.com">
                  info@platoontours.com
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
