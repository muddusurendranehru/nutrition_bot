// Test Neon Database Connection
const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to Neon database...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('🕐 Database time:', result.rows[0].now);

    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tables in database:');
    if (tablesResult.rows.length === 0) {
      console.log('   No tables found - run schema.sql first');
    } else {
      tablesResult.rows.forEach(row => {
        console.log(`   ✓ ${row.table_name}`);
      });
    }

  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n👋 Connection closed');
  }
}

testConnection();

