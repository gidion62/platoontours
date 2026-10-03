import mongoose from 'mongoose';

// Cached Mongoose connection singleton — required in dev because Next.js hot-reloads
// this module on every change, which would otherwise open a new connection per reload
// and exhaust MongoDB's connection limit. In production (serverless-friendly) it means
// a connection opened once is reused across requests handled by the same instance.
const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

export default async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not set. Add it to .env.local (see .env.example) — get a free connection ' +
        'string from a MongoDB Atlas cluster.'
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
