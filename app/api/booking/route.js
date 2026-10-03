import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendAdminNotification, bookingNotificationEmail } from '@/lib/mailer';

// Multi-step booking form (Contact page). Validates, saves to MongoDB so the
// admin dashboard (/admin) can see and manage it, then best-effort emails a
// notification (skipped automatically until RESEND_API_KEY/EMAIL_TO are set
// — see .env.example).
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email } = body || {};
  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  await connectDB();
  const booking = await Booking.create(body);

  try {
    const { subject, text } = bookingNotificationEmail(booking);
    await sendAdminNotification({ subject, text });
  } catch (err) {
    // Never let an email hiccup fail the booking itself — it's already saved.
    console.error('[booking] Notification email failed:', err);
  }

  return NextResponse.json({ ok: true });
}
