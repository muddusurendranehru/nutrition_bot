/**
 * One-time fix: Neon users table created without last_login — login UPDATE fails with 42703.
 * Run: node database/add-last-login-column.js
 */
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DATABASE_URL = (process.env.DATABASE_URL || '').trim();
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL missing in .env');
  process.exit(1);
}

async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;
    `);
    console.log('✅ Column users.last_login is present (added if it was missing).');
  } catch (e) {
    console.error('❌ Migration failed:', e.message || e);
    if (e.stack) console.error(e.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
