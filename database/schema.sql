-- ============================================
-- HOMA FOODS DATABASE - NEON POSTGRESQL SCHEMA
-- Database: nutri_bot1
-- 3 Lakh Foods | 7 Continents | 165 Countries
-- Tables: 2 (users, food_nutrition)
-- Primary Keys: UUID (as per rules)
-- Dr. Nehru's HOMA-IR Nutrition System
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fast text search

-- ============================================
-- TABLE 1: USERS (Authentication - Phase 1)
-- Sign Up: email, password, confirm_password
-- Login: email, password → Dashboard
-- Later: name, phone will be added
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(500),              -- UNIVERSAL: Lakshmi, Lakshmi Galla, lakshmi_galla, any format
    phone VARCHAR(100),              -- FLEXIBLE: +91, +1, 996, any format, any length
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Index for faster email lookups (login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- ============================================
-- TABLE 2: FOOD_NUTRITION (3 Lakh Foods Database)
-- Cross-verified from: USDA, ICMR, China CDN, Europe, Wikipedia
-- Foods from: India (Tara Dalal, Telugu names), China, America, Europe
-- Search: "chicken biryani", "pulihora", "bobbatlu", "idli"
-- Display: Speedometer (green→red) with calories, protein, fats
-- ============================================
CREATE TABLE IF NOT EXISTS food_nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Food Identification (UNIVERSAL - Any Format)
    food_name VARCHAR(1000) NOT NULL,       -- UNIVERSAL: biryani, B iryani, Biryani, BIRYANI, any case
    food_name_lower VARCHAR(1000) NOT NULL, -- For fast searching - case insensitive
    regional_names TEXT[],                  -- Telugu: pulihora, bobbatlu, gare gadka, idli types
    alternate_names TEXT[],                 -- Tara Dalal names, local variations, any spelling
    
    -- Nutrition Data (Per 100g standard serving)
    calories DECIMAL(10, 2) NOT NULL,
    protein_g DECIMAL(10, 2) DEFAULT 0,
    fat_g DECIMAL(10, 2) DEFAULT 0,
    carbs_g DECIMAL(10, 2) DEFAULT 0,
    fiber_g DECIMAL(10, 2) DEFAULT 0,
    sugar_g DECIMAL(10, 2) DEFAULT 0,
    sodium_mg DECIMAL(10, 2) DEFAULT 0,
    
    -- Speedometer Rating (Green → Yellow → Red)
    diabetic_rating VARCHAR(20) CHECK (diabetic_rating IN ('green', 'yellow', 'red')),
    health_score INTEGER CHECK (health_score BETWEEN 0 AND 100), -- For speedometer needle position
    
    -- Geographic & Category Data (UNIVERSAL)
    country VARCHAR(200),                   -- India, China, USA, etc. - any country name
    continent VARCHAR(100),                 -- Asia, Europe, Americas, etc. (7 continents)
    cuisine_type VARCHAR(200),             -- Indian, Chinese, American, Italian, etc. - any cuisine
    category VARCHAR(200),                 -- Breakfast, Junk Food, Healthy, Traditional, etc. - any category
    
    -- Data Source & Verification
    data_source VARCHAR(100),               -- USDA, ICMR, China CDN, Wikipedia, Europe DB
    verified BOOLEAN DEFAULT false,         -- Cross-verified from multiple sources
    verification_sources TEXT[],            -- ['USDA', 'ICMR', 'Wikipedia']
    
    -- Search Optimization
    search_vector tsvector,                 -- Full-text search
    popularity_score INTEGER DEFAULT 0,     -- For ranking search results
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for SUPER FAST searching (3 lakh foods)
CREATE INDEX IF NOT EXISTS idx_food_name_lower ON food_nutrition(food_name_lower);
CREATE INDEX IF NOT EXISTS idx_food_search_vector ON food_nutrition USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_food_country ON food_nutrition(country);
CREATE INDEX IF NOT EXISTS idx_food_continent ON food_nutrition(continent);
CREATE INDEX IF NOT EXISTS idx_food_category ON food_nutrition(category);
CREATE INDEX IF NOT EXISTS idx_food_diabetic_rating ON food_nutrition(diabetic_rating);
CREATE INDEX IF NOT EXISTS idx_food_popularity ON food_nutrition(popularity_score DESC);

-- Trigger to auto-update search_vector for fast searching
CREATE OR REPLACE FUNCTION food_nutrition_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.food_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.regional_names, ' '), '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.alternate_names, ' '), '')), 'C');
  NEW.food_name_lower := LOWER(NEW.food_name);
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvector_update BEFORE INSERT OR UPDATE
ON food_nutrition FOR EACH ROW EXECUTE FUNCTION food_nutrition_search_trigger();

