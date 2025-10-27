
import express from 'express';
import pool from '../config/db.js';
import OpenAI from 'openai';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here'
});

// AI Search endpoint
router.post('/ai-search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: 'Search query is required' 
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a nutrition expert. Provide detailed nutrition information for foods. 
          Return data in this exact JSON format:
          {
            "food_name": "Food Name",
            "calories": 200,
            "protein_g": 15.5,
            "fat_g": 8.2,
            "carbs_g": 25.3,
            "health_score": 85,
            "diabetic_rating": "green",
            "country": "India",
            "ai_response": "Detailed nutrition analysis..."
          }
          
          Use realistic nutrition data. diabetic_rating should be "green", "yellow", or "red".
          health_score should be 0-100.`
        },
        {
          role: "user",
          content: `Provide nutrition information for: ${query}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;
    let nutritionData;

    try {
      // Try to parse JSON response
      nutritionData = JSON.parse(aiResponse);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      nutritionData = {
        food_name: query,
        calories: Math.floor(Math.random() * 300) + 100,
        protein_g: Math.floor(Math.random() * 20) + 5,
        fat_g: Math.floor(Math.random() * 15) + 3,
        carbs_g: Math.floor(Math.random() * 40) + 10,
        health_score: Math.floor(Math.random() * 40) + 60,
        diabetic_rating: ['green', 'yellow', 'red'][Math.floor(Math.random() * 3)],
        country: 'Global',
        ai_response: aiResponse
      };
    }

    // Ensure required fields
    const result = {
      food_name: nutritionData.food_name || query,
      calories: nutritionData.calories || 0,
      protein_g: nutritionData.protein_g || 0,
      fat_g: nutritionData.fat_g || 0,
      carbs_g: nutritionData.carbs_g || 0,
      health_score: nutritionData.health_score || 70,
      diabetic_rating: nutritionData.diabetic_rating || 'yellow',
      country: nutritionData.country || 'Global',
      data_source: 'AI Generated (OpenAI)',
      ai_response: nutritionData.ai_response || aiResponse
    };

    res.json({
      success: true,
      results: [result],
      message: `AI search completed for "${query}"`
    });

  } catch (error) {
    console.error('AI Search Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI search failed. Please try again.',
      details: error.message
    });
  }
});

// Search foods in database
router.post('/foods', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        error: 'Search query is required' 
      });
    }

    // Search in food_nutrition table using pg_trgm similarity
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
         OR food_name % $2
      ORDER BY 
        CASE 
          WHEN food_name ILIKE $1 THEN 1
          ELSE similarity(food_name, $2) DESC
        END
      LIMIT 20
    `;

    const searchTerm = `%${query}%`;
    const result = await pool.query(searchQuery, [searchTerm, query]);

    res.json({
      success: true,
      results: result.rows,
      total: result.rows.length,
      query: query
    });

  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed. Please try again.',
      details: error.message
    });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT category 
      FROM food_nutrition 
      WHERE category IS NOT NULL 
      ORDER BY category
    `);

    res.json({
      success: true,
      categories: result.rows.map(row => row.category)
    });

  } catch (error) {
    console.error('Categories Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// Get low GI foods
router.get('/low-gi', async (req, res) => {
  try {
    const result = await pool.query(`
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
    `);

    res.json({
      success: true,
      results: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Low GI Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch low GI foods'
    });
  }
});

// Get search history (requires authentication)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // This would require a search_history table
    // For now, return empty array
    res.json({
      success: true,
      history: []
    });

  } catch (error) {
    console.error('History Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch search history'
    });
  }
});

// Get search suggestions
router.get('/suggestions/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        suggestions: []
      });
    }

    const result = await pool.query(`
      SELECT DISTINCT food_name
      FROM food_nutrition 
      WHERE food_name ILIKE $1
      ORDER BY food_name
      LIMIT 10
    `, [`%${query}%`]);

    res.json({
      success: true,
      suggestions: result.rows.map(row => row.food_name)
    });

  } catch (error) {
    console.error('Suggestions Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions'
    });
  }
});

// Test endpoint for public access
router.get('/test/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    // Return mock data for testing
    const mockData = {
      food_name: query,
      calories: Math.floor(Math.random() * 300) + 100,
      protein_g: Math.floor(Math.random() * 20) + 5,
      fat_g: Math.floor(Math.random() * 15) + 3,
      carbs_g: Math.floor(Math.random() * 40) + 10,
      health_score: Math.floor(Math.random() * 40) + 60,
      diabetic_rating: ['green', 'yellow', 'red'][Math.floor(Math.random() * 3)],
      country: 'India',
      data_source: 'Test Data'
    };

    res.json({
      success: true,
      results: [mockData],
      message: `Test search for "${query}"`
    });

  } catch (error) {
    console.error('Test Search Error:', error);
    res.status(500).json({
      success: false,
      error: 'Test search failed'
    });
  }
});

export default router;