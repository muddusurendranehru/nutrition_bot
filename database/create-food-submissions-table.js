/**
 * Community food submissions (pending review — not live in food_nutrition until approved).
 * Run: npm run db:create-food-submissions
 */
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DATABASE_URL = (process.env.DATABASE_URL || '').trim();
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL missing in .env');
  process.exit(1);
}

const sql = `
CREATE TABLE IF NOT EXISTS food_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_name VARCHAR(1000) NOT NULL,
  calories_approx DECIMAL(10, 2),
  protein_g DECIMAL(10, 2),
  carbs_g DECIMAL(10, 2),
  fat_g DECIMAL(10, 2),
  fiber_g DECIMAL(10, 2),
  serving_size VARCHAR(200),
  region VARCHAR(200),
  submitted_by VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  CONSTRAINT food_submissions_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);
CREATE INDEX IF NOT EXISTS idx_food_submissions_status ON food_submissions(status);
CREATE INDEX IF NOT EXISTS idx_food_submissions_created ON food_submissions(created_at DESC);
`;

async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query(sql);
    console.log('✅ Table food_submissions ready.');
  } catch (e) {
    console.error('❌', e.message || e);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
