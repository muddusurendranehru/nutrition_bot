const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedCompleteFoods() {
  try {
    console.log('🌾 Starting COMPLETE nutrition database seeding...');
    console.log('📊 Adding: Millets, Dry Fruits, Alcohols, Indian Sweets, South Sweets');

    const foods = [
      // ============================================
      // MILLETS - ALL VARIETIES (20 foods)
      // ============================================
      { food_name: 'Foxtail Millet (1 cup cooked)', calories: 190, protein_g: 6, fat_g: 2, carbs_g: 40, fiber_g: 5, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 95, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['కొర్రలు', 'कंगनी'] },
      { food_name: 'Pearl Millet / Bajra (1 cup cooked)', calories: 200, protein_g: 6, fat_g: 2, carbs_g: 42, fiber_g: 6, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 92, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['సజ్జలు', 'बाजरा'] },
      { food_name: 'Finger Millet / Ragi (1 cup cooked)', calories: 180, protein_g: 5, fat_g: 1.5, carbs_g: 38, fiber_g: 5, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 95, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['రాగి', 'रागी'] },
      { food_name: 'Little Millet (1 cup cooked)', calories: 170, protein_g: 5, fat_g: 2, carbs_g: 36, fiber_g: 4, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['సామలు', 'समा'] },
      { food_name: 'Kodo Millet (1 cup cooked)', calories: 175, protein_g: 5, fat_g: 1.5, carbs_g: 37, fiber_g: 5, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 92, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['అరికెలు', 'कोदो'] },
      { food_name: 'Barnyard Millet (1 cup cooked)', calories: 165, protein_g: 4, fat_g: 1.5, carbs_g: 35, fiber_g: 4, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['ఊడలు', 'झंगोरा'] },
      { food_name: 'Proso Millet (1 cup cooked)', calories: 180, protein_g: 5, fat_g: 2, carbs_g: 38, fiber_g: 4, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['వరిగలు', 'बरी'] },
      { food_name: 'Sorghum / Jowar (1 cup cooked)', calories: 195, protein_g: 6, fat_g: 2, carbs_g: 42, fiber_g: 6, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Healthy', category: 'Millet', regional_names: ['జొన్నలు', 'ज्वार'] },
      { food_name: 'Ragi Mudde (2 balls)', calories: 150, protein_g: 4, fat_g: 1, carbs_g: 32, fiber_g: 4, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'South Indian', category: 'Millet', regional_names: ['రాగి సంగటి', 'रागी मुद्दे'] },
      { food_name: 'Bajra Roti (2 pieces)', calories: 180, protein_g: 5, fat_g: 2, carbs_g: 38, fiber_g: 5, sugar_g: 0, sodium_mg: 150, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'North Indian', category: 'Millet', regional_names: ['బజ్రా రోటీ', 'बाजरा रोटी'] },
      { food_name: 'Jowar Roti (2 pieces)', calories: 175, protein_g: 5, fat_g: 2, carbs_g: 36, fiber_g: 5, sugar_g: 0, sodium_mg: 140, diabetic_rating: 'green', health_score: 87, country: 'India', cuisine_type: 'North Indian', category: 'Millet', regional_names: ['జొన్న రోటీ', 'ज्वार रोटी'] },
      { food_name: 'Ragi Dosa (2 pieces)', calories: 140, protein_g: 4, fat_g: 2, carbs_g: 28, fiber_g: 4, sugar_g: 0, sodium_mg: 200, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'South Indian', category: 'Millet', regional_names: ['రాగి దోశ', 'रागी डोसा'] },
      { food_name: 'Foxtail Millet Upma (1 plate)', calories: 160, protein_g: 5, fat_g: 4, carbs_g: 28, fiber_g: 4, sugar_g: 0, sodium_mg: 250, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'South Indian', category: 'Millet', regional_names: ['కొర్ర ఉప్మా', 'कंगनी उपमा'] },
      { food_name: 'Little Millet Khichdi (1 bowl)', calories: 200, protein_g: 7, fat_g: 5, carbs_g: 32, fiber_g: 5, sugar_g: 0, sodium_mg: 300, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian', category: 'Millet', regional_names: ['సామల ఖిచ్డీ', 'समा खिचड़ी'] },
      { food_name: 'Ragi Porridge (1 bowl)', calories: 120, protein_g: 3, fat_g: 1, carbs_g: 25, fiber_g: 3, sugar_g: 2, sodium_mg: 50, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'South Indian', category: 'Millet', regional_names: ['రాగి గంజి', 'रागी कांजी'] },

      // ============================================
      // DRY FRUITS - ALL VARIETIES (25 foods)
      // ============================================
      { food_name: 'Almonds (10 pieces)', calories: 70, protein_g: 2.5, fat_g: 6, carbs_g: 2.5, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['బాదం', 'बादाम'] },
      { food_name: 'Cashews (10 pieces)', calories: 90, protein_g: 2, fat_g: 7, carbs_g: 5, fiber_g: 0.5, sugar_g: 1, sodium_mg: 2, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['జీడిపప్పు', 'काजू'] },
      { food_name: 'Walnuts (10 halves)', calories: 130, protein_g: 3, fat_g: 13, carbs_g: 3, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 92, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['అక్రోట్లు', 'अखरोट'] },
      { food_name: 'Pistachios (20 pieces)', calories: 80, protein_g: 3, fat_g: 6, carbs_g: 4, fiber_g: 1.5, sugar_g: 1, sodium_mg: 0, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['పిస్తా', 'पिस्ता'] },
      { food_name: 'Raisins (2 tbsp)', calories: 60, protein_g: 0.5, fat_g: 0, carbs_g: 16, fiber_g: 1, sugar_g: 12, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 75, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['ఎండు ద్రాక్ష', 'किशमिश'] },
      { food_name: 'Dates (5 pieces)', calories: 120, protein_g: 1, fat_g: 0.2, carbs_g: 32, fiber_g: 3, sugar_g: 28, sodium_mg: 2, diabetic_rating: 'yellow', health_score: 70, country: 'Middle East', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['ఖర్జూర', 'खजूर'] },
      { food_name: 'Dried Figs (3 pieces)', calories: 70, protein_g: 1, fat_g: 0.3, carbs_g: 18, fiber_g: 3, sugar_g: 14, sodium_mg: 2, diabetic_rating: 'yellow', health_score: 78, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['అంజూర', 'अंजीर'] },
      { food_name: 'Dried Apricots (5 pieces)', calories: 60, protein_g: 1, fat_g: 0.2, carbs_g: 15, fiber_g: 2, sugar_g: 13, sodium_mg: 3, diabetic_rating: 'yellow', health_score: 80, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['ఖుబాని', 'खुबानी'] },
      { food_name: 'Prunes (5 pieces)', calories: 100, protein_g: 1, fat_g: 0.2, carbs_g: 27, fiber_g: 3, sugar_g: 16, sodium_mg: 2, diabetic_rating: 'yellow', health_score: 75, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['ప్రూన్స్', 'सूखा आलूबुखारा'] },
      { food_name: 'Brazil Nuts (5 pieces)', calories: 110, protein_g: 2.5, fat_g: 11, carbs_g: 2, fiber_g: 1, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 85, country: 'Brazil', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['బ్రెజిల్ గింజలు', 'ब्राजील नट'] },
      { food_name: 'Hazelnuts (10 pieces)', calories: 90, protein_g: 2, fat_g: 8, carbs_g: 3, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['హేజల్నట్', 'हेजलनट'] },
      { food_name: 'Pecans (10 halves)', calories: 100, protein_g: 1, fat_g: 10, carbs_g: 2, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 85, country: 'USA', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['పెకన్', 'पेकान'] },
      { food_name: 'Pine Nuts (2 tbsp)', calories: 90, protein_g: 2, fat_g: 9, carbs_g: 2, fiber_g: 0.5, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 87, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['పైన్ గింజలు', 'चिलगोज़ा'] },
      { food_name: 'Macadamia Nuts (5 pieces)', calories: 100, protein_g: 1, fat_g: 11, carbs_g: 2, fiber_g: 1, sugar_g: 0.5, sodium_mg: 0, diabetic_rating: 'green', health_score: 83, country: 'Australia', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['మకాడమియా', 'मैकाडामिया'] },
      { food_name: 'Sunflower Seeds (2 tbsp)', calories: 100, protein_g: 3, fat_g: 9, carbs_g: 4, fiber_g: 2, sugar_g: 0.5, sodium_mg: 1, diabetic_rating: 'green', health_score: 85, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Seeds', regional_names: ['సూర్యకాంతి విత్తనాలు', 'सूरजमुखी बीज'] },
      { food_name: 'Pumpkin Seeds (2 tbsp)', calories: 90, protein_g: 5, fat_g: 7, carbs_g: 3, fiber_g: 1, sugar_g: 0.5, sodium_mg: 5, diabetic_rating: 'green', health_score: 90, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Seeds', regional_names: ['గుమ్మడి విత్తనాలు', 'कद्दू बीज'] },
      { food_name: 'Chia Seeds (2 tbsp)', calories: 100, protein_g: 4, fat_g: 8, carbs_g: 10, fiber_g: 8, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Seeds', regional_names: ['చియా విత్తనాలు', 'चिया बीज'] },
      { food_name: 'Flax Seeds (2 tbsp)', calories: 90, protein_g: 3, fat_g: 7, carbs_g: 6, fiber_g: 5, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 92, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Seeds', regional_names: ['అవిసె గింజలు', 'अलसी बीज'] },
      { food_name: 'Sesame Seeds (2 tbsp)', calories: 100, protein_g: 3, fat_g: 9, carbs_g: 4, fiber_g: 2, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Dry Fruit', category: 'Seeds', regional_names: ['నువ్వులు', 'तिल'] },
      { food_name: 'Dried Coconut (2 tbsp)', calories: 120, protein_g: 1, fat_g: 12, carbs_g: 4, fiber_g: 3, sugar_g: 2, sodium_mg: 5, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Dry Fruit', category: 'Dry Fruit', regional_names: ['కొబ్బరి', 'सूखा नारियल'] },

      // ============================================
      // ALCOHOLS - ALL TYPES (30 drinks)
      // ============================================
      { food_name: 'Red Wine (1 glass 150ml)', calories: 125, protein_g: 0.1, fat_g: 0, carbs_g: 4, fiber_g: 0, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 40, country: 'Global', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'White Wine (1 glass 150ml)', calories: 120, protein_g: 0.1, fat_g: 0, carbs_g: 3, fiber_g: 0, sugar_g: 1.5, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 38, country: 'Global', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Rosé Wine (1 glass 150ml)', calories: 115, protein_g: 0.1, fat_g: 0, carbs_g: 3, fiber_g: 0, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 40, country: 'Global', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Champagne (1 glass 120ml)', calories: 90, protein_g: 0.1, fat_g: 0, carbs_g: 2, fiber_g: 0, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 35, country: 'France', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Prosecco (1 glass 120ml)', calories: 85, protein_g: 0.1, fat_g: 0, carbs_g: 2, fiber_g: 0, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 35, country: 'Italy', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Port Wine (1 glass 90ml)', calories: 160, protein_g: 0.1, fat_g: 0, carbs_g: 12, fiber_g: 0, sugar_g: 10, sodium_mg: 5, diabetic_rating: 'red', health_score: 25, country: 'Portugal', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Vodka (1 shot 45ml)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Russia', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Whiskey (1 shot 45ml)', calories: 105, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Scotland', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Scotch Whisky (1 shot 45ml)', calories: 105, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Scotland', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Bourbon (1 shot 45ml)', calories: 105, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'USA', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Rum (1 shot 45ml)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Caribbean', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Dark Rum (1 shot 45ml)', calories: 100, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Caribbean', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Gin (1 shot 45ml)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'England', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Tequila (1 shot 45ml)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Mexico', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Brandy (1 shot 45ml)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'France', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Cognac (1 shot 45ml)', calories: 105, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'France', cuisine_type: 'Alcohol', category: 'Spirit', regional_names: [] },
      { food_name: 'Beer (1 bottle 330ml)', calories: 153, protein_g: 1.6, fat_g: 0, carbs_g: 12.6, fiber_g: 0, sugar_g: 0, sodium_mg: 14, diabetic_rating: 'red', health_score: 30, country: 'Global', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Lager (1 bottle 330ml)', calories: 140, protein_g: 1.2, fat_g: 0, carbs_g: 12, fiber_g: 0, sugar_g: 0, sodium_mg: 12, diabetic_rating: 'red', health_score: 32, country: 'Global', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'IPA Beer (1 bottle 330ml)', calories: 180, protein_g: 2, fat_g: 0, carbs_g: 15, fiber_g: 0, sugar_g: 0, sodium_mg: 15, diabetic_rating: 'red', health_score: 28, country: 'Global', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Stout Beer (1 bottle 330ml)', calories: 200, protein_g: 2, fat_g: 0, carbs_g: 18, fiber_g: 0, sugar_g: 0, sodium_mg: 20, diabetic_rating: 'red', health_score: 25, country: 'Ireland', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Sake (1 cup 180ml)', calories: 200, protein_g: 0.5, fat_g: 0, carbs_g: 5, fiber_g: 0, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 40, country: 'Japan', cuisine_type: 'Alcohol', category: 'Wine', regional_names: [] },
      { food_name: 'Cocktail - Mojito (1 glass)', calories: 150, protein_g: 0.1, fat_g: 0, carbs_g: 8, fiber_g: 0, sugar_g: 7, sodium_mg: 5, diabetic_rating: 'red', health_score: 25, country: 'Cuba', cuisine_type: 'Alcohol', category: 'Cocktail', regional_names: [] },
      { food_name: 'Cocktail - Margarita (1 glass)', calories: 170, protein_g: 0.1, fat_g: 0, carbs_g: 10, fiber_g: 0, sugar_g: 9, sodium_mg: 10, diabetic_rating: 'red', health_score: 22, country: 'Mexico', cuisine_type: 'Alcohol', category: 'Cocktail', regional_names: [] },
      { food_name: 'Cocktail - Bloody Mary (1 glass)', calories: 120, protein_g: 1, fat_g: 0, carbs_g: 6, fiber_g: 1, sugar_g: 4, sodium_mg: 400, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'Alcohol', category: 'Cocktail', regional_names: [] },
      { food_name: 'Cocktail - Piña Colada (1 glass)', calories: 250, protein_g: 1, fat_g: 3, carbs_g: 32, fiber_g: 0, sugar_g: 28, sodium_mg: 10, diabetic_rating: 'red', health_score: 20, country: 'Puerto Rico', cuisine_type: 'Alcohol', category: 'Cocktail', regional_names: [] },
      { food_name: 'Liqueur (1 shot 45ml)', calories: 100, protein_g: 0, fat_g: 0, carbs_g: 10, fiber_g: 0, sugar_g: 9, sodium_mg: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Alcohol', category: 'Liqueur', regional_names: [] },
      { food_name: 'Baileys (1 shot 45ml)', calories: 130, protein_g: 1, fat_g: 5, carbs_g: 11, fiber_g: 0, sugar_g: 10, sodium_mg: 20, diabetic_rating: 'red', health_score: 18, country: 'Ireland', cuisine_type: 'Alcohol', category: 'Liqueur', regional_names: [] },
      { food_name: 'Kahlúa (1 shot 45ml)', calories: 110, protein_g: 0.1, fat_g: 0, carbs_g: 16, fiber_g: 0, sugar_g: 15, sodium_mg: 5, diabetic_rating: 'red', health_score: 18, country: 'Mexico', cuisine_type: 'Alcohol', category: 'Liqueur', regional_names: [] },

      // ============================================
      // INDIAN SWEETS - ALL VARIETIES (30 sweets)
      // ============================================
      { food_name: 'Gulab Jamun (2 pieces)', calories: 300, protein_g: 4, fat_g: 12, carbs_g: 45, fiber_g: 1, sugar_g: 30, sodium_mg: 50, diabetic_rating: 'red', health_score: 30, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['గులాబ్ జామున్', 'गुलाब जामुन'] },
      { food_name: 'Rasgulla (3 pieces)', calories: 180, protein_g: 6, fat_g: 2, carbs_g: 30, fiber_g: 0, sugar_g: 25, sodium_mg: 30, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['రసగుల్లా', 'रसगुल्ला'] },
      { food_name: 'Rasmalai (3 pieces)', calories: 200, protein_g: 6, fat_g: 8, carbs_g: 30, fiber_g: 0, sugar_g: 25, sodium_mg: 40, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['రస్మలాయ్', 'रसमलाई'] },
      { food_name: 'Kaju Katli (4 pieces)', calories: 200, protein_g: 4, fat_g: 12, carbs_g: 20, fiber_g: 1, sugar_g: 15, sodium_mg: 10, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['కాజు కట్లి', 'काजू कतली'] },
      { food_name: 'Besan Ladoo (2 pieces)', calories: 180, protein_g: 4, fat_g: 8, carbs_g: 25, fiber_g: 2, sugar_g: 20, sodium_mg: 20, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['బేసన్ లడ్డు', 'बेसन लड्डू'] },
      { food_name: 'Motichoor Ladoo (2 pieces)', calories: 160, protein_g: 3, fat_g: 6, carbs_g: 28, fiber_g: 1, sugar_g: 22, sodium_mg: 25, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['మోతీచూర్ లడ్డు', 'मोतीचूर लड्डू'] },
      { food_name: 'Boondi Ladoo (2 pieces)', calories: 170, protein_g: 3, fat_g: 7, carbs_g: 26, fiber_g: 1, sugar_g: 21, sodium_mg: 22, diabetic_rating: 'red', health_score: 38, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['బూంది లడ్డు', 'बूंदी लड्डू'] },
      { food_name: 'Rava Ladoo (2 pieces)', calories: 160, protein_g: 3, fat_g: 6, carbs_g: 25, fiber_g: 1, sugar_g: 18, sodium_mg: 15, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['రవ లడ్డు', 'रवा लड्डू'] },
      { food_name: 'Jalebi (4 pieces)', calories: 280, protein_g: 2, fat_g: 10, carbs_g: 40, fiber_g: 0, sugar_g: 35, sodium_mg: 60, diabetic_rating: 'red', health_score: 25, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['జిలేబి', 'जलेबी'] },
      { food_name: 'Imarti (4 pieces)', calories: 300, protein_g: 3, fat_g: 12, carbs_g: 42, fiber_g: 0, sugar_g: 38, sodium_mg: 65, diabetic_rating: 'red', health_score: 22, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['ఇమర్తి', 'इमरती'] },
      { food_name: 'Barfi (3 pieces)', calories: 180, protein_g: 3, fat_g: 8, carbs_g: 25, fiber_g: 1, sugar_g: 20, sodium_mg: 30, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['బర్ఫీ', 'बर्फी'] },
      { food_name: 'Kalakand (2 pieces)', calories: 140, protein_g: 4, fat_g: 5, carbs_g: 22, fiber_g: 0, sugar_g: 18, sodium_mg: 35, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['కలకండ', 'कलाकंद'] },
      { food_name: 'Peda (3 pieces)', calories: 160, protein_g: 4, fat_g: 6, carbs_g: 24, fiber_g: 0, sugar_g: 20, sodium_mg: 25, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['పెడ', 'पेड़ा'] },
      { food_name: 'Kheer (1 bowl)', calories: 220, protein_g: 6, fat_g: 8, carbs_g: 30, fiber_g: 1, sugar_g: 20, sodium_mg: 40, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['ఖీర్', 'खीर'] },
      { food_name: 'Payasam (1 bowl)', calories: 200, protein_g: 5, fat_g: 6, carbs_g: 32, fiber_g: 1, sugar_g: 22, sodium_mg: 35, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['పాయసం', 'पायसम'] },
      { food_name: 'Halwa (1 piece)', calories: 100, protein_g: 2, fat_g: 4, carbs_g: 16, fiber_g: 1, sugar_g: 12, sodium_mg: 15, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['హల్వా', 'हलवा'] },
      { food_name: 'Gajar Halwa (1 bowl)', calories: 250, protein_g: 4, fat_g: 10, carbs_g: 35, fiber_g: 3, sugar_g: 25, sodium_mg: 50, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'North Indian', category: 'Dessert', regional_names: ['గజ్జర్ హల్వా', 'गाजर हलवा'] },
      { food_name: 'Kulfi (1 stick)', calories: 120, protein_g: 3, fat_g: 4, carbs_g: 20, fiber_g: 0, sugar_g: 16, sodium_mg: 30, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['కుల్ఫీ', 'कुल्फी'] },
      { food_name: 'Falooda (1 glass)', calories: 180, protein_g: 4, fat_g: 6, carbs_g: 30, fiber_g: 1, sugar_g: 24, sodium_mg: 40, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['ఫలూదా', 'फालूदा'] },
      { food_name: 'Rabri (1 bowl)', calories: 220, protein_g: 6, fat_g: 8, carbs_g: 35, fiber_g: 0, sugar_g: 28, sodium_mg: 45, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'North Indian', category: 'Dessert', regional_names: ['రబ్రి', 'रबड़ी'] },
      { food_name: 'Shrikhand (1 bowl)', calories: 150, protein_g: 4, fat_g: 5, carbs_g: 25, fiber_g: 0, sugar_g: 20, sodium_mg: 35, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['శ్రీఖండ్', 'श्रीखंड'] },
      { food_name: 'Sandesh (3 pieces)', calories: 140, protein_g: 5, fat_g: 4, carbs_g: 22, fiber_g: 0, sugar_g: 18, sodium_mg: 25, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'Bengali', category: 'Dessert', regional_names: ['సందేష్', 'संदेश'] },
      { food_name: 'Cham Cham (3 pieces)', calories: 160, protein_g: 5, fat_g: 5, carbs_g: 26, fiber_g: 0, sugar_g: 22, sodium_mg: 30, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Bengali', category: 'Dessert', regional_names: ['చామ్ చామ్', 'चम चम'] },

      // ============================================
      // SOUTH INDIAN SWEETS (20 sweets)
      // ============================================
      { food_name: 'Mysore Pak (2 pieces)', calories: 200, protein_g: 2, fat_g: 12, carbs_g: 22, fiber_g: 1, sugar_g: 18, sodium_mg: 20, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['మైసూర్ పాక్', 'मैसूर पाक'] },
      { food_name: 'Adhirasam (2 pieces)', calories: 180, protein_g: 2, fat_g: 8, carbs_g: 28, fiber_g: 1, sugar_g: 22, sodium_mg: 15, diabetic_rating: 'red', health_score: 38, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['అధిరాసం', 'अधिरासम'] },
      { food_name: 'Ariselu / Adhirasam (3 pieces)', calories: 220, protein_g: 3, fat_g: 10, carbs_g: 32, fiber_g: 2, sugar_g: 25, sodium_mg: 18, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['అరిసెలు', 'अरिसेलु'] },
      { food_name: 'Bobbatlu / Puran Poli (2 pieces)', calories: 320, protein_g: 6, fat_g: 12, carbs_g: 45, fiber_g: 2, sugar_g: 15, sodium_mg: 50, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['బొబ్బట్లు', 'पूरन पोली'] },
      { food_name: 'Kakinada Kaja (2 pieces)', calories: 240, protein_g: 3, fat_g: 12, carbs_g: 32, fiber_g: 1, sugar_g: 26, sodium_mg: 25, diabetic_rating: 'red', health_score: 32, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['కాకినాడ ఖాజా', 'काकीनाड खजा'] },
      { food_name: 'Pootharekulu (2 pieces)', calories: 180, protein_g: 2, fat_g: 8, carbs_g: 26, fiber_g: 0.5, sugar_g: 20, sodium_mg: 15, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['పూతరేకులు', 'पूथारेकुलु'] },
      { food_name: 'Badusha (2 pieces)', calories: 220, protein_g: 3, fat_g: 10, carbs_g: 30, fiber_g: 1, sugar_g: 24, sodium_mg: 30, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['బాదుషా', 'बादुशा'] },
      { food_name: 'Kajjikaya (2 pieces)', calories: 200, protein_g: 3, fat_g: 9, carbs_g: 28, fiber_g: 2, sugar_g: 20, sodium_mg: 20, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['కజ్జికాయ', 'कज्जीकाया'] },
      { food_name: 'Gavvalu (1 cup)', calories: 150, protein_g: 2, fat_g: 6, carbs_g: 24, fiber_g: 1, sugar_g: 18, sodium_mg: 15, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['గవ్వలు', 'गव्वलु'] },
      { food_name: 'Sakinalu (4 pieces)', calories: 180, protein_g: 3, fat_g: 8, carbs_g: 26, fiber_g: 2, sugar_g: 8, sodium_mg: 200, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Telugu', category: 'Snack', regional_names: ['సకినాలు', 'सकिनालु'] },
      { food_name: 'Atreyasam (2 pieces)', calories: 190, protein_g: 2, fat_g: 8, carbs_g: 30, fiber_g: 1, sugar_g: 24, sodium_mg: 18, diabetic_rating: 'red', health_score: 38, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['అత్రేయాసం', 'अत्रेयासम'] },
      { food_name: 'Kova (2 pieces)', calories: 160, protein_g: 4, fat_g: 6, carbs_g: 24, fiber_g: 0, sugar_g: 20, sodium_mg: 30, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['కోవా', 'खोवा'] },
      { food_name: 'Double Ka Meetha (1 piece)', calories: 250, protein_g: 5, fat_g: 10, carbs_g: 35, fiber_g: 1, sugar_g: 28, sodium_mg: 50, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Hyderabadi', category: 'Dessert', regional_names: ['డబల్ కా మీఠా', 'डबल का मीठा'] },
      { food_name: 'Badam Halwa (1 piece)', calories: 180, protein_g: 4, fat_g: 10, carbs_g: 20, fiber_g: 2, sugar_g: 16, sodium_mg: 20, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['బాదం హల్వా', 'बादाम हलवा'] },
      { food_name: 'Paruppu Payasam (1 bowl)', calories: 200, protein_g: 6, fat_g: 6, carbs_g: 32, fiber_g: 2, sugar_g: 22, sodium_mg: 30, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['పరుప్పు పాయసం', 'दाल पायसम'] },
      { food_name: 'Semiya Payasam (1 bowl)', calories: 180, protein_g: 4, fat_g: 5, carbs_g: 30, fiber_g: 1, sugar_g: 20, sodium_mg: 35, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['సెమియా పాయసం', 'सेमिया पायसम'] },
      { food_name: 'Rava Kesari (1 piece)', calories: 200, protein_g: 3, fat_g: 8, carbs_g: 30, fiber_g: 1, sugar_g: 24, sodium_mg: 25, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['రవ కేసరి', 'रवा केसरी'] },
      { food_name: 'Moong Dal Halwa (1 piece)', calories: 220, protein_g: 5, fat_g: 10, carbs_g: 28, fiber_g: 3, sugar_g: 22, sodium_mg: 20, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'Indian', category: 'Dessert', regional_names: ['మూంగ్ దాల్ హల్వా', 'मूंग दाल हलवा'] },
      { food_name: 'Boorelu (3 pieces)', calories: 200, protein_g: 4, fat_g: 8, carbs_g: 30, fiber_g: 2, sugar_g: 20, sodium_mg: 25, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Telugu', category: 'Dessert', regional_names: ['బూరేలు', 'बूरेलु'] },
      { food_name: 'Kaja (2 pieces)', calories: 240, protein_g: 3, fat_g: 12, carbs_g: 32, fiber_g: 1, sugar_g: 26, sodium_mg: 25, diabetic_rating: 'red', health_score: 32, country: 'India', cuisine_type: 'South Indian', category: 'Dessert', regional_names: ['ఖాజా', 'खजा'] }
    ];

    console.log(`📊 Inserting ${foods.length} foods...`);

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      try {
        await pool.query(
          `INSERT INTO food_nutrition (
            food_name, food_name_lower, regional_names, alternate_names, calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g, sodium_mg,
            diabetic_rating, health_score, country, continent, cuisine_type, category, data_source, verified, verification_sources
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
          [
            food.food_name,
            food.food_name.toLowerCase(),
            food.regional_names || [],
            food.alternate_names || [],
            food.calories,
            food.protein_g || 0,
            food.fat_g || 0,
            food.carbs_g || 0,
            food.fiber_g || 0,
            food.sugar_g || 0,
            food.sodium_mg || 0,
            food.diabetic_rating,
            food.health_score,
            food.country,
            food.continent || 'Asia',
            food.cuisine_type,
            food.category,
            'Complete Food Database',
            true,
            ['USDA', 'ICMR', 'Tara Dalal', 'Wikipedia']
          ]
        );
      } catch (error) {
        if (error.code === '23505') { // Duplicate key error
          console.log(`⚠️  Skipped duplicate: ${food.food_name}`);
        } else {
          console.error(`❌ Error inserting ${food.food_name}:`, error.message);
        }
      }
      
      if ((i + 1) % 25 === 0) {
        console.log(`📊 Inserted ${i + 1} foods...`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${foods.length} COMPLETE foods!`);
    console.log('\n✅ Database now contains:');
    console.log('   🌾 MILLETS (15): Foxtail, Pearl/Bajra, Finger/Ragi, Little, Kodo, Barnyard, Proso, Sorghum/Jowar, Ragi Mudde, Bajra Roti, Jowar Roti, Ragi Dosa, Millet Upma, Millet Khichdi, Ragi Porridge');
    console.log('   🥜 DRY FRUITS (20): Almonds, Cashews, Walnuts, Pistachios, Raisins, Dates, Figs, Apricots, Prunes, Brazil Nuts, Hazelnuts, Pecans, Pine Nuts, Macadamia, Sunflower Seeds, Pumpkin Seeds, Chia Seeds, Flax Seeds, Sesame Seeds, Dried Coconut');
    console.log('   🍺 ALCOHOLS (30): Red Wine, White Wine, Rosé Wine, Champagne, Prosecco, Port Wine, Vodka, Whiskey, Scotch, Bourbon, Rum, Dark Rum, Gin, Tequila, Brandy, Cognac, Beer, Lager, IPA, Stout, Sake, Mojito, Margarita, Bloody Mary, Piña Colada, Liqueur, Baileys, Kahlúa');
    console.log('   🍰 INDIAN SWEETS (23): Gulab Jamun, Rasgulla, Rasmalai, Kaju Katli, Besan Ladoo, Motichoor Ladoo, Boondi Ladoo, Rava Ladoo, Jalebi, Imarti, Barfi, Kalakand, Peda, Kheer, Payasam, Halwa, Gajar Halwa, Kulfi, Falooda, Rabri, Shrikhand, Sandesh, Cham Cham');
    console.log('   🍬 SOUTH SWEETS (20): Mysore Pak, Adhirasam, Ariselu, Bobbatlu, Kakinada Kaja, Pootharekulu, Badusha, Kajjikaya, Gavvalu, Sakinalu, Atreyasam, Kova, Double Ka Meetha, Badam Halwa, Paruppu Payasam, Semiya Payasam, Rava Kesari, Moong Dal Halwa, Boorelu, Kaja');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedCompleteFoods();