-- ============================================
-- SAMPLE DATA - HOMA FOODS (for testing)
-- Indian, Chinese, American, Junk Foods
-- Telugu Names: Pulihora, Bobbatlu, Gare Gadka, Idli
-- ============================================

-- Sample User (Password: "Test123!" - will be hashed by backend)
-- INSERT INTO users (email, password_hash) 
-- VALUES ('test@homafoods.com', '$2a$10$...')
-- This will be created via Sign Up page

-- ===========================================
-- INDIAN FOODS (Tara Dalal + Telugu Names)
-- ===========================================

INSERT INTO food_nutrition (
    food_name, regional_names, alternate_names,
    calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g, sodium_mg,
    diabetic_rating, health_score,
    country, continent, cuisine_type, category,
    data_source, verified, verification_sources,
    popularity_score
) VALUES 
-- Chicken Biryani (Popular search)
('Chicken Biryani', 
 ARRAY['చికెన్ బిర్యానీ', 'Koli Biryani'], 
 ARRAY['Hyderabadi Biryani', 'Chicken Dum Biryani'],
 200.5, 12.3, 8.7, 25.4, 2.1, 1.2, 450.0,
 'yellow', 60,
 'India', 'Asia', 'Indian', 'Main Course',
 'ICMR-NIN', true, ARRAY['ICMR', 'Tara Dalal', 'Wikipedia'],
 100),

-- Pulihora (Telugu name - Tamarind Rice)
('Pulihora',
 ARRAY['పులిహోర', 'Puliyodarai', 'Tamarind Rice'],
 ARRAY['Puliyogare', 'Chitrannam'],
 180.0, 3.5, 6.2, 28.5, 1.8, 2.5, 320.0,
 'yellow', 55,
 'India', 'Asia', 'South Indian', 'Rice Dish',
 'ICMR-NIN', true, ARRAY['ICMR', 'Wikipedia'],
 85),

-- Bobbatlu (Telugu sweet)
('Bobbatlu',
 ARRAY['బొబ్బట్లు', 'Puran Poli', 'Holige'],
 ARRAY['Obbattu', 'Bakshalu'],
 350.0, 6.0, 12.5, 55.0, 3.5, 25.0, 80.0,
 'red', 35,
 'India', 'Asia', 'South Indian', 'Sweet',
 'ICMR-NIN', true, ARRAY['ICMR', 'Tara Dalal'],
 70),

-- Idli (Multiple types)
('Idli',
 ARRAY['ఇడ్లీ', 'Idly'],
 ARRAY['Steamed Idli', 'Rava Idli', 'Button Idli'],
 58.0, 2.5, 0.5, 12.0, 1.0, 0.3, 150.0,
 'green', 85,
 'India', 'Asia', 'South Indian', 'Breakfast',
 'ICMR-NIN', true, ARRAY['ICMR', 'USDA', 'Tara Dalal'],
 95),

-- Sambar (Multiple varieties)
('Sambar',
 ARRAY['సాంబార్', 'Sambhar'],
 ARRAY['Tiffin Sambar', 'Hotel Sambar', 'Dal Sambar'],
 85.0, 4.2, 2.8, 12.5, 3.5, 3.0, 380.0,
 'green', 80,
 'India', 'Asia', 'South Indian', 'Curry',
 'ICMR-NIN', true, ARRAY['ICMR', 'Tara Dalal'],
 90),

-- Gare Gadka (Telugu - unclear exact dish, assuming traditional snack)
('Gare Gadka',
 ARRAY['గారె గడక'], 
 ARRAY['Traditional Snack'],
 220.0, 5.0, 10.0, 30.0, 2.0, 5.0, 200.0,
 'yellow', 50,
 'India', 'Asia', 'Telugu Traditional', 'Snack',
 'Regional', false, ARRAY['Local'],
 40),

-- ===========================================
-- CHINESE FOODS
-- ===========================================

