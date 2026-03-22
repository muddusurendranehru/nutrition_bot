const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
  console.error('❌ Set DATABASE_URL in .env (Neon Dashboard → Connection details).');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function checkNeonDatabase() {
  try {
    console.log('🔍 Checking Neon Database...');
    console.log('📊 Connection String: nutri_bot1');
    
    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 TABLES IN DATABASE:');
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    // Check users table
    const usersCount = await pool.query('SELECT COUNT(*) as count FROM users');
    console.log(`\n👥 USERS TABLE: ${usersCount.rows[0].count} users`);
    
    // Check food_nutrition table
    const foodsCount = await pool.query('SELECT COUNT(*) as count FROM food_nutrition');
    console.log(`\n🍎 FOOD_NUTRITION TABLE: ${foodsCount.rows[0].count} foods`);
    
    // Show sample foods
    const sampleFoods = await pool.query(`
      SELECT food_name, calories, protein_g, fat_g, diabetic_rating, health_score, country, cuisine_type, category
      FROM food_nutrition 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
    
    console.log('\n🍽️ SAMPLE FOODS (Latest 10):');
    sampleFoods.rows.forEach((food, index) => {
      console.log(`   ${index + 1}. ${food.food_name}`);
      console.log(`      Calories: ${food.calories}, Protein: ${food.protein_g}g, Fat: ${food.fat_g}g`);
      console.log(`      Health: ${food.health_score}/100, Rating: ${food.diabetic_rating}`);
      console.log(`      Country: ${food.country}, Cuisine: ${food.cuisine_type}, Category: ${food.category}`);
      console.log('');
    });
    
    // Check for specific food types
    const fruits = await pool.query("SELECT COUNT(*) as count FROM food_nutrition WHERE category = 'Fresh Fruit'");
    const alcohols = await pool.query("SELECT COUNT(*) as count FROM food_nutrition WHERE category = 'Alcohol'");
    const telugu = await pool.query("SELECT COUNT(*) as count FROM food_nutrition WHERE cuisine_type = 'South Indian'");
    const sweets = await pool.query("SELECT COUNT(*) as count FROM food_nutrition WHERE category = 'Dessert'");
    
    console.log('📊 FOOD CATEGORIES:');
    console.log(`   🍎 Fruits: ${fruits.rows[0].count}`);
    console.log(`   🍺 Alcohols: ${alcohols.rows[0].count}`);
    console.log(`   🍛 Telugu Foods: ${telugu.rows[0].count}`);
    console.log(`   🍰 Indian Sweets: ${sweets.rows[0].count}`);
    
    // Check for specific foods
    const specificFoods = ['Apple', 'Banana', 'Pulihora', 'Gulab Jamun', 'Beer', 'Sushi'];
    console.log('\n🔍 CHECKING SPECIFIC FOODS:');
    for (const foodName of specificFoods) {
      const result = await pool.query('SELECT food_name FROM food_nutrition WHERE food_name ILIKE $1', [`%${foodName}%`]);
      if (result.rows.length > 0) {
        console.log(`   ✅ ${foodName}: Found (${result.rows[0].food_name})`);
      } else {
        console.log(`   ❌ ${foodName}: Not found`);
      }
    }
    
    console.log('\n🎯 DATABASE STATUS:');
    console.log(`   Total Foods: ${foodsCount.rows[0].count}`);
    console.log(`   Total Users: ${usersCount.rows[0].count}`);
    console.log(`   Tables: ${tablesResult.rows.length}`);
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    await pool.end();
  }
}

checkNeonDatabase();
