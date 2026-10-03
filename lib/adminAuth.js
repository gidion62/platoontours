import crypto from 'crypto';

// Lightweight single-admin auth built entirely on Node's built-in `crypto` —
// deliberately no bcrypt (native binary, can be a pain across hosts) and no
// jsonwebtoken (extra dependency for something this small). Good enough for
// a solo-admin dashboard; if the team ever grows past one admin login, swap
// this for real user accounts + a proper auth library at that point.

const COOKIE_NAME = 'platoon_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set. Add it to .env.local (see .env.example).');
  }
  return secret;
}

// ---- password hashing (for generating/checking ADMIN_PASSWORD_HASH) ----

// Format stored in .env: "salt:hash" (both hex), scrypt-derived.
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

// ---- signed session token (stateless — no session table needed) ----

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes('.')) return false;
  const [issuedAt, signature] = token.split('.');
  const expected = sign(issuedAt);
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expected, 'hex');
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age >= 0 && age <= SESSION_MAX_AGE_SECONDS;
}

export const ADMIN_COOKIE = {
  name: COOKIE_NAME,
  maxAge: SESSION_MAX_AGE_SECONDS,
};
