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

// Middleware - Allow all origins for now
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/search', searchRoutes);

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
