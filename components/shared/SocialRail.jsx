import styles from './SocialRail.module.css';

// Small social-icon rail pinned to the left edge of every page (rendered once
// from app/layout.js). Same four links as the footer.
const LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Platoon-Tours/61582170338875/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9v-2.88h2.54V9.79c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/platoon_tours?cplk=MTZ3eWh3dHpxbWRubg==',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.2" cy="6.8" r="1.1" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/c/255758979598',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.1 8.1 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-1.3-.6-2.2-1.1-3-2.5-.2-.4.2-.3.5-.9.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.7 2.7 4.2 3.7 2 .8 2.4.7 2.8.6.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z" />
      </svg>
    ),
  },
  {
    label: 'Tripadvisor',
    href: 'https://www.tripadvisor.co.uk/Attraction_Review-g297913-d34317704-Reviews-Platoon_Tours-Arusha_Arusha_Region.html',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8.5" cy="13.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="15.5" cy="13.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="8.5" cy="13.5" r="1.2" />
        <circle cx="15.5" cy="13.5" r="1.2" />
        <path d="M12 6.5c-2.6 0-4.9.9-6.6 2.4h13.2C16.9 7.4 14.6 6.5 12 6.5z" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Platoontours',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
      </svg>
    ),
  },
];

export default function SocialRail() {
  return (
    <aside className={styles.rail} aria-label="Social links">
      {LINKS.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label}>
          {l.icon}
        </a>
      ))}
    </aside>
  );
}
