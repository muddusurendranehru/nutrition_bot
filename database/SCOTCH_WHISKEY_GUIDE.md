# Guide: Adding 100 Scotch Whiskeys to Neon Database

## Overview
This guide walks you through adding approximately 100 scotch whiskey entries (domestic Indian and international brands) to your Neon PostgreSQL `food_nutrition` table.

## What's Included

### Domestic (Indian) Scotch Whiskeys (~50 entries)
- Teachers (Pride, Golden Temple, Highland Cream, 50, 100)
- Black Dog (Triple Reserve, Centenary, 8 Years, 12 Years)
- Officers Choice
- Royal Challenge
- McDowells No.1
- Blenders Pride
- Imperial Blue
- Seagrams 100 Pipers
- And more...

### International Scotch Whiskeys (~50 entries)
- Johnnie Walker (Red, Black, Double Black, Green, Gold, Blue Label)
- Chivas Regal (12, 18, 25 Years)
- Glenfiddich (12, 15, 18, 21 Years)
- Macallan (12, 18, Double Cask, Sherry Oak)
- Jameson Irish Whiskey
- Jack Daniel's
- Premium brands: Lagavulin, Laphroaig, Ardbeg, Talisker, Highland Park, and more

## Nutrition Information

All entries follow this standard:
- **30ml (1 shot)**: 70 calories
- **50ml (large shot)**: 117 calories
- **100ml**: 234 calories
- **Protein**: 0g
- **Carbs**: 0g (except flavored variants)
- **Fat**: 0g
- **Diabetic Rating**: 'red' (not safe for diabetes)
- **Health Score**: 25-30 (alcohol is not healthy)

## Step-by-Step Instructions

### Step 1: Access Neon Console

1. Go to: https://console.neon.tech
2. Log in to your Neon account
3. Select your project (the one with your `nutribot` database)
4. Click on **"SQL Editor"** in the left sidebar

### Step 2: Open the SQL File

1. Open the file: `database/add_scotch_whiskeys.sql` from your local project
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
-- Count total scotch whiskeys added
SELECT COUNT(*) as total_scotch 
FROM food_nutrition 
WHERE cuisine_type = 'Scotch Whiskey';
```

Expected result: Should show approximately **100** entries

### Step 5: Check Sample Records

Run this query to see a sample of inserted records:

```sql
-- View sample scotch whiskeys
SELECT food_name, country, calories, diabetic_rating, health_score 
FROM food_nutrition 
WHERE cuisine_type = 'Scotch Whiskey' 
ORDER BY country, food_name 
LIMIT 20;
```

You should see entries like:
- Teachers Pride (30ml) - India
- Black Dog Triple Reserve (30ml) - India
- Johnnie Walker Black Label (30ml) - International
- Chivas Regal 12 Years (30ml) - International

### Step 6: Test Search Functionality

1. Go to your Nutribot application
2. Login to your account
3. In the dashboard, use **Smart Search**
4. Search for: `teachers`
5. You should see Teachers brand entries
6. Search for: `johnnie walker`
7. You should see Johnnie Walker entries
8. Search for: `scotch`
9. You should see multiple scotch whiskey results

## Troubleshooting

### Error: "duplicate key value violates unique constraint"
- **Cause**: Some scotch entries already exist in your database
- **Solution**: The script will skip existing entries (if using INSERT IGNORE) or you may need to manually remove duplicates first

### Error: "column does not exist"
- **Cause**: Your `food_nutrition` table schema is different
- **Solution**: Check your table schema matches the expected columns:
  - `food_name`, `food_name_lower`, `calories`, `protein_g`, `fat_g`, `carbs_g`
  - `data_source`, `category`, `country`, `cuisine_type`, `diabetic_rating`, `health_score`

### No results after search
- **Cause**: Database connection or search query issue
- **Solution**: 
  1. Verify entries exist: `SELECT COUNT(*) FROM food_nutrition WHERE cuisine_type = 'Scotch Whiskey';`
  2. Check backend API is running
  3. Try searching for exact names like "Teachers" or "Black Dog"

## Expected Results

After successful execution:

✅ **~100 scotch whiskey entries** in `food_nutrition` table  
✅ **Users can search** for scotch brands via Smart Search  
✅ **Domestic and international** brands are searchable  
✅ **Proper nutrition data** (calories, ratings) for each entry  
✅ **Diabetic warnings** (red rating) shown for all entries  

## File Information

- **SQL File**: `database/add_scotch_whiskeys.sql`
- **Total Entries**: ~100 scotch whiskeys
- **File Size**: ~15-20 KB
- **Execution Time**: 5-10 seconds in Neon

## Notes

- All scotch whiskeys are marked with `diabetic_rating = 'red'` (not safe for diabetes)
- Health scores range from 25-30 (alcohol is not healthy)
- Country field distinguishes: 'India' (domestic) vs 'International'
- Multiple serving sizes included (30ml, 50ml, 100ml)
- Variants included (12 years, Triple Reserve, etc.)

## Next Steps

After adding these scotch whiskeys:

1. **Test search** functionality in your app
2. **Add more beverages** if needed (beer, wine, rum, vodka, etc.)
3. **Update periodically** as new brands/variants are released
4. **Monitor user searches** to see which scotches are most popular

---

**Questions?** Check the SQL file comments or verify your database schema matches the expected structure.

