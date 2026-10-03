'use client';

import { useState } from 'react';
import faqs from '@/lib/faqs';
import useLanyardPhysics from './useLanyardPhysics';
import styles from './Faq.module.css';

function FaqItem({ faq, isOpen, onToggle }) {
  const { cardRef, settleIn, reset } = useLanyardPhysics();

  function handleToggle() {
    onToggle();
    if (!isOpen) settleIn();
    else reset();
  }

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQ} onClick={handleToggle}>
        {faq.q}
        <span className={styles.plus}>+</span>
      </button>
      <div className={`${styles.faqLanyardWrap} ${isOpen ? styles.open : ''}`}>
        <div className={styles.faqLanyardInner}>
          <div className={styles.lanyardString} />
          <div className={styles.lanyardClip} />
          <div className={styles.lanyardCard} ref={cardRef}>
            <p>{faq.a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={{ marginTop: '2rem' }}>
      {faqs.map((faq, i) => (
        <FaqItem key={faq.q} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
      ))}
    </div>
  );
}
