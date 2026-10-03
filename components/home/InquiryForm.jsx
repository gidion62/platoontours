'use client';

import { useState } from 'react';
import styles from './HomePage.module.css';

export default function InquiryForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      dates: form.dates.value,
      message: form.message.value,
    };
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
    } catch {
      setError('Something went wrong — please try again, or reach us directly on WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return <p style={{ textAlign: 'center', margin: 0 }}>Thanks — we&apos;ll be in touch shortly.</p>;
  }

  return (
    <form className={styles.inquiryForm} onSubmit={handleSubmit}>
      <input required name="name" placeholder="Full name" />
      <input required type="email" name="email" placeholder="Email" />
      <input name="dates" placeholder="Approximate travel dates" />
      <textarea rows={3} name="message" placeholder="What are you dreaming of?" />
      {error && <p style={{ color: 'var(--clay)', fontSize: '0.82rem', margin: 0 }}>{error}</p>}
      <button type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send inquiry'}
      </button>
    </form>
  );
}
