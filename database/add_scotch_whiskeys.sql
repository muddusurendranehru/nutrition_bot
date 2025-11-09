-- ============================================
-- ADD 100 SCOTCH WHISKEYS TO FOOD_NUTRITION TABLE
-- Domestic (Indian) + International Brands
-- ============================================
-- 
-- Nutrition Values:
-- - 30ml (1 shot): 70 calories
-- - 50ml (large shot): 117 calories
-- - 100ml: 234 calories
-- - 750ml (full bottle): 1755 calories
-- - Protein: 0g, Carbs: 0g, Fat: 0g (pure spirits)
-- - Diabetic Rating: 'red' (not safe)
-- - Health Score: 25-30 (alcohol is not healthy)
--
-- Usage: Copy this entire file and paste into Neon SQL Editor, then Execute
-- ============================================

-- DOMESTIC (INDIAN) SCOTCH WHISKEYS
-- ============================================

-- Teachers Brand Variants
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Teachers Scotch Whisky (30ml)', 'teachers scotch whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Scotch Whisky (50ml)', 'teachers scotch whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Scotch Whisky (100ml)', 'teachers scotch whisky (100ml)', 234, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Highland Cream (30ml)', 'teachers highland cream (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Highland Cream (50ml)', 'teachers highland cream (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Pride (30ml)', 'teachers pride (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Pride (50ml)', 'teachers pride (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Pride (100ml)', 'teachers pride (100ml)', 234, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Golden Thistle Scotch (30ml)', 'teachers golden thistle scotch (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers Golden Temple (30ml)', 'teachers golden temple (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers 50 (30ml)', 'teachers 50 (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Teachers 100 (30ml)', 'teachers 100 (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- Black Dog Brand Variants
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Black Dog Scotch Whisky (30ml)', 'black dog scotch whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog Scotch Whisky (50ml)', 'black dog scotch whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog Triple Reserve (30ml)', 'black dog triple reserve (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog Triple Reserve (50ml)', 'black dog triple reserve (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog Centenary (30ml)', 'black dog centenary (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog 8 Years (30ml)', 'black dog 8 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Black Dog 12 Years (30ml)', 'black dog 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- Officers Choice Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Officers Choice Whisky (30ml)', 'officers choice whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Officers Choice Whisky (50ml)', 'officers choice whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Officers Choice Blue (30ml)', 'officers choice blue (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Officers Choice Premium (30ml)', 'officers choice premium (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- Royal Challenge Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Royal Challenge Whisky (30ml)', 'royal challenge whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Royal Challenge Whisky (50ml)', 'royal challenge whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Royal Challenge Premium (30ml)', 'royal challenge premium (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- McDowells Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('McDowells No.1 Whisky (30ml)', 'mcdowells no.1 whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('McDowells No.1 Whisky (50ml)', 'mcdowells no.1 whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('McDowells No.1 Celebration (30ml)', 'mcdowells no.1 celebration (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- Blenders Pride Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Blenders Pride Whisky (30ml)', 'blenders pride whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Blenders Pride Whisky (50ml)', 'blenders pride whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Blenders Pride Reserve Collection (30ml)', 'blenders pride reserve collection (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Blenders Pride 12 Years (30ml)', 'blenders pride 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- Other Indian Brands
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Imperial Blue Whisky (30ml)', 'imperial blue whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Imperial Blue Whisky (50ml)', 'imperial blue whisky (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Bagpiper Whisky (30ml)', 'bagpiper whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Antiquity Blue Whisky (30ml)', 'antiquity blue whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Signature Whisky (30ml)', 'signature whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Haywards 5000 Whisky (30ml)', 'haywards 5000 whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Old Tavern Whisky (30ml)', 'old tavern whisky (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Seagrams Imperial Blue (30ml)', 'seagrams imperial blue (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Seagrams 100 Pipers (30ml)', 'seagrams 100 pipers (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25),
('Seagrams 100 Pipers 12 Years (30ml)', 'seagrams 100 pipers 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'India', 'Scotch Whiskey', 'red', 25);

-- INTERNATIONAL SCOTCH WHISKEYS
-- ============================================

-- Johnnie Walker Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Johnnie Walker Red Label (30ml)', 'johnnie walker red label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Johnnie Walker Red Label (50ml)', 'johnnie walker red label (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Johnnie Walker Black Label (30ml)', 'johnnie walker black label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Black Label (50ml)', 'johnnie walker black label (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Black Label 12 Years (30ml)', 'johnnie walker black label 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Double Black (30ml)', 'johnnie walker double black (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Green Label (30ml)', 'johnnie walker green label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Gold Label (30ml)', 'johnnie walker gold label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Johnnie Walker Blue Label (30ml)', 'johnnie walker blue label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30);

-- Chivas Regal Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Chivas Regal 12 Years (30ml)', 'chivas regal 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Chivas Regal 12 Years (50ml)', 'chivas regal 12 years (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Chivas Regal 18 Years (30ml)', 'chivas regal 18 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Chivas Regal 25 Years (30ml)', 'chivas regal 25 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Chivas Regal Mizunara (30ml)', 'chivas regal mizunara (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28);

-- Glenfiddich Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Glenfiddich 12 Years (30ml)', 'glenfiddich 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Glenfiddich 12 Years (50ml)', 'glenfiddich 12 years (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Glenfiddich 15 Years (30ml)', 'glenfiddich 15 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Glenfiddich 18 Years (30ml)', 'glenfiddich 18 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Glenfiddich 21 Years (30ml)', 'glenfiddich 21 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30);

-- Macallan Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Macallan 12 Years (30ml)', 'macallan 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Macallan 18 Years (30ml)', 'macallan 18 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Macallan Double Cask (30ml)', 'macallan double cask (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Macallan Sherry Oak (30ml)', 'macallan sherry oak (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30);

-- Jameson Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Jameson Irish Whiskey (30ml)', 'jameson irish whiskey (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jameson Irish Whiskey (50ml)', 'jameson irish whiskey (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jameson Black Barrel (30ml)', 'jameson black barrel (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jameson Caskmates (30ml)', 'jameson caskmates (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28);

-- Jack Daniel's Brand
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Jack Daniels Old No.7 (30ml)', 'jack daniels old no.7 (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Jack Daniels Old No.7 (50ml)', 'jack daniels old no.7 (50ml)', 117, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Jack Daniels Gentleman Jack (30ml)', 'jack daniels gentleman jack (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jack Daniels Single Barrel (30ml)', 'jack daniels single barrel (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jack Daniels Tennessee Honey (30ml)', 'jack daniels tennessee honey (30ml)', 85, 0, 0, 2, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25);

-- Other International Premium Brands
INSERT INTO food_nutrition (food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, data_source, category, country, cuisine_type, diabetic_rating, health_score) VALUES
('Glenlivet 12 Years (30ml)', 'glenlivet 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Glenlivet 15 Years (30ml)', 'glenlivet 15 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Glenlivet 18 Years (30ml)', 'glenlivet 18 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Ballantines Finest (30ml)', 'ballantines finest (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Ballantines 12 Years (30ml)', 'ballantines 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Ballantines 17 Years (30ml)', 'ballantines 17 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Dewars White Label (30ml)', 'dewars white label (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Dewars 12 Years (30ml)', 'dewars 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Dewars 18 Years (30ml)', 'dewars 18 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Cutty Sark (30ml)', 'cutty sark (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('J&B Rare (30ml)', 'j&b rare (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Famous Grouse (30ml)', 'famous grouse (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Famous Grouse 12 Years (30ml)', 'famous grouse 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Crown Royal (30ml)', 'crown royal (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Crown Royal Deluxe (30ml)', 'crown royal deluxe (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Jim Beam Bourbon (30ml)', 'jim beam bourbon (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Jim Beam Black (30ml)', 'jim beam black (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Wild Turkey (30ml)', 'wild turkey (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Wild Turkey 101 (30ml)', 'wild turkey 101 (30ml)', 85, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 25),
('Maker''s Mark (30ml)', 'maker''s mark (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Woodford Reserve (30ml)', 'woodford reserve (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Lagavulin 16 Years (30ml)', 'lagavulin 16 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Laphroaig 10 Years (30ml)', 'laphroaig 10 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Ardbeg 10 Years (30ml)', 'ardbeg 10 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Talisker 10 Years (30ml)', 'talisker 10 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Highland Park 12 Years (30ml)', 'highland park 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Aberlour 12 Years (30ml)', 'aberlour 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 28),
('Dalmore 12 Years (30ml)', 'dalmore 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Yamazaki 12 Years (30ml)', 'yamazaki 12 years (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30),
('Hibiki Harmony (30ml)', 'hibiki harmony (30ml)', 70, 0, 0, 0, 'Scotch Whiskey Database', 'Beverages', 'International', 'Scotch Whiskey', 'red', 30);

-- Verification Query (run this after inserting to check results)
-- SELECT COUNT(*) as total_scotch FROM food_nutrition WHERE cuisine_type = 'Scotch Whiskey';
-- SELECT food_name, country, calories FROM food_nutrition WHERE cuisine_type = 'Scotch Whiskey' ORDER BY country, food_name;

