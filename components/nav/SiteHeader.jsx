'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import navStyles from './NavBar.module.css';
import drawerStyles from './MobileDrawer.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/safaris', label: 'Safaris' },
  { href: '/zanzibar', label: 'Zanzibar' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/blog', label: 'Blog' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open, and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className={navStyles.navWrap}>
        <nav className={navStyles.nav}>
          <Link href="/" className={navStyles.logo} aria-label="Platoon Tours — Home">
            <img src="/images/logo.png" alt="Platoon Tours" className={navStyles.logoMark} />
          </Link>
          <div className={navStyles.menu}>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? navStyles.active : ''}>
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" className={navStyles.ctaNav}>
            Get a Free Quote
          </Link>
          <button
            className={`${navStyles.hamburgerBtn} ${open ? navStyles.open : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      <div
        className={`${drawerStyles.drawerOverlay} ${open ? drawerStyles.open : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`${drawerStyles.mobileDrawer} ${open ? drawerStyles.open : ''}`}>
        <div className={drawerStyles.mdHead}>
          <span className={drawerStyles.mdLogo}>Platoon Tours</span>
          <button className={drawerStyles.mdClose} aria-label="Close menu" onClick={() => setOpen(false)}>
            &times;
          </button>
        </div>
        <nav className={drawerStyles.mdLinks}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? drawerStyles.active : ''} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className={drawerStyles.mdCta} onClick={() => setOpen(false)}>
          Get a Free Quote
        </Link>
      </aside>
    </>
  );
}
