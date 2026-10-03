import styles from './PageHeader.module.css';

// TODO: this plain heading is a placeholder for the MaskedHeading GSAP reveal
// treatment (clip-path text mask + parallax media fill) used on these titles
// in the original build — port components/shared/MaskedHeading.jsx from the
// original script's IIFE (search platoon-frontend-preview.html for
// "MaskedHeading — ported from React Bits") and swap it in here once ready.
export default function PageHeader({ title }) {
  return (
    <header className={styles.pageHeader}>
      <h1>{title}</h1>
    </header>
  );
}
