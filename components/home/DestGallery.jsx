'use client';

import { useState } from 'react';
import styles from './HomePage.module.css';
import FallbackImage from '@/components/shared/FallbackImage';

// `img` names the file under /public/images/destinations/ — drop e.g.
// serengeti.jpg in there and this panel picks it up automatically (the
// photo simply stays hidden if the file isn't there yet).
const ITEMS = [
  { name: 'Serengeti National Park', img: 'serengeti', grad: ['#7a6a2f', '#241d0e'] },
  { name: 'Ngorongoro Crater', img: 'ngorongoro', grad: ['#3d5c42', '#12201a'] },
  { name: 'Lake Manyara National Park', img: 'lake-manyara', grad: ['#3a5a6e', '#12242c'] },
  { name: 'Tarangire National Park', img: 'tarangire', grad: ['#6e5a35', '#241d0e'] },
  { name: 'Lake Natron', img: 'lake-natron', grad: ['#6e3550', '#2a1420'] },
  { name: 'Mount Kilimanjaro', img: 'kilimanjaro', grad: ['#4a4a4a', '#161616'] },
];
const DEFAULT_INDEX = 2;
const EXPAND_RATIO = 0.4;

export default function DestGallery() {
  const [active, setActive] = useState(DEFAULT_INDEX);
  const otherShare = (1 - EXPAND_RATIO) / (ITEMS.length - 1);

  return (
    <div className={styles.destGallery} onMouseLeave={() => setActive(DEFAULT_INDEX)}>
      {ITEMS.map((item, i) => (
        <div
          key={item.name}
          className={`${styles.destPanel} ${i === active ? styles.active : ''}`}
          style={{
            flexBasis: `${(i === active ? EXPAND_RATIO : otherShare) * 100}%`,
          }}
          onMouseEnter={() => setActive(i)}
        >
          <FallbackImage
            className={styles.destPanelImg}
            src={`/images/destinations/${item.img}.jpg`}
            alt={item.name}
          />
          <div className={styles.shade} />
          <span className={styles.label}>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
