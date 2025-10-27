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

// GET /api/search/suggestions/:query - Get search suggestions as user types
router.get('/suggestions/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.json({
        success: true,
        suggestions: []
      });
    }

    console.log(`💡 Getting suggestions for: "${query}"`);

    // Simple search for foods that contain the query
    const searchQuery = `
      SELECT DISTINCT food_name, calories, diabetic_rating, health_score, country
      FROM food_nutrition 
      WHERE food_name_lower ILIKE $1
      ORDER BY 
        CASE 
          WHEN food_name_lower ILIKE $2 THEN 1
          ELSE 2
        END,
        LENGTH(food_name) ASC,
        health_score DESC
      LIMIT 10
    `;

    const searchTerm = `%${query}%`;
    const startsWithTerm = `${query}%`;
    const result = await pool.query(searchQuery, [searchTerm, startsWithTerm]);

    const suggestions = result.rows.map(row => ({
      food_name: row.food_name,
      calories: row.calories,
      diabetic_rating: row.diabetic_rating,
      health_score: row.health_score,
      country: row.country
    }));
    
    res.json({
      success: true,
      suggestions: suggestions,
      query: query,
      count: suggestions.length
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch suggestions',
      message: error.message
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

    console.log(`🤖 AI Search requested: ${query}`);

    // OpenAI API integration
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.json({
        success: false,
        error: 'OpenAI API key not configured'
      });
    }

    // Call OpenAI API for nutrition analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are a nutrition expert. Analyze the food "${query}" and provide detailed nutrition information. 
          Return ONLY a JSON object with these exact fields:
          {
            "food_name": "actual food name",
            "calories": number,
            "protein_g": number,
            "fat_g": number,
            "carbs_g": number,
            "health_score": number (0-100),
            "diabetic_rating": "green" or "yellow" or "red",
            "country": "country of origin",
            "cuisine_type": "type of cuisine",
            "data_source": "OpenAI Analysis"
          }`
        }, {
          role: 'user',
          content: `Analyze nutrition for: ${query}`
        }]
      })
    });

    const openaiData = await openaiResponse.json();
    
    if (!openaiData.choices || !openaiData.choices[0]) {
      throw new Error('OpenAI API response invalid');
    }

    // Parse AI response
    let aiResult;
    try {
      const aiContent = openaiData.choices[0].message.content;
      aiResult = JSON.parse(aiContent);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      aiResult = {
        food_name: query,
        calories: 200,
        protein_g: 15,
        fat_g: 10,
        carbs_g: 20,
        health_score: 70,
        diabetic_rating: 'yellow',
        country: 'International',
        cuisine_type: 'Various',
        data_source: 'OpenAI Analysis'
      };
    }

    // Check if this food already exists in database
    const existingFood = await pool.query(
      'SELECT * FROM food_nutrition WHERE LOWER(food_name) = LOWER($1)',
      [aiResult.food_name || query]
    );

    let finalResult;
    let isAlreadySaved = false;

    if (existingFood.rows.length > 0) {
      // Food already exists - return existing data
      finalResult = existingFood.rows[0];
      isAlreadySaved = true;
    } else {
      // New food - create AI result
      finalResult = {
        food_name: aiResult.food_name || query,
        calories: parseFloat(aiResult.calories) || 200,
        protein_g: parseFloat(aiResult.protein_g) || 15,
        fat_g: parseFloat(aiResult.fat_g) || 10,
        carbs_g: parseFloat(aiResult.carbs_g) || 20,
        health_score: parseInt(aiResult.health_score) || 70,
        diabetic_rating: aiResult.diabetic_rating || 'yellow',
        country: aiResult.country || 'International',
        cuisine_type: aiResult.cuisine_type || 'Various',
        data_source: 'OpenAI Analysis',
        is_ai_result: true,
        isAlreadySaved: false,
        created_at: new Date().toISOString()
      };
    }

    res.json({
      success: true,
      results: [finalResult],
      count: 1,
      query: query,
      ai_analysis: true,
      isAlreadySaved: isAlreadySaved
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

// POST /api/search/save-ai-result - Save AI search result to database
router.post('/save-ai-result', async (req, res) => {
  try {
    const { foodData } = req.body;
    
    if (!foodData || !foodData.food_name) {
      return res.json({
        success: false, 
        error: 'Food data is required' 
      });
    }

    console.log(`💾 Saving AI result to database: ${foodData.food_name}`);

    // Insert into food_nutrition table
    const result = await pool.query(
      `INSERT INTO food_nutrition 
       (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, 
        diabetic_rating, health_score, country, cuisine_type, data_source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, food_name, calories, protein_g, fat_g, carbs_g, 
                 diabetic_rating, health_score, country, data_source, created_at`,
      [
        foodData.food_name,
        foodData.food_name.toLowerCase(),
        foodData.calories || 0,
        foodData.protein_g || 0,
        foodData.fat_g || 0,
        foodData.carbs_g || 0,
        foodData.diabetic_rating || 'yellow',
        foodData.health_score || 50,
        foodData.country || 'International',
        foodData.cuisine_type || 'Various',
        'AI Saved: ' + (foodData.data_source || 'OpenAI Analysis')
      ]
    );

    res.json({
      success: true,
      message: `"${foodData.food_name}" saved to database successfully!`,
      food: result.rows[0],
      database_growth: true
    });

  } catch (error) {
    console.error('Save AI result error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save AI result to database',
      message: error.message
    });
  }
});

export default router;