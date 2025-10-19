// Initialize Neon Database with Schema
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to Neon database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('📝 Executing schema.sql...');
    await client.query(schema);
    console.log('✅ Database schema created successfully!\n');

    // Verify tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('📊 Tables created:');
    tablesResult.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.table_name}`);
    });

    // Show sample data
    console.log('\n👥 Sample users:');
    const usersResult = await client.query('SELECT email, name, created_at FROM users LIMIT 5');
    console.table(usersResult.rows);

    console.log('🍎 Sample nutrition records:');
    const recordsResult = await client.query(`
      SELECT nr.food_name, nr.calories, nr.diabetic_rating, nr.created_at
      FROM nutrition_records nr
      LIMIT 5
    `);
    console.table(recordsResult.rows);

    console.log('\n✅ Database initialization complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initializeDatabase();

