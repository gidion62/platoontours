import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

// Middleware already blocks unauthenticated requests to everything under
// /admin, but that matcher doesn't cover /api/admin/* — so these routes are
// re-checked here directly against the same signed cookie.
import { verifySessionToken, ADMIN_COOKIE } from '@/lib/adminAuth';

function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE.name)?.value;
  return verifySessionToken(token);
}

export async function PATCH(request, { params }) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const updates = {};
  if (body.status) updates.status = body.status;
  if (typeof body.adminNotes === 'string') updates.adminNotes = body.adminNotes;

  await connectDB();
  const booking = await Booking.findByIdAndUpdate(params.id, updates, { new: true });
  if (!booking) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, booking });
}

export async function DELETE(request, { params }) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  await Booking.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
