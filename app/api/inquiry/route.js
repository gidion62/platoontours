import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';
import { sendAdminNotification, inquiryNotificationEmail } from '@/lib/mailer';

// Homepage "Start planning" inquiry form (name, email, travel dates, message).
// Same pattern as app/api/booking/route.js: save to MongoDB first, then
// best-effort email notification.
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
  const inquiry = await Inquiry.create(body);

  try {
    const { subject, text } = inquiryNotificationEmail(inquiry);
    await sendAdminNotification({ subject, text });
  } catch (err) {
    console.error('[inquiry] Notification email failed:', err);
  }

  return NextResponse.json({ ok: true });
}
