/**
 * Aligns live Neon `food_nutrition` with schema.sql (older DBs often miss columns → 42703 / errorMissingColumn).
 * Run: npm run db:ensure-food-columns
 */
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const DATABASE_URL = (process.env.DATABASE_URL || '').trim();
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL missing in .env');
  process.exit(1);
}

const statements = [
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS food_name_lower VARCHAR(1000)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS regional_names TEXT[]`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS alternate_names TEXT[]`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS country VARCHAR(200)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS cuisine_type VARCHAR(200)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS category VARCHAR(200)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS diabetic_rating VARCHAR(20)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS health_score INTEGER`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS protein_g DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS fat_g DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS carbs_g DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS fiber_g DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS sugar_g DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS sodium_mg DECIMAL(10, 2) DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS continent VARCHAR(100)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS data_source VARCHAR(100)`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS verification_sources TEXT[]`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS search_vector tsvector`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS popularity_score INTEGER DEFAULT 0`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()`,
  `ALTER TABLE food_nutrition ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()`,
  `UPDATE food_nutrition SET food_name_lower = LOWER(food_name) WHERE food_name_lower IS NULL AND food_name IS NOT NULL`,
];

async function run() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    console.log('🔧 Ensuring food_nutrition columns exist...');
    for (const sql of statements) {
      await client.query(sql);
    }
    console.log('✅ food_nutrition columns aligned (safe to re-run).');
  } catch (e) {
    console.error('❌', e.message || e);
    if (e.stack) console.error(e.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
