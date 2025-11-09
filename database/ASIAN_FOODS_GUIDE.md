# Guide: Adding 100 Asian Foods to Neon Database

## Overview
This guide walks you through adding approximately 100 Asian food entries (Indian and Chinese) with local names (Telugu/Regional) and English names to your Neon PostgreSQL `food_nutrition` table.

## What's Included

### Indian Foods (~70 entries)
**Fruits:**
- Wood Apple (Velakkaya)
- Jamun (Neredipandu)
- Jackfruit (Panasapandu)
- Mango (Mamidipandu)
- Guava (Jama Pandu)
- Pomegranate (Danimma Pandu)
- And 20+ more fruits

**Vegetables:**
- Drumstick (Munagakaya)
- Okra (Bendakaya)
- Brinjal (Vankaya)
- Ridge Gourd (Beerakaya)
- Bottle Gourd (Sorakaya)
- And 25+ more vegetables

**Traditional Dishes:**
- Idli, Dosa, Upma, Pongal
- Sambar, Rasam
- Biryani, Curd Rice, Tamarind Rice
- Dal, Rajma, Chole

**Spices & Condiments:**
- Turmeric (Pasupu)
- Cumin (Jeelakarra)
- Coriander (Kothimeera)
- And more...

### Chinese Foods (~30 entries)
**Fruits:**
- Dragon Fruit (Kamalam)
- Lychee, Longan, Rambutan
- Mangosteen, Star Fruit
- Jujube (Chinese Date)

**Vegetables:**
- Bok Choy (Pak Choi)
- Chinese Cabbage (Napa)
- Chinese Broccoli (Gai Lan)
- Water Spinach (Kangkong)
- Bamboo Shoots, Lotus Root
- And more...

## Features

### Local Names Included
- **Telugu names**: Velakkaya, Neredipandu, Panasapandu, Chenakkaya, etc.
- **Telugu script**: వెలక్కాయ, నెరెడిపండు, etc.
- **Hindi names**: Bael Fruit, Kathal, Aam, Bhindi, etc.
- **Chinese names**: 荔枝 (Lychee), 白菜 (Bok Choy), etc.

### Search Capabilities
Users can search by:
- English name: "jamun", "jackfruit", "dragon fruit"
- Telugu name: "neredipandu", "panasapandu", "velakkaya"
- Hindi name: "kathal", "bhindi"
- Chinese name: "bok choy", "lychee"

## Nutrition Information

