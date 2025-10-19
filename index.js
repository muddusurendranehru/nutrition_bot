// HOMA FOODS - Backend Server
// Phase 2: Complete Backend (Express + Auth + Database)
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3031;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection pool (auto-reconnects)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Test database connection
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to HOMA FOODS database'))
  .catch(err => console.error('❌ Database connection error:', err));

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err.message);
});

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-heart-database-2025', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// POST /api/auth/signup
app.post('/api/auth/signup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 3 }), // Simple password - 3+ chars only
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('phone').optional().isLength({ min: 5, max: 100 }), // Flexible phone - any format
  body('name').optional().isLength({ min: 1, max: 500 }) // Universal name - any format
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, phone, name } = req.body;

    // Check if user exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, phone, name) VALUES ($1, $2, $3, $4) RETURNING id, email, phone, name, created_at',
      [email, passwordHash, phone || null, name || null]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-heart-database-2025',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, phone: user.phone, name: user.name, created_at: user.created_at },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const result = await pool.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-heart-database-2025',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/logout
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  // In a real app, you might blacklist the token
  res.json({ message: 'Logout successful' });
});

// ============================================
// DATA ENDPOINTS (HOMA FOODS)
// ============================================

// GET /api/data - Search HOMA FOODS
app.get('/api/data', async (req, res) => {
  try {
    const { search, limit = 20, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        id,
        food_name,
        regional_names,
        alternate_names,
        calories,
        protein_g,
        fat_g,
        carbs_g,
        fiber_g,
        sugar_g,
        sodium_mg,
        diabetic_rating,
        health_score,
        country,
        continent,
        cuisine_type,
        category,
        data_source,
        verified,
        verification_sources,
        popularity_score
      FROM food_nutrition
    `;
    
    const params = [];
    
    if (search) {
      query += ` WHERE 
        food_name_lower LIKE $1 
        OR $2 = ANY(regional_names)
        OR $3 = ANY(alternate_names)
        OR search_vector @@ plainto_tsquery('english', $4)
        OR LOWER(food_name) LIKE LOWER($5)
        OR LOWER(food_name) LIKE LOWER($6)
      `;
      const searchTerm = `%${search.toLowerCase()}%`;
      const searchTermWithSpaces = `%${search.replace(/\s+/g, '%')}%`;
      const searchTermWithHyphens = `%${search.replace(/\s+/g, '-')}%`;
      params.push(searchTerm, search, search, search, searchTermWithSpaces, searchTermWithHyphens);
    }
    
    query += ` ORDER BY popularity_score DESC, created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    
    res.json({
      foods: result.rows,
      total: result.rows.length,
      search: search || null
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/data/stats - Dashboard statistics
app.get('/api/data/stats', async (req, res) => {
  try {
    // Total foods count
    const totalFoods = await pool.query('SELECT COUNT(*) as count FROM food_nutrition');
    
    // Diabetic rating distribution
    const ratingDist = await pool.query(`
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
        END
    `);
    
    // Continent distribution
    const continentDist = await pool.query(`
      SELECT continent, COUNT(*) as food_count
      FROM food_nutrition
      GROUP BY continent
      ORDER BY food_count DESC
    `);
    
    res.json({
      totalFoods: parseInt(totalFoods.rows[0].count),
      diabeticRating: ratingDist.rows,
      continents: continentDist.rows
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================
// PROTECTED ROUTES (Dashboard)
// ============================================

// GET /api/user/profile - Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, phone, created_at, last_login FROM users WHERE id = $1',
      [req.user.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', async (req, res) => {
  try {
    const dbCheck = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: dbCheck.rows[0].now,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ============================================
// FRONTEND ROUTE
// ============================================
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test-frontend-simple.html');
});

app.get('/debug', (req, res) => {
    res.sendFile(__dirname + '/debug-signup-frontend.html');
});

app.get('/network-test', (req, res) => {
    res.sendFile(__dirname + '/test-network.html');
});

app.get('/input-test', (req, res) => {
    res.sendFile(__dirname + '/test-input-fields.html');
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log('🚀 HOMA FOODS Backend Server Running!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth Endpoints:`);
  console.log(`   POST /api/auth/signup`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/logout`);
  console.log(`🍎 Data Endpoints:`);
  console.log(`   GET /api/data?search=chicken`);
  console.log(`   GET /api/data/stats`);
  console.log(`👤 Protected:`);
  console.log(`   GET /api/user/profile`);
});

module.exports = app;
