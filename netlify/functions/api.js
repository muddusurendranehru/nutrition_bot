// Netlify serverless function wrapper for Express backend
// Simple INTEGER IDs, customers & fruits tables

import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Pool } = pkg;
dotenv.config();

const app = express();

// Database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.customer = customer;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      database: 'Disconnected',
      error: error.message
    });
  }
});

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const customerExists = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);

    if (customerExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO customers (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, password_hash]
    );

    const newCustomer = result.rows[0];

    const token = jwt.sign(
      { customerId: newCustomer.id, email: newCustomer.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Customer registered successfully',
      customer: { id: newCustomer.id, email: newCustomer.email, created_at: newCustomer.created_at },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query(
      'SELECT id, email, password, created_at FROM customers WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const customer = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { customerId: customer.id, email: customer.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      customer: { id: customer.id, email: customer.email, created_at: customer.created_at },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Insert fruit
app.post('/api/data', authenticateToken, async (req, res) => {
  try {
    const { fruit_name, calories, carbs, proteins, glycemic_index } = req.body;
    const customerId = req.customer.customerId;

    if (!fruit_name) {
      return res.status(400).json({ error: 'Fruit name is required' });
    }

    const result = await pool.query(
      `INSERT INTO fruits (customer_id, fruit_name, calories, carbs, proteins, glycemic_index)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, customer_id, fruit_name, calories, carbs, proteins, glycemic_index, created_at`,
      [customerId, fruit_name, calories || null, carbs || null, proteins || null, glycemic_index || null]
    );

    res.status(201).json({
      message: 'Fruit entry added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch fruits
app.get('/api/data', authenticateToken, async (req, res) => {
  try {
    const customerId = req.customer.customerId;

    const result = await pool.query(
      `SELECT id, customer_id, fruit_name, calories, carbs, proteins, glycemic_index, created_at
       FROM fruits
       WHERE customer_id = $1
       ORDER BY created_at DESC`,
      [customerId]
    );

    res.json({
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch customers
app.get('/api/data/customers', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, created_at FROM customers ORDER BY created_at DESC`
    );

    res.json({
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Fetch customers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Nutribot API - Fruit Tracking with Glycemic Index',
    version: '1.0.0',
    database: 'INTEGER IDs (Simple)'
  });
});

// Export as serverless function
export const handler = serverless(app);
