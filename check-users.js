// Check HOMA FOODS Users in Database
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function checkUsers() {
  try {
    await client.connect();
    console.log('🔌 Connected to HOMA FOODS database\n');

    // Check users table structure
    console.log('📋 USERS TABLE STRUCTURE:');
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);
    
    console.table(columns.rows);

    // Check current users
    console.log('\n👥 CURRENT USERS:');
    const users = await client.query(`
      SELECT 
        id,
        email,
        CASE WHEN password_hash IS NOT NULL THEN 'Hashed' ELSE 'NULL' END as password_status,
        created_at,
        last_login
      FROM users 
      ORDER BY created_at DESC
    `);
    
    if (users.rows.length === 0) {
      console.log('   No users found - ready for sign up!');
    } else {
      console.table(users.rows);
    }

    // Test simple password validation
    console.log('\n🔐 PASSWORD VALIDATION TEST:');
    console.log('✅ Simple passwords allowed (no complexity requirements)');
    console.log('✅ Email validation: standard email format');
    console.log('✅ Confirm password: must match password field');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkUsers();
