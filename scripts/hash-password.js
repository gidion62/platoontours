// Run locally to generate the value for ADMIN_PASSWORD_HASH:
//   node scripts/hash-password.js "your-chosen-password"
// Copy the printed string into .env.local (and your hosting provider's env
// vars) as ADMIN_PASSWORD_HASH. The plain password is never stored anywhere.
const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.js "your-chosen-password"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${hash}`);
