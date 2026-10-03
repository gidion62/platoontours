'use client';

import useScrollReveal from '@/components/shared/useScrollReveal';

// Tiny client-only wrapper so a (server-rendered) page can still get the
// generic .reveal scroll-in behavior (see styles/globals.css's .reveal /
// .reveal.in rules) without the whole page having to become a client
// component itself. Drop <RevealOnMount /> anywhere in a server-component
// page that renders elements with the "reveal" class.
export default function RevealOnMount() {
  useScrollReveal();
  return null;
}
