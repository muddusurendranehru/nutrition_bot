// Initialize HOMA FOODS Database
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Neon Database Connection (from user)
const DATABASE_URL = 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require';

async function initializeHomaFoods() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Connecting to HOMA FOODS Neon database...');
    await client.connect();
    console.log('✅ Connected successfully!\n');

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('📝 Creating HOMA FOODS database schema...');
    await client.query(schema);
    console.log('✅ Database schema created successfully!\n');

    // ========================================
    // VERIFY TABLES
    // ========================================
    console.log('=' .repeat(60));
    console.log('📊 HOMA FOODS DATABASE - TABLE VERIFICATION');
    console.log('=' .repeat(60));

    const tablesResult = await client.query(`
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns 
         WHERE table_name = t.table_name AND table_schema = 'public') as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log(`\n✅ Total Tables: ${tablesResult.rows.length}`);
    console.log('\nTables:');
    tablesResult.rows.forEach((row, index) => {
      console.log(`   ${index + 1}. ${row.table_name} (${row.column_count} columns)`);
    });

    // ========================================
    // TABLE 1: USERS
    // ========================================
    console.log('\n' + '=' .repeat(60));
    console.log('📋 TABLE 1: USERS (Authentication)');
    console.log('=' .repeat(60));

    const usersColumns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);

    console.log('\nColumns:');
    usersColumns.rows.forEach((col, i) => {
      console.log(`   ${i + 1}. ${col.column_name} (${col.data_type}) - ${col.is_nullable === 'NO' ? 'Required' : 'Optional'}`);
    });

    const usersCount = await client.query('SELECT COUNT(*) as count FROM users');
    console.log(`\nTotal Users: ${usersCount.rows[0].count}`);

    if (parseInt(usersCount.rows[0].count) > 0) {
      const usersSample = await client.query(`
        SELECT id, email, created_at 
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 3
      `);
      console.log('\nSample Data:');
      console.table(usersSample.rows);
    } else {
      console.log('   (No users yet - will be created via Sign Up page)');
    }

    // ========================================
    // TABLE 2: FOOD_NUTRITION (HOMA FOODS)
    // ========================================
    console.log('\n' + '=' .repeat(60));
    console.log('🍎 TABLE 2: FOOD_NUTRITION (HOMA FOODS - 3 Lakh Database)');
    console.log('=' .repeat(60));

    const foodColumns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'food_nutrition'
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `);

    console.log('\nColumns:');
    foodColumns.rows.forEach((col, i) => {
      console.log(`   ${i + 1}. ${col.column_name} (${col.data_type}) - ${col.is_nullable === 'NO' ? 'Required' : 'Optional'}`);
    });

    const foodCount = await client.query('SELECT COUNT(*) as count FROM food_nutrition');
    console.log(`\n✅ Total Foods in Database: ${foodCount.rows[0].count}`);

    // Sample foods
    const foodsSample = await client.query(`
      SELECT 
        food_name,
        calories,
        protein_g,
        fat_g,
        carbs_g,
        diabetic_rating,
        health_score,
        country,
        cuisine_type
      FROM food_nutrition
      ORDER BY popularity_score DESC
      LIMIT 10
    `);

    console.log('\n📊 Sample HOMA FOODS (Top 10 by Popularity):');
    console.table(foodsSample.rows);

    // Test search functionality
    console.log('\n' + '=' .repeat(60));
    console.log('🔍 SEARCH TEST: "chicken biryani"');
    console.log('=' .repeat(60));

    const searchResult = await client.query(`
      SELECT 
        food_name,
        regional_names,
        calories,
        protein_g,
        fat_g,
        diabetic_rating,
        health_score
      FROM food_nutrition
      WHERE food_name_lower LIKE '%chicken%biryani%'
      LIMIT 3
    `);

    if (searchResult.rows.length > 0) {
      console.table(searchResult.rows);
    } else {
      console.log('   No results found');
    }

    // Count by diabetic rating (for speedometer)
    console.log('\n' + '=' .repeat(60));
    console.log('🚦 DIABETIC RATING DISTRIBUTION (Speedometer Data)');
    console.log('=' .repeat(60));

    const ratingDist = await client.query(`
      SELECT 
        diabetic_rating,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM food_nutrition), 1) as percentage
      FROM food_nutrition
      GROUP BY diabetic_rating
      ORDER BY 
        CASE diabetic_rating 
          WHEN 'green' THEN 1 
          WHEN 'yellow' THEN 2 
          WHEN 'red' THEN 3 
        END;
    `);

    console.table(ratingDist.rows);

    // Count by continent
    console.log('\n' + '=' .repeat(60));
    console.log('🌍 FOODS BY CONTINENT (7 Continents Coverage)');
    console.log('=' .repeat(60));

    const continentDist = await client.query(`
      SELECT continent, COUNT(*) as food_count
      FROM food_nutrition
      GROUP BY continent
      ORDER BY food_count DESC;
    `);

    console.table(continentDist.rows);

    console.log('\n' + '=' .repeat(60));
    console.log('✅ HOMA FOODS DATABASE INITIALIZATION COMPLETE!');
    console.log('=' .repeat(60));
    console.log('\n📌 Next Steps:');
    console.log('   1. ✅ Database created with 2 tables (UUID primary keys)');
    console.log('   2. 🔄 Build backend with authentication');
    console.log('   3. 🔄 Test backend 100%');
    console.log('   4. 🔄 Build frontend (Sign Up → Login → Dashboard)');
    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initializeHomaFoods();

