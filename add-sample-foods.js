// Add sample foods to database
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sampleFoods = [
  { name: 'chicken', calories: 165, protein: 31, fat: 3.6, carbs: 0, health_score: 85, diabetic_rating: 'green', country: 'India' },
  { name: 'chicken curry', calories: 200, protein: 25, fat: 8, carbs: 5, health_score: 80, diabetic_rating: 'green', country: 'India' },
  { name: 'chicken 65', calories: 180, protein: 20, fat: 6, carbs: 8, health_score: 75, diabetic_rating: 'yellow', country: 'India' },
  { name: 'chicken biryani', calories: 350, protein: 20, fat: 12, carbs: 45, health_score: 70, diabetic_rating: 'yellow', country: 'India' },
  { name: 'rice', calories: 130, protein: 2.7, fat: 0.3, carbs: 28, health_score: 80, diabetic_rating: 'green', country: 'India' },
  { name: 'curd rice', calories: 150, protein: 5, fat: 3, carbs: 25, health_score: 85, diabetic_rating: 'green', country: 'India' },
  { name: 'biryani', calories: 400, protein: 15, fat: 15, carbs: 50, health_score: 65, diabetic_rating: 'yellow', country: 'India' },
  { name: 'apple', calories: 52, protein: 0.3, fat: 0.2, carbs: 14, health_score: 90, diabetic_rating: 'green', country: 'Global' }
];

async function addSampleFoods() {
  try {
    console.log('Adding sample foods to database...');
    
    for (const food of sampleFoods) {
      await pool.query(`
        INSERT INTO food_nutrition (food_name, calories, protein_g, fat_g, carbs_g, health_score, diabetic_rating, country, data_source)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (food_name) DO NOTHING
      `, [food.name, food.calories, food.protein, food.fat, food.carbs, food.health_score, food.diabetic_rating, food.country, 'Sample Data']);
      
      console.log(`Added: ${food.name}`);
    }
    
    console.log('✅ Sample foods added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding sample foods:', error);
    process.exit(1);
  }
}

addSampleFoods();

