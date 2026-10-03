import { NextResponse } from 'next/server';

// Protects everything under /admin except the login page itself. Middleware
// always runs in Next.js's Edge runtime, which does NOT support Node's
// built-in `crypto` module (that's fine in lib/adminAuth.js and the API
// routes, which run in the normal Node runtime — just not here). So this
// file re-implements the same HMAC check using the Web Crypto API
// (`crypto.subtle`), which is available in both Edge and Node.
const COOKIE_NAME = 'platoon_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

async function hmacHex(message, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Constant-time-ish string compare (Node's crypto.timingSafeEqual isn't
// available here either) — fine for this use case since both strings are
// fixed-length hex digests, not secrets being brute-forced character by character.
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifySessionToken(token, secret) {
  if (!token || !token.includes('.') || !secret) return false;
  const [issuedAt, signature] = token.split('.');
  const expected = await hmacHex(issuedAt, secret);
  if (!safeEqual(signature, expected)) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age >= 0 && age <= SESSION_MAX_AGE_SECONDS;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const valid = await verifySessionToken(token, secret);
  if (!valid) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
