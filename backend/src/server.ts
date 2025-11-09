import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data.js';
import searchRoutes from './routes/search.js';
import pool from './config/db.js';

dotenv.config();

const app = express();

const port = Number(process.env.PORT) || 3031;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendUrl,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/search', searchRoutes);

app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query<{ now: string }>('SELECT NOW()');
    return res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: result.rows[0].now,
      message: 'Nutribot backend is healthy'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      database: 'Disconnected',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

app.get('/', (_req, res) => {
  return res.json({
    message: '🍎 NUTRIBOT - Food & Nutrition Database',
    version: '2.0.0',
    status: 'Running',
    features: [
      '🔐 User Authentication (Signup/Login)',
      '🍎 Food Database (international coverage)',
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
        foods: 'GET /api/data',
        insert: 'POST /api/data',
        users: 'GET /api/data/users'
      },
      search: {
        foods: 'POST /api/search/foods',
        categories: 'GET /api/search/categories',
        lowGI: 'GET /api/search/low-gi',
        suggestions: 'GET /api/search/suggestions/:query'
      }
    },
    database: {
      name: 'Neon PostgreSQL (nutri_bot)',
      tables: ['users', 'food_nutrition'],
      primary_keys: 'UUID'
    }
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: ['/api/health', '/api/auth/*', '/api/data', '/api/search/*']
  });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  void _next;
  console.error('❌ Server Error:', err.message);
  console.error('Stack:', err.stack);

  return res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export const startServer = (): void => {
  app.listen(port, () => {
    console.log('');
    console.log('🚀 =======================================');
    console.log('🍎    NUTRIBOT BACKEND STARTED');
    console.log('🚀 =======================================');
    console.log(`📡 Server running on: http://localhost:${port}`);
    console.log(`🗄️  Database: Neon PostgreSQL (nutri_bot)`);
    console.log(`📊 Tables: users, food_nutrition`);
    console.log(`🌍 CORS: ${frontendUrl}`);
    console.log(`⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;

