import type { Response } from 'express';
import { Router } from 'express';
import pool from '../config/db.js';
import { authenticateToken, type AuthenticatedRequest } from '../middleware/auth.js';

type FoodRow = {
  id: string;
  food_name: string;
  food_name_lower: string;
  regional_names: string[] | null;
  alternate_names: string[] | null;
  calories: number | null;
  protein_g: number | null;
  fat_g: number | null;
  carbs_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  diabetic_rating: string | null;
  health_score: number | null;
  country: string | null;
  cuisine_type: string | null;
  category: string | null;
  data_source: string | null;
  created_at: string;
};

const router = Router();

router.get('/test', async (_req, res: Response) => {
  try {
    const result = await pool.query<FoodRow>(
      `SELECT 
        id,
        food_name,
        food_name_lower,
        regional_names,
        alternate_names,
        calories,
        protein_g,
        fat_g,
        carbs_g,
        fiber_g,
        sugar_g,
        diabetic_rating,
        health_score,
        country,
        cuisine_type,
        category,
        data_source,
        created_at
      FROM food_nutrition
      ORDER BY created_at DESC
      LIMIT 10`
    );

    return res.json({
      success: true,
      message: 'Database connection working! Your foods are accessible.',
      count: result.rows.length,
      sample_foods: result.rows,
      schema_info: {
        table: 'food_nutrition',
        primary_key: 'id (uuid)',
        connection_status: 'OK'
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : String(error),
      table: 'food_nutrition'
    });
  }
});

router.use(authenticateToken);

router.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { food_name, calories, protein_g, fat_g, carbs_g, data_source } = req.body as Record<
      string,
      string | number | undefined
    >;

    if (!food_name) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    const caloriesValue =
      typeof calories === 'number' ? calories : parseFloat(calories as string) || 0;
    const proteinValue =
      protein_g === undefined ? null : parseFloat(String(protein_g)) || null;
    const fatValue = fat_g === undefined ? null : parseFloat(String(fat_g)) || null;
    const carbsValue = carbs_g === undefined ? null : parseFloat(String(carbs_g)) || null;

    const existingFood = await pool.query<{ id: string }>(
      'SELECT id FROM food_nutrition WHERE food_name_lower = LOWER($1)',
      [food_name]
    );

    if (existingFood.rows.length > 0) {
      return res.status(400).json({
        error: 'Food already exists in database',
        message: 'This food is already saved. Use Smart Search to find it.'
      });
    }

    const result = await pool.query<FoodRow>(
      `INSERT INTO food_nutrition 
        (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g,
         data_source, category, country, cuisine_type, diabetic_rating, health_score)
       VALUES ($1, LOWER($1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, food_name, food_name_lower, calories, protein_g, fat_g, carbs_g,
                 data_source, category, country, cuisine_type, diabetic_rating,
                 health_score, regional_names, alternate_names, fiber_g, sugar_g, created_at`,
      [
        food_name,
        caloriesValue,
        proteinValue,
        fatValue,
        carbsValue,
        data_source ?? 'AI Generated',
        'AI Search',
        'AI Generated',
        'AI Analysis',
        'ai',
        75
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'AI food added to your database! Next time use Smart Search.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Insert error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save food to database',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

router.get('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search } = req.query as { search?: string };

    let query = `
      SELECT id, food_name, food_name_lower, regional_names, alternate_names,
             calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g,
             diabetic_rating, health_score, country, cuisine_type,
             category, data_source, created_at
      FROM food_nutrition
    `;

    const params: string[] = [];

    if (search && search.trim()) {
      query += ` WHERE LOWER(food_name) LIKE LOWER($1)
                 OR LOWER(food_name_lower) LIKE LOWER($1)
                 OR LOWER(category) LIKE LOWER($1)
                 OR LOWER(cuisine_type) LIKE LOWER($1)
                 OR LOWER(country) LIKE LOWER($1)
                 OR LOWER(data_source) LIKE LOWER($1)
                 OR EXISTS (
                   SELECT 1 FROM unnest(regional_names) AS rn 
                   WHERE LOWER(rn) LIKE LOWER($1)
                 )
                 OR EXISTS (
                   SELECT 1 FROM unnest(alternate_names) AS an 
                   WHERE LOWER(an) LIKE LOWER($1)
                 )`;
      params.push(`%${search.trim()}%`);
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const result = await pool.query<FoodRow>(query, params);

    return res.json({
      count: result.rows.length,
      data: result.rows,
      results: result.rows,
      message: search
        ? `Found ${result.rows.length} foods matching "${search}"`
        : `Showing ${result.rows.length} foods from database`,
      database_info: {
        total_shown: result.rows.length,
        search_term: search || 'none',
        table: 'food_nutrition',
        schema: 'correct'
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

router.get('/users', async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await pool.query<{
      id: string;
      email: string;
      name: string | null;
      created_at: string;
    }>('SELECT id, email, name, created_at FROM users ORDER BY created_at DESC');

    return res.json({
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

