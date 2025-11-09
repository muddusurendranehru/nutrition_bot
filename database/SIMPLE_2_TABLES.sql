-- ============================================
-- NUTRIBOT - SIMPLE 2 TABLE SCHEMA
-- Database: nutribot (or neondb)
-- ============================================

-- DROP old tables if they exist
DROP TABLE IF EXISTS user_food_log CASCADE;
DROP TABLE IF EXISTS fruits CASCADE;
DROP TABLE IF EXISTS nutrition_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS nutrition_database CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- ============================================
-- TABLE 1: customers (Authentication)
-- ============================================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster login queries
CREATE INDEX idx_customers_email ON customers(email);

COMMENT ON TABLE customers IS 'User accounts for Nutribot search';
COMMENT ON COLUMN customers.id IS 'INTEGER ID (1, 2, 3...)';
COMMENT ON COLUMN customers.password IS 'Bcrypt hashed password';

-- ============================================
-- TABLE 2: nutrition_database (3 Lakh Foods!)
-- ============================================
CREATE TABLE nutrition_database (
    id SERIAL PRIMARY KEY,
    
    -- Food names (multi-language)
    food_name VARCHAR(255) NOT NULL,
    food_name_hindi VARCHAR(255),
    food_name_chinese VARCHAR(255),
    
    -- Basic nutrition (required)
    calories INTEGER NOT NULL,
    serving_size VARCHAR(100),
    
    -- Macros (optional but recommended)
    carbs DECIMAL(10,2),
    proteins DECIMAL(10,2),
    fats DECIMAL(10,2),
    fiber DECIMAL(10,2),
    
    -- Glycemic index (CRITICAL for diabetes)
    glycemic_index INTEGER,
    
    -- Source verification
    source VARCHAR(100),              -- ICMR, USDA, Chinese Tables
    country_context VARCHAR(50),      -- India, China, Global
    reliability VARCHAR(20),          -- high, medium, estimated
    
    -- Medical info
    medical_notes TEXT,
    diabetes_friendly BOOLEAN,
    
    -- Categorization
    category VARCHAR(50),             -- breakfast, lunch, dinner, snack
    cuisine VARCHAR(50),              -- indian, chinese, global
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for FAST search (critical for 3 lakh entries!)
CREATE INDEX idx_nutrition_food_name ON nutrition_database(food_name);
CREATE INDEX idx_nutrition_food_name_lower ON nutrition_database(LOWER(food_name));
CREATE INDEX idx_nutrition_gi ON nutrition_database(glycemic_index);
CREATE INDEX idx_nutrition_country ON nutrition_database(country_context);
CREATE INDEX idx_nutrition_category ON nutrition_database(category);

-- Full-text search index for advanced queries
CREATE INDEX idx_nutrition_search ON nutrition_database USING GIN(
    to_tsvector('english', 
        COALESCE(food_name, '') || ' ' || 
        COALESCE(food_name_hindi, '') || ' ' || 
        COALESCE(food_name_chinese, '')
    )
);

COMMENT ON TABLE nutrition_database IS 'Master database of 3 lakh foods with nutrition info';
COMMENT ON COLUMN nutrition_database.glycemic_index IS 'Low: 0-55, Medium: 56-69, High: 70+';
COMMENT ON COLUMN nutrition_database.diabetes_friendly IS 'TRUE if GI < 55 and low carbs';

-- ============================================
-- SAMPLE DATA (For testing)
-- ============================================

-- Insert a few sample foods
INSERT INTO nutrition_database 
(food_name, food_name_hindi, calories, carbs, proteins, fats, fiber, glycemic_index, source, country_context, reliability, medical_notes, diabetes_friendly, category, cuisine)
VALUES
('Idli Sambar', 'इडली सांभर', 157, 31.5, 6.25, 1.1, 3.1, 59, 'ICMR-NIN', 'India', 'high', 'Excellent for diabetics due to fermentation process reducing GI. High protein from lentils.', TRUE, 'breakfast', 'indian'),
('Basmati Rice with Dal', 'बासमती चावल दाल', 318, 57.5, 12.25, 3.9, 3.1, 57, 'ICMR-NIN', 'India', 'high', 'Complete protein combination. Basmati rice has lower GI than regular rice.', TRUE, 'lunch', 'indian'),
('Plain Dosa', 'डोसा', 198, 34.5, 6.1, 3.9, 3.0, 65, 'ICMR-NIN', 'India', 'high', 'Fermented food with probiotics. Moderate GI suitable for controlled portions.', TRUE, 'breakfast', 'indian'),
('Chicken Biryani', 'चिकन बिरयानी', 448, 64.5, 15.25, 11.9, 2.1, 74, 'ICMR-NIN', 'India', 'high', 'High calorie and GI. Diabetics should consume small portions and pair with salad.', FALSE, 'lunch', 'indian'),
('Apple', 'सेब', 94, 24.9, 0.45, 0.25, 4.1, 35, 'USDA', 'Global', 'high', 'Excellent for diabetics. Low GI, high fiber. Natural fructose with fiber slows absorption.', TRUE, 'snack', 'global'),
('Banana', 'केला', 104, 26.9, 1.25, 0.35, 3.0, 50, 'USDA', 'Global', 'high', 'Medium GI fruit. Diabetics should consume in moderation, preferably with protein.', TRUE, 'snack', 'global'),
('Chicken Pizza with Extra Cheese', 'चिकन पिज़्ज़ा', 850, 95, 35, 38, 2, 78, 'USDA', 'Global', 'high', 'High GI will spike blood sugar rapidly. Refined flour + cheese = high glycemic. Not recommended for diabetics.', FALSE, 'dinner', 'global'),
('Grilled Chicken Breast', 'ग्रिल्ड चिकन', 164, 0, 30.9, 3.5, 0, 0, 'USDA', 'Global', 'high', 'Excellent for diabetes and weight management. High protein, zero carbs. Supports muscle maintenance.', TRUE, 'lunch', 'global'),
('Vegetable Fried Rice', '野菜炒饭', 418, 54.5, 12.25, 15.9, 2.1, 71, 'Chinese Food Tables', 'China', 'high', 'High GI due to white rice and oil. Diabetics should limit portion size and add protein.', FALSE, 'lunch', 'chinese'),
('Steamed Dumplings', '蒸饺', 298, 34.5, 14.25, 11.9, 3.0, 64, 'Chinese Food Tables', 'China', 'high', 'Balanced macronutrients. Steamed preparation is healthier than fried. Moderate GI suitable for diabetes.', TRUE, 'snack', 'chinese');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count total foods
SELECT COUNT(*) as total_foods FROM nutrition_database;

-- Count by country
SELECT country_context, COUNT(*) as count 
FROM nutrition_database 
GROUP BY country_context 
ORDER BY count DESC;

-- Diabetes-friendly foods
SELECT COUNT(*) as diabetes_safe_count 
FROM nutrition_database 
WHERE diabetes_friendly = TRUE;

-- Sample search query (test)
SELECT food_name, calories, glycemic_index, diabetes_friendly
FROM nutrition_database
WHERE LOWER(food_name) LIKE '%chicken%'
ORDER BY glycemic_index ASC;

-- ============================================
-- READY TO IMPORT YOUR 3 LAKH ENTRIES!
-- ============================================

/*
To import your 3 lakh foods:

1. Export from Bolt's nutritionDatabase.ts to CSV
2. Use this SQL:

COPY nutrition_database 
(food_name, calories, carbs, proteins, fats, fiber, glycemic_index, source, country_context, reliability, medical_notes)
FROM '/path/to/your/3lakh_foods.csv'
WITH (FORMAT csv, HEADER true);

OR

3. Use bulk INSERT statements (I can help generate these)
*/

