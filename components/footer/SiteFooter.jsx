import Link from 'next/link';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footTop}>
        <div className={styles.footBrand}>
          <div className={styles.footLogoRow}>
            <img src="/images/logo.png" alt="Platoon Tours" className={styles.footLogoMark} />
            <span className={styles.footLogo}>Platoon Tours</span>
          </div>
          <p>Personalized safari adventures across Tanzania, crafted with expert care and authentic local insight.</p>
          <div className={styles.footSocial}>
            <a href="https://www.facebook.com/people/Platoon-Tours/61582170338875/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9v-2.88h2.54V9.79c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="https://www.tripadvisor.co.uk/Attraction_Review-g297913-d34317704-Reviews-Platoon_Tours-Arusha_Arusha_Region.html" target="_blank" rel="noopener noreferrer" aria-label="Tripadvisor">
              <svg viewBox="0 0 24 24">
                <circle cx="8.5" cy="13.5" r="3.2" fill="none" stroke="#fff8ed" strokeWidth="1.6" />
                <circle cx="15.5" cy="13.5" r="3.2" fill="none" stroke="#fff8ed" strokeWidth="1.6" />
                <circle cx="8.5" cy="13.5" r="1.1" />
                <circle cx="15.5" cy="13.5" r="1.1" />
                <path d="M12 6.5c-2.6 0-4.9.9-6.6 2.4h13.2C16.9 7.4 14.6 6.5 12 6.5z" fill="none" stroke="#fff8ed" strokeWidth="1.6" />
              </svg>
            </a>
            <a href="https://www.instagram.com/platoontours?igsh=NzA5MHBsNjdvNDNm" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="#fff8ed" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff8ed" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
            </a>
            <a href="https://wa.me/c/255758979598" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.3-.6-2.2-1.1-3-2.5-.2-.4.2-.3.5-.9.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footCol}>
          <h4>Explore</h4>
          <Link href="/safaris">Safaris</Link>
          <Link href="/zanzibar">Zanzibar</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div className={styles.footCol}>
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/destinations">Mt. Kilimanjaro</Link>
        </div>
        <div className={styles.footCol}>
          <h4>Support</h4>
          <Link href="/#faq">Safari FAQs</Link>
          <Link href="/contact">Help Me Plan My Trip</Link>
          <Link href="/terms">Terms and Conditions</Link>
        </div>
      </div>

      <div className={styles.footContactBar}>
        <div className={styles.footContactItem}>
          <div className={styles.fcIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.4" />
            </svg>
          </div>
          <div>
            <h5>Visit Us</h5>
            <p>
              Arusha, Tanzania
              <br />
              East Africa
            </p>
          </div>
        </div>
        <div className={styles.footContactItem}>
          <div className={styles.fcIcon}>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5 12 13l8.5-6.5" />
            </svg>
          </div>
          <div>
            <h5>Email Us</h5>
            <p>info@platoon-tours.com</p>
          </div>
        </div>
        <div className={styles.footContactItem}>
          <div className={styles.fcIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1.3 1.3 0 0 1 1.3-.3c1.4.5 2.9.7 4.4.8a1.3 1.3 0 0 1 1.2 1.3V21a1.3 1.3 0 0 1-1.3 1.3C10.6 22.3 1.7 13.4 1.7 2.3A1.3 1.3 0 0 1 3 1h3.9a1.3 1.3 0 0 1 1.3 1.2c.1 1.5.3 3 .8 4.4a1.3 1.3 0 0 1-.3 1.3z" />
            </svg>
          </div>
          <div>
            <h5>Call Us</h5>
            <p>+255 758 979 598</p>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>© 2026 Platoon Tours. All Rights Reserved.</div>
    </footer>
  );
}
