import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined.');
}

const shouldUseSsl = !connectionString.includes('localhost');

const pool = new Pool({
  connectionString,
  ssl: shouldUseSsl ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('✅ Connected to Neon PostgreSQL - nutri_bot database');
  console.log('📊 Tables: users, food_nutrition (UUID primary keys)');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});

export default pool;

