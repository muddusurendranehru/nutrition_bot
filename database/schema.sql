-- ============================================
-- NutriBot Production Schema (Neon PostgreSQL)
-- Database: nutri_bot
-- Exactly TWO tables with UUID primary keys
-- ============================================

-- Enable uuid generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop legacy tables (if migrating from older setups)
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS nutrition_database CASCADE;
DROP TABLE IF EXISTS fruits CASCADE;
DROP TABLE IF EXISTS user_food_log CASCADE;

-- ============================================
-- TABLE 1: users (Authentication)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

COMMENT ON TABLE users IS 'Registered NutriBot users (authentication via JWT)';

-- ============================================
-- TABLE 2: food_nutrition (Master Food Catalog)
-- ============================================
CREATE TABLE IF NOT EXISTS food_nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    food_name VARCHAR(500) NOT NULL,
    food_name_lower VARCHAR(500) NOT NULL,
    regional_names TEXT[] DEFAULT '{}',
    alternate_names TEXT[] DEFAULT '{}',
    calories NUMERIC(10,2) NOT NULL DEFAULT 0,
    protein_g NUMERIC(10,2),
    fat_g NUMERIC(10,2),
    carbs_g NUMERIC(10,2),
    fiber_g NUMERIC(10,2),
    sugar_g NUMERIC(10,2),
    diabetic_rating VARCHAR(20),
    health_score INTEGER,
    data_source VARCHAR(200),
    category VARCHAR(120),
    country VARCHAR(120),
    cuisine_type VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT chk_food_name_lower CHECK (food_name_lower = LOWER(food_name))
);

CREATE INDEX IF NOT EXISTS idx_food_nutrition_name ON food_nutrition(food_name_lower);
CREATE INDEX IF NOT EXISTS idx_food_nutrition_category ON food_nutrition(category);
CREATE INDEX IF NOT EXISTS idx_food_nutrition_country ON food_nutrition(country);
CREATE INDEX IF NOT EXISTS idx_food_nutrition_diabetic_rating ON food_nutrition(diabetic_rating);

COMMENT ON TABLE food_nutrition IS 'NutriBot master food table with multilingual support and health scores';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- SELECT COUNT(*) FROM users;
-- SELECT COUNT(*) FROM food_nutrition;