-- Chicken 65 (Indo-Chinese)
('Chicken 65',
 ARRAY['చికెన్ 65'],
 ARRAY['Fried Chicken', 'Spicy Chicken'],
 280.0, 22.0, 18.0, 12.0, 1.0, 2.0, 650.0,
 'red', 40,
 'India', 'Asia', 'Indo-Chinese', 'Appetizer',
 'ICMR-NIN', true, ARRAY['ICMR', 'Wikipedia'],
 88),

-- Fried Rice
('Fried Rice',
 ARRAY['Veg Fried Rice', 'Chinese Fried Rice'],
 ARRAY['Yangzhou Fried Rice'],
 190.0, 4.5, 7.5, 27.0, 1.5, 1.0, 420.0,
 'yellow', 50,
 'China', 'Asia', 'Chinese', 'Main Course',
 'China CDN', true, ARRAY['China CDN', 'USDA'],
 82),

-- ===========================================
-- AMERICAN FOODS (Junk + Breakfast)
-- ===========================================

-- Burger
('Cheese Burger',
 ARRAY['Cheeseburger'],
 ARRAY['American Burger', 'Classic Burger'],
 303.0, 17.0, 14.0, 31.0, 1.5, 6.0, 750.0,
 'red', 30,
 'USA', 'North America', 'American', 'Junk Food',
 'USDA', true, ARRAY['USDA', 'Wikipedia'],
 92),

-- American Breakfast
('Pancakes with Syrup',
 ARRAY['American Pancakes'],
 ARRAY['Buttermilk Pancakes', 'Maple Pancakes'],
 227.0, 6.0, 10.0, 28.0, 1.0, 14.0, 439.0,
 'red', 35,
 'USA', 'North America', 'American', 'Breakfast',
 'USDA', true, ARRAY['USDA'],
 75),

-- ===========================================
-- HEALTHY OPTIONS
-- ===========================================

-- Brown Rice
('Brown Rice',
 ARRAY['Whole Grain Rice'],
 ARRAY['Unpolished Rice'],
 112.0, 2.6, 0.9, 23.5, 1.8, 0.4, 5.0,
 'green', 75,
 'Global', 'Asia', 'Healthy', 'Staple',
 'USDA', true, ARRAY['USDA', 'ICMR'],
 80),

-- Grilled Chicken
('Grilled Chicken Breast',
 ARRAY['Chicken Breast'],
 ARRAY['Skinless Chicken', 'Baked Chicken'],
 165.0, 31.0, 3.6, 0.0, 0.0, 0.0, 74.0,
 'green', 95,
 'Global', 'Global', 'Healthy', 'Protein',
 'USDA', true, ARRAY['USDA', 'ICMR', 'Wikipedia'],
 85)

ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERIES - HOMA FOODS
-- ============================================

-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Count total foods
SELECT COUNT(*) as total_foods FROM food_nutrition;

-- Display all users
SELECT id, email, name, phone, created_at 
FROM users 
ORDER BY created_at DESC
LIMIT 10;

-- Display sample HOMA FOODS (like dashboard search results)
SELECT 
    food_name,
    calories,
    protein_g,
    fat_g,
    carbs_g,
    diabetic_rating,
    health_score,
    country,
    cuisine_type
FROM food_nutrition
ORDER BY popularity_score DESC
LIMIT 10;

-- Search example: "chicken biryani"
SELECT 
    food_name,
    regional_names,
    calories,
    protein_g,
    fat_g,
    diabetic_rating,
    health_score
FROM food_nutrition
WHERE food_name_lower LIKE '%chicken%biryani%'
   OR 'chicken biryani' = ANY(alternate_names)
LIMIT 5;

-- Count by continent (verify 7 continents coverage)
SELECT continent, COUNT(*) as food_count
FROM food_nutrition
GROUP BY continent
ORDER BY food_count DESC;

-- Count by diabetic rating (for speedometer stats)
SELECT diabetic_rating, COUNT(*) as count
FROM food_nutrition
GROUP BY diabetic_rating
ORDER BY 
    CASE diabetic_rating 
        WHEN 'green' THEN 1 
        WHEN 'yellow' THEN 2 
        WHEN 'red' THEN 3 
    END;

-- ============================================
-- CLEANUP (if needed to reset)
-- ============================================
-- Uncomment to drop tables:
-- DROP TABLE IF EXISTS food_nutrition CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

