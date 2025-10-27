import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// ============================================
// SEARCH ROUTES - HOMA FOODS NUTRITION BOT
// Simple, Fast, Universal Search
// ============================================

// GET /api/search/foods - Search foods in database
router.post('/foods', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim() === '') {
      return res.json({
        success: false, 
        error: 'Search query is required' 
      });
    }

    // Simple search query using ILIKE
    const searchQuery = `
      SELECT 
        food_name,
        calories,
        protein_g,
        fat_g,
        carbs_g,
        health_score,
        diabetic_rating,
        country,
        data_source,
        created_at
      FROM food_nutrition 
      WHERE food_name ILIKE $1 
         OR food_name_lower ILIKE $1
         OR $2 = ANY(alternate_names)
         OR $2 = ANY(regional_names)
      ORDER BY 
        CASE 
          WHEN food_name ILIKE $1 THEN 1
          WHEN food_name_lower ILIKE $1 THEN 2
          ELSE 3
        END,
        popularity_score DESC
      LIMIT 20
    `;

    const searchTerm = `%${query}%`;
    const result = await pool.query(searchQuery, [searchTerm, query]);

    res.json({
      success: true,
      results: result.rows,
      count: result.rows.length,
      query: query
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
      message: error.message
    });
  }
});

// GET /api/search/categories - Get all food categories
router.get('/categories', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT category, COUNT(*) as count
      FROM food_nutrition 
      WHERE category IS NOT NULL
      GROUP BY category 
      ORDER BY count DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      categories: result.rows
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// GET /api/search/low-gi - Get low GI foods
router.get('/low-gi', async (req, res) => {
  try {
    const query = `
      SELECT 
        food_name,
        calories,
        protein_g,
        fat_g,
        carbs_g,
        health_score,
        diabetic_rating,
        country
      FROM food_nutrition 
      WHERE diabetic_rating = 'green'
      ORDER BY health_score DESC
      LIMIT 20
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      results: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Low GI error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch low GI foods'
    });
  }
});

// GET /api/search/history - Get search history (placeholder)
router.get('/history', async (req, res) => {
  try {
    // For now, return empty history
    // Later can implement user-specific search history
    res.json({
      success: true,
      history: []
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch search history'
    });
  }
});

// GET /api/search/suggestions/:query - Get search suggestions
router.get('/suggestions/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        suggestions: []
      });
    }

    const searchQuery = `
      SELECT DISTINCT food_name
      FROM food_nutrition 
      WHERE food_name ILIKE $1
         OR food_name_lower ILIKE $1
      ORDER BY 
        CASE 
          WHEN food_name ILIKE $1 THEN 1
          ELSE 2
        END,
        popularity_score DESC
      LIMIT 10
    `;

    const searchTerm = `%${query}%`;
    const result = await pool.query(searchQuery, [searchTerm]);

    const suggestions = result.rows.map(row => row.food_name);
    
    res.json({
      success: true,
      suggestions: suggestions
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions'
    });
  }
});

// POST /api/search/ai-search - AI Search using OpenAI
router.post('/ai-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim() === '') {
      return res.json({
        success: false, 
        error: 'Search query is required' 
      });
    }

    // For now, return a simple response
    // Later can integrate with OpenAI API
    res.json({
      success: true,
      results: [{
        food_name: `AI Search: ${query}`,
        calories: 0,
        protein_g: 0,
        fat_g: 0,
        carbs_g: 0,
        health_score: 0,
        diabetic_rating: 'unknown',
        country: 'AI Generated',
        data_source: 'OpenAI',
        is_ai_result: true
      }],
      count: 1,
      query: query
    });

  } catch (error) {
    console.error('AI Search error:', error);
    res.status(500).json({
      success: false,
      error: 'AI Search failed',
      message: error.message
    });
  }
});

export default router;