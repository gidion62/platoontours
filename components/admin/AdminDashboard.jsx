'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.css';

const STATUSES = ['new', 'contacted', 'confirmed', 'cancelled'];

function StatusBadge({ status }) {
  return <span className={`${styles.badge} ${styles['badge_' + status]}`}>{status}</span>;
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

export default function AdminDashboard({ initialBookings, initialInquiries }) {
  const router = useRouter();
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState(initialBookings);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const items = tab === 'bookings' ? bookings : inquiries;
  const setItems = tab === 'bookings' ? setBookings : setInquiries;
  const endpoint = tab === 'bookings' ? '/api/admin/bookings' : '/api/admin/inquiries';

  const visible = useMemo(
    () => (statusFilter === 'all' ? items : items.filter((i) => i.status === statusFilter)),
    [items, statusFilter]
  );

  const counts = useMemo(() => {
    const c = { new: 0, contacted: 0, confirmed: 0, cancelled: 0 };
    items.forEach((i) => {
      c[i.status] = (c[i.status] || 0) + 1;
    });
    return c;
  }, [items]);

  async function updateStatus(id, status) {
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Revert on failure — refetch isn't wired up yet, so pull the page
      // instead to resync with what's actually in the database.
      router.refresh();
    }
  }

  async function deleteItem(id) {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return;
    const prev = items;
    setItems((p) => p.filter((i) => i._id !== id));
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } catch {
      setItems(prev);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className={styles.dashWrap}>
      <header className={styles.dashHeader}>
        <div>
          <h1>Platoon Tours Admin</h1>
          <p className={styles.dashSub}>Bookings &amp; inquiries received from the website.</p>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Sign out
        </button>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'bookings' ? styles.tabActive : ''}`}
          onClick={() => {
            setTab('bookings');
            setStatusFilter('all');
            setExpandedId(null);
          }}
        >
          Bookings ({bookings.length})
        </button>
        <button
          className={`${styles.tab} ${tab === 'inquiries' ? styles.tabActive : ''}`}
          onClick={() => {
            setTab('inquiries');
            setStatusFilter('all');
            setExpandedId(null);
          }}
        >
          Inquiries ({inquiries.length})
        </button>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterChip} ${statusFilter === 'all' ? styles.filterChipActive : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All ({items.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`${styles.filterChip} ${statusFilter === s ? styles.filterChipActive : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>Nothing here yet.</p>
      ) : (
        <div className={styles.list}>
          {visible.map((item) => (
            <div className={styles.card} key={item._id}>
              <div className={styles.cardTop} onClick={() => setExpandedId(expandedId === item._id ? null : item._id)}>
                <div className={styles.cardMain}>
                  <span className={styles.cardName}>{item.name}</span>
                  <span className={styles.cardEmail}>{item.email}</span>
                  {tab === 'bookings' && item.packageName && (
                    <span className={styles.cardPackage}>{item.packageName}</span>
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <StatusBadge status={item.status} />
                  <span className={styles.cardDate}>{formatDate(item.createdAt)}</span>
                </div>
              </div>

              {expandedId === item._id && (
                <div className={styles.cardBody}>
                  {tab === 'bookings' ? (
                    <div className={styles.detailGrid}>
                      <div>
                        <strong>Package</strong>
                        <p>{item.packageName || '—'}</p>
                      </div>
                      <div>
                        <strong>Travel month</strong>
                        <p>{item.month || '—'}</p>
                      </div>
                      <div>
                        <strong>Group size</strong>
                        <p>{item.groupSize || '—'}</p>
                      </div>
                      <div>
                        <strong>Tier</strong>
                        <p>{item.tier || '—'}</p>
                      </div>
                      <div>
                        <strong>Interests</strong>
                        <p>{(item.interests || []).join(', ') || '—'}</p>
                      </div>
                      <div>
                        <strong>WhatsApp</strong>
                        <p>{item.whatsapp || '—'}</p>
                      </div>
                      <div>
                        <strong>Country</strong>
                        <p>{item.country || '—'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.detailGrid}>
                      <div>
                        <strong>Approximate dates</strong>
                        <p>{item.dates || '—'}</p>
                      </div>
                    </div>
                  )}
                  <div>
                    <strong>Message</strong>
                    <p className={styles.messageText}>{item.message || '—'}</p>
                  </div>

                  <div className={styles.cardActions}>
                    <label>
                      Status
                      <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button className={styles.deleteBtn} onClick={() => deleteItem(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
