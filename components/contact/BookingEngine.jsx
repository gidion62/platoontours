'use client';

import { useState } from 'react';
import styles from './ContactPage.module.css';

// Package names offered in the "which safari" dropdown — the shorter,
// currently-published subset from the original booking form. Ported as-is;
// in the real data layer this should pull from lib/packages.js directly so
// the two stay in sync automatically instead of by hand.
const PACKAGE_NAMES = [
  '7-Day Luxury Tanzania Safari with Serengeti Balloon Safari',
  '6-Day Tanzania Safari + 5-Day Zanzibar Luxury Escape',
  "5-Day Luxury Honeymoon Safari: Tanzania's Northern Circuit",
  '6-Day Mid-Range Safari: The Great Calving Season',
  '9-Day Safari: The Ultimate Mara River Crossing Experience',
  '8-Day Tanzania Safari: Western Serengeti & Ngorongoro Crater',
  '4-Day Tanzania Safari Express: Lake Manyara, Ngorongoro & Tarangire',
  '2-Day Tanzania Safari Express: Tarangire & Ngorongoro Crater',
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TIERS = ['Budget', 'Mid-range', 'Luxury'];
const INTERESTS = ['Honeymoon', 'Family', 'Photography', 'Kilimanjaro', 'Zanzibar'];
const INTEREST_LABELS = { Honeymoon: 'Honeymoon', Family: 'Family Trip', Photography: 'Photography', Kilimanjaro: 'Kilimanjaro Add-on', Zanzibar: 'Zanzibar Extension' };

export default function BookingEngine() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    packageName: '',
    month: '',
    groupSize: '',
    tier: null,
    interests: [],
    name: '',
    email: '',
    whatsapp: '',
    country: '',
    message: '',
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const toggleInterest = (value) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(value) ? f.interests.filter((v) => v !== value) : [...f.interests, value],
    }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong sending your request — please try again, or message us directly on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`${styles.bookingEngine} reveal`}>
      <div className={styles.beProgress}>
        <div style={{ flex: 1 }}>
          <div className={`${styles.beStepDot} ${step === 1 ? styles.active : ''} ${step > 1 ? styles.done : ''}`}>1</div>
          <div className={styles.beStepLabel}>Trip Details</div>
        </div>
        <div className={`${styles.beStepLine} ${step > 1 ? styles.done : ''}`} />
        <div style={{ flex: 1 }}>
          <div className={`${styles.beStepDot} ${step === 2 ? styles.active : ''} ${step > 2 ? styles.done : ''}`}>2</div>
          <div className={styles.beStepLabel}>Preferences</div>
        </div>
        <div className={`${styles.beStepLine} ${step > 2 ? styles.done : ''}`} />
        <div style={{ flex: 1 }}>
          <div className={`${styles.beStepDot} ${step === 3 ? styles.active : ''}`}>3</div>
          <div className={styles.beStepLabel}>Your Details</div>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className={`${styles.bePanel} ${step === 1 ? styles.active : ''}`}>
            <div className={styles.beField}>
              <label htmlFor="bfPackage">Which safari are you interested in?</label>
              <select id="bfPackage" value={form.packageName} onChange={update('packageName')}>
                <option value="">Not sure yet — help me choose</option>
                {PACKAGE_NAMES.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className={styles.beRow2}>
              <div className={styles.beField}>
                <label htmlFor="bfMonth">Preferred travel month</label>
                <select id="bfMonth" value={form.month} onChange={update('month')}>
                  <option value="">Select a month</option>
                  {MONTHS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className={styles.beField}>
                <label htmlFor="bfGroup">Group size</label>
                <input id="bfGroup" type="number" min="1" placeholder="Number of travelers" value={form.groupSize} onChange={update('groupSize')} />
              </div>
            </div>
            <div className={styles.beNav}>
              <button type="button" className={`${styles.beBtn} ${styles.beBtnNext}`} onClick={() => setStep(2)}>
                Next: Preferences →
              </button>
            </div>
          </div>

          <div className={`${styles.bePanel} ${step === 2 ? styles.active : ''}`}>
            <div className={styles.beField}>
              <label>Accommodation tier</label>
              <div className={styles.bePills}>
                {TIERS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`${styles.bePill} ${form.tier === t ? styles.selected : ''}`}
                    onClick={() => setForm((f) => ({ ...f, tier: t }))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.beField}>
              <label>What&apos;s this trip for? (select any)</label>
              <div className={styles.bePills}>
                {INTERESTS.map((i) => (
                  <button
                    type="button"
                    key={i}
                    className={`${styles.bePill} ${form.interests.includes(i) ? styles.selected : ''}`}
                    onClick={() => toggleInterest(i)}
                  >
                    {INTEREST_LABELS[i]}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.beNav}>
              <button type="button" className={`${styles.beBtn} ${styles.beBtnBack}`} onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="button" className={`${styles.beBtn} ${styles.beBtnNext}`} onClick={() => setStep(3)}>
                Next: Your Details →
              </button>
            </div>
          </div>

          <div className={`${styles.bePanel} ${step === 3 ? styles.active : ''}`}>
            <div className={styles.beRow2}>
              <div className={styles.beField}>
                <label htmlFor="bfName">Full Name</label>
                <input id="bfName" required placeholder="Your full name" value={form.name} onChange={update('name')} />
              </div>
              <div className={styles.beField}>
                <label htmlFor="bfEmail">Email</label>
                <input id="bfEmail" type="email" required placeholder="you@example.com" value={form.email} onChange={update('email')} />
              </div>
            </div>
            <div className={styles.beRow2}>
              <div className={styles.beField}>
                <label htmlFor="bfWhatsapp">WhatsApp Number</label>
                <input id="bfWhatsapp" placeholder="+255..." value={form.whatsapp} onChange={update('whatsapp')} />
              </div>
              <div className={styles.beField}>
                <label htmlFor="bfCountry">Country</label>
                <input id="bfCountry" placeholder="Where are you traveling from?" value={form.country} onChange={update('country')} />
              </div>
            </div>
            <div className={styles.beField}>
              <label htmlFor="bfMessage">Message</label>
              <textarea id="bfMessage" rows={3} placeholder="Anything else we should know?" value={form.message} onChange={update('message')} />
            </div>
            {error && <p style={{ color: 'var(--clay)', fontSize: '0.85rem' }}>{error}</p>}
            <div className={styles.beNav}>
              <button type="button" className={`${styles.beBtn} ${styles.beBtnBack}`} onClick={() => setStep(2)}>
                ← Back
              </button>
              <button type="submit" className={`${styles.beBtn} ${styles.beBtnNext}`} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Booking Request'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.beSuccess}>
          <h3>Thank you — request received!</h3>
          <p>We&apos;ll be in touch shortly to start planning your Tanzania adventure.</p>
        </div>
      )}
    </div>
  );
}
