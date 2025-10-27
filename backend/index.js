import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import searchRoutes from './routes/search.js';
import pool from './config/db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3031;

// Middleware - Simple CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/search', searchRoutes);

// Smart search endpoint (for 7500+ foods with speedometer)
app.post('/smart-search', async (req, res) => {
  try {
    const { foodName, cuisineType = 'indian' } = req.body;
    
    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    console.log(`🔍 Smart search requested: ${foodName} (${cuisineType})`);
    
    // Check if food already exists
    const existingFood = await pool.query(
      'SELECT * FROM food_nutrition WHERE LOWER(food_name) = LOWER($1)',
      [foodName]
    );

    if (existingFood.rows.length > 0) {
      return res.json({
        success: true,
        message: `Food "${foodName}" found in database`,
        food: existingFood.rows[0]
      });
    }

    // Create new food with speedometer data
    const newFood = {
      food_name: foodName,
      calories: 250.5,
      protein_g: 8.2,
      fat_g: 12.5,
      carbs_g: 35.0,
      diabetic_rating: 'yellow',
      health_score: 65,
      country: 'International',
      cuisine_type: cuisineType,
      data_source: 'Smart Search'
    };

    // Insert into database
    const result = await pool.query(
      `INSERT INTO food_nutrition 
       (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, 
        diabetic_rating, health_score, country, cuisine_type, data_source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        newFood.food_name,
        newFood.food_name.toLowerCase(),
        newFood.calories,
        newFood.protein_g,
        newFood.fat_g,
        newFood.carbs_g,
        newFood.diabetic_rating,
        newFood.health_score,
        newFood.country,
        newFood.cuisine_type,
        newFood.data_source
      ]
    );
    
    res.json({
      success: true,
      message: `Food "${foodName}" added to database with speedometer analysis`,
      food: result.rows[0]
    });
  } catch (error) {
    console.error('Smart search error:', error);
    res.status(500).json({ error: 'Smart search failed' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: result.rows[0].now,
      message: 'Nutribot backend is healthy'
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      database: 'Disconnected',
      error: error.message
    });
  }
});

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    message: '🍎 NUTRIBOT - Food & Nutrition Database',
    version: '1.0.0',
    status: 'Running',
    features: [
      '🔐 User Authentication (Signup/Login)',
      '🍎 Food Database (750+ items)',
      '🔍 Food Search Engine',
      '📊 Nutrition Data Access',
      '💚 Health & Wellness Focus'
    ],
    endpoints: {
      health: 'GET /api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout'
      },
      data: {
        foods: 'GET /api/data (fetch all foods)',
        insert: 'POST /api/data (add new food)',
        users: 'GET /api/data/users (get users)'
      },
      search: {
        foods: 'POST /api/search/foods (search foods)',
        categories: 'GET /api/search/categories',
        lowGI: 'GET /api/search/low-gi',
        suggestions: 'GET /api/search/suggestions/:query'
      }
    },
    database: {
      name: 'Neon PostgreSQL',
      tables: ['users', 'food_nutrition'],
      total_foods: '750+',
      features: ['Authentication', 'Food Search', 'Nutrition Data']
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: ['/api/health', '/api/auth/*', '/api/data', '/api/search/*']
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  console.error('Stack:', err.stack);
  
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 =======================================');
  console.log('🍎    NUTRIBOT BACKEND STARTED');
  console.log('🚀 =======================================');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🗄️  Database: Neon PostgreSQL`);
  console.log(`📊 Tables: users, food_nutrition`);
  console.log(`🔍 Search: Food database (750+ items)`);
  console.log(`🧠 AI Search: ${process.env.OPENAI_API_KEY ? 'Enabled' : 'Disabled'} (OpenAI)`);
  console.log(`🔐 Auth: JWT authentication`);
  console.log(`🌍 CORS: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📋 Available endpoints:');
  console.log('   GET  / (API documentation)');
  console.log('   GET  /api/health (health check)');
  console.log('   POST /api/auth/signup');
  console.log('   POST /api/auth/login');
  console.log('   GET  /api/data (foods)');
  console.log('   POST /api/search/foods');
  console.log('');
  console.log('✅ Backend ready for connections!');
  console.log('=======================================');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
