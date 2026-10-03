import PageHeader from '@/components/shared/PageHeader';
import termsSections from '@/lib/termsSections';
import styles from './TermsPage.module.css';

export default function TermsPage() {
  return (
    <div className="page" data-page="terms">
      <PageHeader title="Terms and Conditions" />

      <section>
        <div className="section-inner" style={{ maxWidth: 760 }}>
          <p className={styles.termsUpdated}>Last updated: January 2026</p>

          <div className={styles.termsNote}>
            This page is a general template covering standard booking, cancellation, and liability terms for a Tanzania
            safari operator. It has not been reviewed by a lawyer — Platoon Tours should have it checked by qualified
            legal counsel in Tanzania before this page goes live on the real site.
          </div>

          {termsSections.map((s) => (
            <div className={styles.termsSection} key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {s.after && <p>{s.after}</p>}
            </div>
          ))}

          <div className={styles.termsSection}>
            <h3>9. Contact</h3>
            <p>
              Questions about these terms can be sent to{' '}
              <a href="mailto:info@platoon-tours.com" style={{ color: 'var(--clay)', fontWeight: 700 }}>
                info@platoon-tours.com
              </a>{' '}
              or via the contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
