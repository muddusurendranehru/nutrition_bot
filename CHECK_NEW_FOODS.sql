-- 📊 CHECK YOUR GROWING DATABASE
-- Copy these SQL commands into your Neon Console

-- 1. 🔍 SHOW ALL AI GENERATED FOODS (New ones you saved)
SELECT 
  food_name,
  calories,
  protein_g,
  fat_g,
  carbs_g,
  data_source,
  country,
  created_at
FROM food_nutrition 
WHERE data_source LIKE '%AI Generated%' 
   OR diabetic_rating = 'ai'
ORDER BY created_at DESC;

-- 2. 📈 COUNT TOTAL FOODS IN DATABASE (Should be growing!)
SELECT 
  COUNT(*) as total_foods,
  COUNT(CASE WHEN data_source LIKE '%AI Generated%' THEN 1 END) as ai_foods,
  COUNT(CASE WHEN data_source != 'AI Generated (OpenAI)' THEN 1 END) as original_foods
FROM food_nutrition;

-- 3. 🔍 SEARCH FOR BUTTER CHICKEN SPECIFICALLY
SELECT * FROM food_nutrition 
WHERE LOWER(food_name) LIKE '%butter chicken%' 
ORDER BY created_at DESC;

-- 4. 🔍 SEARCH FOR KIMCHI FRIED RICE
SELECT * FROM food_nutrition 
WHERE LOWER(food_name) LIKE '%kimchi%' 
ORDER BY created_at DESC;

-- 5. 📊 SHOW RECENT ADDITIONS (Last 24 hours)
SELECT 
  food_name,
  calories,
  data_source,
  created_at
FROM food_nutrition 
WHERE created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
