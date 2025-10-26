import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI client
let openai = null;
if (process.env.OPENAI_API_KEY) {
  console.log('🔑 Initializing OpenAI with key:', process.env.OPENAI_API_KEY.substring(0, 20) + '...');
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('✅ OpenAI client initialized successfully');
} else {
  console.log('❌ No OpenAI API key found in environment');
}

// ============================================
// PUBLIC TEST SEARCH (No Auth Required)
// ============================================

// GET /api/search/test/:query - Public search test
router.get('/test/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    console.log('🔍 Testing search for:', query);
    
    const searchQuery = `
      SELECT id, food_name, food_name_lower, regional_names, alternate_names,
             calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g,
             diabetic_rating, health_score, country, cuisine_type, 
             category, data_source
      FROM food_nutrition
      WHERE LOWER(food_name) LIKE LOWER($1) 
         OR LOWER(food_name_lower) LIKE LOWER($1)
         OR LOWER(category) LIKE LOWER($1)
         OR LOWER(cuisine_type) LIKE LOWER($1)
         OR LOWER(country) LIKE LOWER($1)
      ORDER BY 
        CASE 
          WHEN LOWER(food_name) = LOWER($2) THEN 1
          WHEN LOWER(food_name) LIKE LOWER($2) THEN 2
          ELSE 3
        END,
        calories DESC 
      LIMIT 10
    `;
    
    const searchTerm = `%${query.trim()}%`;
    const exactTerm = query.trim();
    
    const result = await pool.query(searchQuery, [searchTerm, exactTerm]);
    
    return res.json({
      success: true,
      query: query,
      results: result.rows,
      total_results: result.rows.length,
      search_method: 'Database Search Test',
      message: `Found ${result.rows.length} foods matching "${query}"`
    });
    
  } catch (error) {
    console.error('Search test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Search test failed',
      message: error.message
    });
  }
});

// All OTHER search routes require authentication (except /test)
router.use((req, res, next) => {
  // Skip auth for test endpoints
  if (req.originalUrl.includes('/test')) {
    return next();
  }
  // Apply auth for all other routes
  return authenticateToken(req, res, next);
});

// ============================================
// AI SEARCH - ONLY WHEN AI BUTTON CLICKED
// ============================================

router.post('/ai-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    if (!openai) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI not configured. Please add OPENAI_API_KEY to environment.',
        fallback: 'Using database search instead'
      });
    }

    console.log('🧠 AI Search activated for:', query);
    console.log('🔍 OpenAI client status:', openai ? 'Ready' : 'Not initialized');
    
    // AI-powered search using OpenAI
    console.log('📡 Making OpenAI API call...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a nutrition expert. Provide detailed nutrition information for foods. Return JSON with food_name, calories, protein_g, fat_g, carbs_g, health_notes."
        },
        {
          role: "user", 
          content: `Provide nutrition information for: ${query}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('✅ OpenAI response received:', aiResponse.substring(0, 100) + '...');
    
    // Try to parse OpenAI JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (e) {
      // If JSON parsing fails, create structured response from text
      parsedResponse = {
        food_name: query,
        calories: 'AI Analysis',
        protein_g: 'See details',
        fat_g: 'See details', 
        carbs_g: 'See details',
        ai_response: aiResponse
      };
    }
    
    return res.json({
      success: true,
      query: query,
      results: [{
        food_name: parsedResponse.food_name || query,
        calories: parsedResponse.calories || 'AI Analysis',
        protein_g: parsedResponse.protein_g || 'N/A',
        fat_g: parsedResponse.fat_g || 'N/A',
        carbs_g: parsedResponse.carbs_g || 'N/A',
        diabetic_rating: 'ai',
        health_score: 'AI',
        country: 'AI Generated',
        cuisine_type: 'AI Analysis',
        category: 'AI Search',
        data_source: 'OpenAI GPT-3.5',
        ai_response: aiResponse,
        search_type: 'AI-Powered'
      }],
      search_method: 'OpenAI AI Search'
    });
    
  } catch (error) {
    console.error('AI Search Error:', error);
    return res.status(500).json({
      success: false,
      error: 'AI search failed',
      message: error.message
    });
  }
});

// ============================================
// SMART SEARCH - YOUR NEON DATABASE (750 FOODS)
// ============================================

// Main search endpoint - searches your 750 foods
router.post('/foods', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    console.log('🔍 Searching foods for:', query);
    
    // Search in your food_nutrition table
    const searchQuery = `
      SELECT id, food_name, food_name_lower, regional_names, alternate_names,
             calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g,
             diabetic_rating, health_score, country, cuisine_type, 
             category, data_source, created_at
      FROM food_nutrition
      WHERE LOWER(food_name) LIKE LOWER($1) 
         OR LOWER(food_name_lower) LIKE LOWER($1)
         OR LOWER(category) LIKE LOWER($1)
         OR LOWER(cuisine_type) LIKE LOWER($1)
         OR LOWER(country) LIKE LOWER($1)
         OR EXISTS (
           SELECT 1 FROM unnest(regional_names) AS rn 
           WHERE LOWER(rn) LIKE LOWER($1)
         )
         OR EXISTS (
           SELECT 1 FROM unnest(alternate_names) AS an 
           WHERE LOWER(an) LIKE LOWER($1)
         )
      ORDER BY 
        CASE 
          WHEN LOWER(food_name) = LOWER($2) THEN 1
          WHEN LOWER(food_name) LIKE LOWER($2) THEN 2
          ELSE 3
        END,
        calories DESC 
      LIMIT 20
    `;
    
    const searchTerm = `%${query.trim()}%`;
    const exactTerm = query.trim();
    
    const result = await pool.query(searchQuery, [searchTerm, exactTerm]);
    
    return res.json({
      success: true,
      query: query,
      results: result.rows,
      total_results: result.rows.length,
      search_method: 'Database Search',
      message: `Found ${result.rows.length} foods matching "${query}"`
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      error: 'Search failed',
      message: error.message
    });
  }
});

// ============================================
// QUICK SEARCH BY CATEGORY
// ============================================

router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, COUNT(*) as count 
      FROM food_nutrition 
      WHERE category IS NOT NULL 
      GROUP BY category 
      ORDER BY count DESC
    `);

    res.json({Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"Click "Add file" → "Upload files"
      success: true,
      categories: result.rows
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// SEARCH BY GLYCEMIC INDEX
// ============================================

router.get('/low-gi', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT food_name, calories, diabetic_rating, health_score
      FROM food_nutrition 
      WHERE diabetic_rating = 'green'
      ORDER BY health_score DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      results: result.rows,
      message: 'Diabetes-friendly foods (green rating)'
    });
  } catch (error) {
    console.error('Low-GI search error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// SEARCH HISTORY (Simple)
// ============================================

router.get('/history', async (req, res) => {
  try {
    // Simple implementation - could be enhanced to store actual search history
    res.json({
      success: true,
      history: [
        { query: 'chicken', timestamp: new Date().toISOString() },
        { query: 'rice', timestamp: new Date().toISOString() }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// AUTOCOMPLETE/SUGGESTIONS
// ============================================

router.get('/suggestions/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.json({ success: true, suggestions: [] });
    }

    const result = await pool.query(`
      SELECT DISTINCT food_name
      FROM food_nutrition 
      WHERE LOWER(food_name) LIKE LOWER($1)
      ORDER BY food_name
      LIMIT 10
    `, [`${query}%`]);

    res.json({
      success: true,
      suggestions: result.rows.map(row => row.food_name)
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
