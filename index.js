// HOMA FOODS - Backend Server
// Phase 2: Complete Backend (Express + Auth + Database)
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const DATABASE_URL = (process.env.DATABASE_URL || '').trim();
if (!DATABASE_URL) {
  console.error('❌ Set DATABASE_URL in .env (copy Connection string from Neon → Dashboard → your project).');
  process.exit(1);
}

const app = express();
const preferredPort = Number(process.env.PORT) || 3031;
const maxPort = preferredPort + 20;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection pool (auto-reconnects)
// Neon can cold-start after auto-suspend; 10s is often too short — allow up to 60s to connect.
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: Number(process.env.PG_CONNECTION_TIMEOUT_MS) || 60000,
});

// Test database connection
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connected to HOMA FOODS database'))
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
    if (err.code === '28P01') {
      console.error(
        '   Neon rejected the password. Open https://console.neon.tech → your project → Connection details → copy the full URI again (or reset the DB user password), then paste into .env as DATABASE_URL=...'
      );
    }
    if (/timeout|ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(String(err.message)) || err.code === 'ETIMEDOUT') {
      console.error(
        '   Tip: Neon may be waking from sleep (first query slower). Retry in 30s. Check firewall/VPN. Use pooler host (*-pooler.*.neon.tech) from Neon. Optional: PG_CONNECTION_TIMEOUT_MS=90000 in .env'
      );
    }
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err.message);
});

