import { NextResponse } from 'next/server';
import { verifyPassword, createSessionToken, ADMIN_COOKIE } from '@/lib/adminAuth';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { password } = body || {};
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedHash) {
    return NextResponse.json(
      { error: 'Admin login is not configured yet (ADMIN_PASSWORD_HASH missing).' },
      { status: 500 }
    );
  }

  if (!password || !verifyPassword(password, storedHash)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_COOKIE.maxAge,
  });
  return res;
}