Each entry includes:
- **Calories** (per 100g standard serving)
- **Protein, Fat, Carbs** (grams)
- **Diabetic Rating**: green (safe), yellow (caution), red (not safe)
- **Health Score**: 0-100 (higher is better

## Step-by-Step Instructions

### Step 1: Access Neon Console

1. Go to: https://console.neon.tech
2. Log in to your Neon account
3. Select your project (the one with your `nutribot` database)
4. Click on **"SQL Editor"** in the left sidebar

### Step 2: Open the SQL File

1. Open the file: `database/add_asian_foods.sql` from your local project
2. **Copy the entire file content** (Ctrl+A, Ctrl+C)
3. Make sure you copy everything from `-- ============================================` at the top to the verification queries at the bottom

### Step 3: Paste and Execute in Neon

1. In Neon SQL Editor, click in the query box
2. **Paste** the entire SQL script (Ctrl+V)
3. Click **"Run"** button (or press Ctrl+Enter)
4. Wait for execution to complete (usually takes 5-10 seconds)

### Step 4: Verify the Insert

After execution, run this verification query in Neon SQL Editor:

```sql
-- Count total Asian foods added
SELECT COUNT(*) as total_asian_foods 
FROM food_nutrition 
WHERE data_source = 'Asian Foods Database';
```

Expected result: Should show approximately **100** entries

### Step 5: Check Sample Records

Run this query to see a sample of inserted records:

```sql
-- View sample Asian foods with local names
SELECT food_name, regional_names, country, calories, diabetic_rating 
FROM food_nutrition 
WHERE data_source = 'Asian Foods Database' 
ORDER BY country, food_name 
LIMIT 20;
```

You should see entries like:
- Wood Apple (Velakkaya) - India - regional_names: ['Velakkaya', 'వెలక్కాయ', 'Bael Fruit']
- Jamun (Neredipandu) - India - regional_names: ['Neredipandu', 'నెరెడిపండు', 'Java Plum']
- Dragon Fruit (Kamalam) - China - regional_names: ['Kamalam', 'कमलम', 'Pitaya']

### Step 6: Test Search Functionality

1. Go to your Nutribot application
2. Login to your account
3. In the dashboard, use **Smart Search**
4. Search for: `velakkaya` → Should show Wood Apple
5. Search for: `jamun` → Should show Jamun (Neredipandu)
6. Search for: `panasapandu` → Should show Jackfruit
7. Search for: `chenakkaya` → Should show Peanuts
8. Search for: `dragon fruit` → Should show Dragon Fruit (Kamalam)
9. Search for: `bok choy` → Should show Chinese Bok Choy

## Troubleshooting

### Error: "column 'regional_names' does not exist"
- **Cause**: Your `food_nutrition` table doesn't have `regional_names` column
- **Solution**: Check your table schema. If the column is named differently (e.g., `alternate_names`), update the SQL file

### Error: "duplicate key value violates unique constraint"
- **Cause**: Some Asian foods already exist in your database
- **Solution**: The script will skip existing entries or you may need to manually remove duplicates first

### Error: "array literal must begin with '{'"
- **Cause**: PostgreSQL version doesn't support `ARRAY[]` syntax
- **Solution**: Replace `ARRAY['name1', 'name2']` with `'{name1,name2}'::text[]` or remove regional_names column from INSERT

### No results after search
- **Cause**: Database connection or search query issue
- **Solution**: 
  1. Verify entries exist: `SELECT COUNT(*) FROM food_nutrition WHERE data_source = 'Asian Foods Database';`
  2. Check backend API is running
  3. Try searching for exact names like "velakkaya" or "jamun"

## Expected Results

After successful execution:

✅ **~100 Asian food entries** in `food_nutrition` table  
✅ **Users can search** by English, Telugu, Hindi, or Chinese names  
✅ **Local names visible** in regional_names field  
✅ **Proper nutrition data** (calories, ratings) for each entry  
✅ **Diabetic ratings** assigned (green/yellow/red)  
✅ **Health scores** included (0-100)  

## File Information

- **SQL File**: `database/add_asian_foods.sql`
- **Total Entries**: ~100 Asian foods
- **File Size**: ~25-30 KB
- **Execution Time**: 5-10 seconds in Neon

## Notes

- All foods include **regional_names** field with Telugu, Hindi, or Chinese names
- **Diabetic ratings** are assigned based on glycemic index (green=safe, yellow=caution, red=not safe)
- **Health scores** range from 60-95 (vegetables highest, high-sugar fruits lower)
- **Country field** distinguishes: 'India' vs 'China'
- **Category field** includes: Fruits, Vegetables, Breakfast, Lunch, Curry, Spices, etc.

## Search Examples

Users can search using any of these methods:
- **English**: "wood apple", "dragon fruit", "jackfruit"
- **Telugu**: "velakkaya", "neredipandu", "panasapandu"
- **Hindi**: "kathal", "bhindi", "jamun"
- **Chinese**: "bok choy", "lychee", "dragon fruit"

The search will match both `food_name` and `regional_names` fields.

## Next Steps

After adding these Asian foods:

1. **Test search** functionality with local names
2. **Add more regional foods** if needed (Tamil, Malayalam, Bengali names)
3. **Update periodically** as new dishes are discovered
4. **Monitor user searches** to see which foods are most popular

---

**Questions?** Check the SQL file comments or verify your database schema matches the expected structure (especially `regional_names` column).