/** True when Neon/Postgres is unreachable or credentials are wrong (login/signup should not look like generic 500). */
function isDatabaseConnectivityError(err) {
  if (!err) return false;
  const c = err.code;
  // PostgreSQL class 08 — connection exception (08000, 08003, 08006, etc.)
  if (typeof c === 'string' && c.startsWith('08')) return true;
  if (['28P01', '57P03', '3D000', '28000', 'ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', 'ECONNRESET', 'EPIPE'].includes(c)) {
    return true;
  }
  return /password authentication|connection refused|connect timed out|connection timeout|terminated due to connection timeout|database/i.test(
    String(err.message || '')
  );
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'c8e3aa52cd9058cb183f0e4504453137672cc74bf904c863bc084f556bcdd1ddfc504a76f8f7835e3997ff8e7b4dbf83e551d1738713cc9dc8dbbdd02d08a202', (err, user) => {
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
      process.env.JWT_SECRET || 'c8e3aa52cd9058cb183f0e4504453137672cc74bf904c863bc084f556bcdd1ddfc504a76f8f7835e3997ff8e7b4dbf83e551d1738713cc9dc8dbbdd02d08a202',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, phone: user.phone, name: user.name, created_at: user.created_at },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    if (isDatabaseConnectivityError(error)) {
      return res.status(503).json({
        error:
          'Database unavailable. Fix DATABASE_URL in .env (copy the full URI from Neon → Connection details).'
      });
    }
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

    if (!user.password_hash || typeof user.password_hash !== 'string') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password (invalid hash format throws — avoid 500)
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password_hash);
    } catch {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login (column may be missing on older DBs — do not fail login)
    try {
      await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
    } catch (e) {
      if (e && e.code === '42703') {
        console.warn(
          'Login: users.last_login column missing. Run: npm run db:migrate-last-login'
        );
      } else {
        throw e;
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'c8e3aa52cd9058cb183f0e4504453137672cc74bf904c863bc084f556bcdd1ddfc504a76f8f7835e3997ff8e7b4dbf83e551d1738713cc9dc8dbbdd02d08a202',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      token
    });

  } catch (error) {
    console.error('Login error:', error.code || error.message, error.message);
    if (isDatabaseConnectivityError(error)) {
      return res.status(503).json({
        error:
          'Database unavailable. Fix DATABASE_URL in .env (copy the full URI from Neon → Connection details).'
      });
    }
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
      // Do not reference search_vector here — many Neon DBs predate that column (42703 errorMissingColumn).
      // Full-text search can be re-enabled after: npm run db:ensure-food-columns
      query += ` WHERE 
        food_name_lower LIKE $1 
        OR $2 = ANY(regional_names)
        OR $3 = ANY(alternate_names)
        OR LOWER(food_name) LIKE LOWER($4)
        OR LOWER(food_name) LIKE LOWER($5)
      `;
      const searchTerm = `%${search.toLowerCase()}%`;
      const searchTermWithSpaces = `%${search.replace(/\s+/g, '%')}%`;
      const searchTermWithHyphens = `%${search.replace(/\s+/g, '-')}%`;
      params.push(searchTerm, search, search, searchTermWithSpaces, searchTermWithHyphens);
    }
    
    query += ` ORDER BY popularity_score DESC, created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    
    // AUTO-INSERT RULE: If search term provided but no results found, try to fetch and add to database
    if (search && result.rows.length === 0) {
      console.log(`🔍 No results for "${search}" - AUTO-INSERTING to grow database...`);
      try {
        const SmartFoodFetcher = require('./database/smart-food-fetcher');
        const fetcher = new SmartFoodFetcher();
        const newFood = await fetcher.searchAndAddFood(search, 'general');
        
        if (newFood) {
          console.log(`✅ AUTO-INSERTED: ${newFood.food_name} - Database growing!`);
          // Return the newly added food
          return res.json({
            foods: [newFood],
            total: 1,
            search: search,
            auto_inserted: true,
            message: `Added "${newFood.food_name}" to database`
          });
        }
      } catch (autoInsertError) {
        console.log(`⚠️ Auto-insert failed: ${autoInsertError.message}`);
      }
    }
    
    res.json({
      foods: result.rows,
      total: result.rows.length,
      search: search || null,
      auto_inserted: false
    });

  } catch (error) {
    console.error('Search error:', error.code || error.message, error.message);
    if (error.code === '42703') {
      return res.status(503).json({
        error:
          'Database schema out of date. Run: npm run db:ensure-food-columns (from project root), then restart the server.'
      });
    }
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
    let result;
    try {
      result = await pool.query(
        'SELECT id, email, name, phone, created_at, last_login FROM users WHERE id = $1',
        [req.user.userId]
      );
    } catch (e) {
      if (e && e.code === '42703') {
        result = await pool.query(
          'SELECT id, email, name, phone, created_at FROM users WHERE id = $1',
          [req.user.userId]
        );
      } else {
        throw e;
      }
    }

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
// SMART FOOD FETCHER
// ============================================
const SmartFoodFetcher = require('./database/smart-food-fetcher');
const BoltStyleFetcher = require('./database/bolt-style-fetcher');

// Smart food search and add endpoint
app.post('/api/smart-search', async (req, res) => {
  try {
    const { foodName, cuisineType = 'mexican' } = req.body;
    
    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    console.log(`🔍 Smart search requested: ${foodName} (${cuisineType})`);
    
    const fetcher = new SmartFoodFetcher();
    const result = await fetcher.searchAndAddFood(foodName, cuisineType);
    
    if (result) {
      // Ensure all speedometer data is present
      const foodData = {
        ...result,
        calories: parseFloat(result.calories) || 0,
        protein_g: parseFloat(result.protein_g) || 0,
        fat_g: parseFloat(result.fat_g) || 0,
        carbs_g: parseFloat(result.carbs_g) || 0,
        diabetic_rating: result.diabetic_rating || 'yellow',
        health_score: parseInt(result.health_score) || 50
      };
      
      res.json({
        success: true,
        message: `Food "${foodName}" added to database`,
        food: foodData
      });
    } else {
      res.json({
        success: false,
        message: `Could not find or add "${foodName}"`
      });
    }
  } catch (error) {
    console.error('Smart search error:', error);
    res.status(500).json({ error: 'Smart search failed' });
  }
});

// Bolt-style search endpoint (like your old system)
app.post('/api/bolt-search', async (req, res) => {
  try {
    const { foodName } = req.body;
    
    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    console.log(`🚀 Bolt-style search requested: ${foodName}`);
    
    const fetcher = new BoltStyleFetcher();
    const result = await fetcher.boltStyleSearch(foodName);
    
    res.json(result);
  } catch (error) {
    console.error('Bolt-style search error:', error);
    res.status(500).json({ error: 'Bolt-style search failed' });
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

app.get('/input-test', (req, res) => {
  res.sendFile(__dirname + '/test-local-inputs.html');
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
// START SERVER (tries next port if preferred is busy)
// ============================================
function startListening(port) {
  const server = app.listen(port, () => {
    if (port !== preferredPort) {
      console.warn(`⚠️ Port ${preferredPort} was busy; using ${port} instead.`);
    }
    console.log('🚀 HOMA FOODS Backend Server Running!');
    console.log(`📍 Port: ${port}`);
    console.log(`🌐 Frontend: http://localhost:${port}`);
    console.log(`🌐 Health Check: http://localhost:${port}/api/health`);
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

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && port < maxPort) {
      startListening(port + 1);
      return;
    }
    if (err && err.code === 'EADDRINUSE') {
      console.error(`\n❌ No free port from ${preferredPort} to ${maxPort - 1}.`);
      console.error('   Close other node servers or set PORT in .env.\n');
      process.exit(1);
    }
    throw err;
  });
}

startListening(preferredPort);

module.exports = app;
