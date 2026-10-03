import { Resend } from 'resend';

// Email notifications, abstracted behind one function so switching from
// "no email service yet" to "live on the platoontours.com domain" is purely
// an env var change — no code changes anywhere that calls sendAdminNotification.
//
// Until RESEND_API_KEY is set, this just logs and returns — so booking/inquiry
// submissions keep working (and keep saving to MongoDB) even before an email
// account/domain is purchased and verified.
//
// Setup later, when platoontours.com email is ready:
//   1. Buy/verify the platoontours.com domain in Resend (or swap providers —
//      this file is the only place that would need to change).
//   2. Set RESEND_API_KEY, EMAIL_FROM (e.g. "Platoon Tours <bookings@platoontours.com>"),
//      and EMAIL_TO (e.g. "info@platoontours.com") in .env.local / hosting env vars.
export async function sendAdminNotification({ subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || 'Platoon Tours <onboarding@resend.dev>';
  const to = process.env.EMAIL_TO;

  if (!apiKey || !to) {
    console.log('[mailer] RESEND_API_KEY/EMAIL_TO not set — skipping email, logging instead:', {
      subject,
      text,
    });
    return { skipped: true };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({ from, to, subject, text, html });
    return { skipped: false, result };
  } catch (err) {
    // Never let an email failure block a booking/inquiry from being saved —
    // the API routes call this after the DB write and swallow errors from here.
    console.error('[mailer] Failed to send notification email:', err);
    return { skipped: false, error: true };
  }
}

export function bookingNotificationEmail(booking) {
  const lines = [
    `New booking request — ${booking.name}`,
    '',
    `Package: ${booking.packageName || 'Not sure yet'}`,
    `Travel month: ${booking.month || '—'}`,
    `Group size: ${booking.groupSize || '—'}`,
    `Tier: ${booking.tier || '—'}`,
    `Interests: ${(booking.interests || []).join(', ') || '—'}`,
    '',
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `WhatsApp: ${booking.whatsapp || '—'}`,
    `Country: ${booking.country || '—'}`,
    '',
    `Message: ${booking.message || '—'}`,
  ];
  return {
    subject: `New booking request — ${booking.name}`,
    text: lines.join('\n'),
  };
}

export function inquiryNotificationEmail(inquiry) {
  const lines = [
    `New inquiry — ${inquiry.name}`,
    '',
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Approximate travel dates: ${inquiry.dates || '—'}`,
    '',
    `Message: ${inquiry.message || '—'}`,
  ];
  return {
    subject: `New inquiry — ${inquiry.name}`,
    text: lines.join('\n'),
  };
}
