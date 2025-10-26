import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// PUBLIC TEST ENDPOINT (No Auth Required) 
// ============================================

// GET /api/data/test - Public endpoint to test database
router.get('/test', async (req, res) => {
  try {
    console.log('🔍 Testing database connection with ACTUAL schema...');
    
    // Query using your ACTUAL column structure
    const result = await pool.query(`
      SELECT 
        id, 
        food_name, 
        food_name_lower,
        regional_names,
        alternate_names,
        calories, 
        protein_g, 
        fat_g, 
        carbs_g,
        diabetic_rating,
        health_score,
        country,
        cuisine_type,
        category,
        data_source
      FROM food_nutrition 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    res.json({
      success: true,
      message: 'Database connection working! Your 750+ foods are accessible.',
      count: result.rows.length,
      sample_foods: result.rows,
      schema_info: {
        table: 'food_nutrition',
        primary_key: 'id (uuid)',
        total_sample: result.rows.length,
        connection_status: 'OK',
        regional_support: true,
        diabetic_ratings: true
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Database connection failed', 
      details: error.message,
      table: 'food_nutrition'
    });
  }
});

// ============================================
// AUTHENTICATED ROUTES (All routes below require auth)
// ============================================

// Apply authentication to all routes EXCEPT /test
router.use((req, res, next) => {
  // Skip auth for test endpoint
  if (req.originalUrl.includes('/test')) {
    return next();
  }
  // Apply auth for all other routes
  return authenticateToken(req, res, next);
});

// POST /api/data - Insert food into food_nutrition (ALIGNED WITH ACTUAL SCHEMA)
router.post('/', async (req, res) => {
  try {
    const { food_name, calories, protein_g, fat_g, carbs_g, ai_response, data_source } = req.body;

    // Validation (follow database schema)
    if (!food_name || !calories) {
      return res.status(400).json({ error: 'Food name and calories are required' });
    }

    // Check if food already exists to avoid duplicates
    const existingFood = await pool.query(
      'SELECT id FROM food_nutrition WHERE LOWER(food_name) = LOWER($1)',
      [food_name]
    );

    if (existingFood.rows.length > 0) {
      return res.status(400).json({ 
        error: 'Food already exists in database',
        message: 'This food is already saved. Use Smart Search to find it.'
      });
    }

    // Insert into food_nutrition table (MATCHES ACTUAL SCHEMA)
    const result = await pool.query(
      `INSERT INTO food_nutrition 
       (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, 
        data_source, category, country, cuisine_type, diabetic_rating, health_score)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id, food_name, calories, protein_g, fat_g, carbs_g, data_source, created_at`,
      [
        food_name,
        food_name.toLowerCase(),
        parseFloat(calories) || 0,
        parseFloat(protein_g) || null,
        parseFloat(fat_g) || null, 
        parseFloat(carbs_g) || null,
        data_source || 'AI Generated',
        'AI Search',
        'AI Generated',
        'AI Analysis',
        'ai',
        75 // Default health score for AI foods
      ]
    );

    console.log('✅ AI food saved to database:', food_name);

    res.status(201).json({
      success: true,
      message: 'AI food added to your database! Next time use Smart Search.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save food to database',
      details: error.message 
    });
  }
});

// GET /api/data - Fetch from food_nutrition with search (ALIGNED WITH ACTUAL SCHEMA)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT id, food_name, food_name_lower, regional_names, alternate_names,
             calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g,
             diabetic_rating, health_score, country, cuisine_type,
             category, data_source, created_at
      FROM food_nutrition
    `;
    let params = [];

        // Smart search across 750+ foods database using ACTUAL columns
        if (search && search.trim()) {
          query += ` WHERE LOWER(food_name) LIKE LOWER($1) 
                     OR LOWER(food_name_lower) LIKE LOWER($1)
                     OR LOWER(category) LIKE LOWER($1)
                     OR LOWER(cuisine_type) LIKE LOWER($1)
                     OR LOWER(country) LIKE LOWER($1)
                     OR LOWER(data_source) LIKE LOWER($1)
                     OR EXISTS (
                       SELECT 1 FROM unnest(regional_names) AS rn 
                       WHERE LOWER(rn) LIKE LOWER($1)
                     )
                     OR EXISTS (
                       SELECT 1 FROM unnest(alternate_names) AS an 
                       WHERE LOWER(an) LIKE LOWER($1)
                     )`;
          params.push(`%${search.trim()}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT 50`;

    const result = await pool.query(query, params);

    res.json({
      count: result.rows.length,
      data: result.rows,
      results: result.rows, // For compatibility with search
      message: search ? `Found ${result.rows.length} foods matching "${search}"` : `Showing ${result.rows.length} foods from database`,
      database_info: {
        total_shown: result.rows.length,
        search_term: search || 'none',
        table: 'food_nutrition',
        schema: 'correct'
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET /api/data/users - Fetch all users (ALIGNED WITH ACTUAL TABLE)
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, name, created_at FROM users ORDER BY created_at DESC`
    );

    res.json({
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

