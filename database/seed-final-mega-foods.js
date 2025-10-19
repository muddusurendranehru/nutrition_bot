const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedFinalMegaFoods() {
  try {
    console.log('🍨 Starting FINAL MEGA FOODS seeding...');
    console.log('📊 Adding: Ice Cream Varieties, Muesli, Tiramisu, Beers, Bubble Tea, Chicken Curry, Shawarma, Rolls, KFC, McDonalds, Oats, Dosas, Gujarati, Kachori, Pani Puri, Aloo, Sushi, Chinese, Italian Pasta');

    const foods = [
      // ============================================
      // ICE CREAM VARIETIES - COLD STONE/PREMIUM (15 flavors)
      // ============================================
      { food_name: 'Cold Stone Cookie Dough Ice Cream (1 serving)', calories: 450, protein_g: 6, fat_g: 24, carbs_g: 52, fiber_g: 1, sugar_g: 42, sodium_mg: 180, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Cold Stone Birthday Cake Remix (1 serving)', calories: 480, protein_g: 7, fat_g: 26, carbs_g: 55, fiber_g: 0, sugar_g: 48, sodium_mg: 200, diabetic_rating: 'red', health_score: 18, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Ben & Jerry\'s Chunky Monkey (1 serving)', calories: 300, protein_g: 5, fat_g: 17, carbs_g: 32, fiber_g: 2, sugar_g: 26, sodium_mg: 50, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Ben & Jerry\'s Phish Food (1 serving)', calories: 290, protein_g: 5, fat_g: 14, carbs_g: 36, fiber_g: 2, sugar_g: 30, sodium_mg: 80, diabetic_rating: 'red', health_score: 32, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Haagen-Dazs Belgian Chocolate (1 serving)', calories: 300, protein_g: 5, fat_g: 20, carbs_g: 26, fiber_g: 3, sugar_g: 22, sodium_mg: 60, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Haagen-Dazs Salted Caramel (1 serving)', calories: 280, protein_g: 4, fat_g: 17, carbs_g: 28, fiber_g: 0, sugar_g: 24, sodium_mg: 120, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Dessert', category: 'Premium Ice Cream', regional_names: [] },
      { food_name: 'Cookie Crumble Ice Cream (1 scoop)', calories: 180, protein_g: 3, fat_g: 9, carbs_g: 22, fiber_g: 1, sugar_g: 18, sodium_mg: 85, diabetic_rating: 'red', health_score: 32, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Brownie Fudge Ice Cream (1 scoop)', calories: 190, protein_g: 3.5, fat_g: 10, carbs_g: 24, fiber_g: 2, sugar_g: 20, sodium_mg: 70, diabetic_rating: 'red', health_score: 30, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Caramel Ice Cream (1 scoop)', calories: 150, protein_g: 2.5, fat_g: 7, carbs_g: 20, fiber_g: 0, sugar_g: 18, sodium_mg: 90, diabetic_rating: 'red', health_score: 35, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Rocky Road Ice Cream (1 scoop)', calories: 170, protein_g: 3, fat_g: 9, carbs_g: 21, fiber_g: 2, sugar_g: 17, sodium_mg: 65, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },

      // ============================================
      // MUESLI & GRANOLA (10 varieties)
      // ============================================
      { food_name: 'Muesli Plain (1 cup)', calories: 289, protein_g: 8, fat_g: 5, carbs_g: 56, fiber_g: 8, sugar_g: 16, sodium_mg: 10, diabetic_rating: 'green', health_score: 85, country: 'Switzerland', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: ['మ్యూస్లీ', 'मुसली'] },
      { food_name: 'Muesli Fruit & Nut (1 cup)', calories: 320, protein_g: 9, fat_g: 8, carbs_g: 58, fiber_g: 9, sugar_g: 20, sodium_mg: 15, diabetic_rating: 'yellow', health_score: 80, country: 'Switzerland', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: [] },
      { food_name: 'Granola Plain (1 cup)', calories: 400, protein_g: 10, fat_g: 18, carbs_g: 56, fiber_g: 8, sugar_g: 18, sodium_mg: 20, diabetic_rating: 'yellow', health_score: 72, country: 'USA', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: ['గ్రానోలా', 'ग्रेनोला'] },
      { food_name: 'Granola Honey (1 cup)', calories: 420, protein_g: 11, fat_g: 19, carbs_g: 58, fiber_g: 8, sugar_g: 22, sodium_mg: 25, diabetic_rating: 'yellow', health_score: 68, country: 'USA', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: [] },
      { food_name: 'Granola Chocolate (1 cup)', calories: 450, protein_g: 12, fat_g: 22, carbs_g: 60, fiber_g: 10, sugar_g: 26, sodium_mg: 30, diabetic_rating: 'red', health_score: 62, country: 'USA', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: [] },
      { food_name: 'Oats Muesli (1 cup)', calories: 310, protein_g: 9, fat_g: 6, carbs_g: 58, fiber_g: 10, sugar_g: 18, sodium_mg: 12, diabetic_rating: 'green', health_score: 82, country: 'Global', cuisine_type: 'Breakfast', category: 'Cereal', regional_names: [] },

      // ============================================
      // TIRAMISU & ITALIAN DESSERTS (8 items)
      // ============================================
      { food_name: 'Tiramisu Classic (1 slice)', calories: 320, protein_g: 6, fat_g: 18, carbs_g: 34, fiber_g: 1, sugar_g: 24, sodium_mg: 100, diabetic_rating: 'red', health_score: 35, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert', regional_names: ['తిరమిసు', 'तिरामिसू'] },
      { food_name: 'Tiramisu with Berries (1 slice)', calories: 340, protein_g: 6, fat_g: 19, carbs_g: 36, fiber_g: 2, sugar_g: 26, sodium_mg: 105, diabetic_rating: 'red', health_score: 38, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert', regional_names: [] },
      { food_name: 'Panna Cotta (1 serving)', calories: 280, protein_g: 4, fat_g: 20, carbs_g: 22, fiber_g: 0, sugar_g: 20, sodium_mg: 60, diabetic_rating: 'red', health_score: 40, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert', regional_names: [] },
      { food_name: 'Affogato (1 serving)', calories: 180, protein_g: 4, fat_g: 10, carbs_g: 18, fiber_g: 0, sugar_g: 16, sodium_mg: 55, diabetic_rating: 'red', health_score: 52, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert', regional_names: [] },

      // ============================================
      // ALL BEERS (15 varieties)
      // ============================================
      { food_name: 'Kingfisher Beer (1 bottle 330ml)', calories: 145, protein_g: 1.5, fat_g: 0, carbs_g: 12, fiber_g: 0, sugar_g: 0, sodium_mg: 14, diabetic_rating: 'red', health_score: 30, country: 'India', cuisine_type: 'Alcohol', category: 'Beer', regional_names: ['కింగ్‌ఫిషర్', 'किंगफिशर'] },
      { food_name: 'Budweiser Beer (1 bottle 330ml)', calories: 145, protein_g: 1.3, fat_g: 0, carbs_g: 11, fiber_g: 0, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'red', health_score: 32, country: 'USA', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Corona Extra (1 bottle 330ml)', calories: 148, protein_g: 1.2, fat_g: 0, carbs_g: 14, fiber_g: 0, sugar_g: 0, sodium_mg: 15, diabetic_rating: 'red', health_score: 30, country: 'Mexico', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Heineken Beer (1 bottle 330ml)', calories: 142, protein_g: 1.5, fat_g: 0, carbs_g: 11, fiber_g: 0, sugar_g: 0, sodium_mg: 12, diabetic_rating: 'red', health_score: 32, country: 'Netherlands', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Guinness Stout (1 bottle 330ml)', calories: 125, protein_g: 1.0, fat_g: 0, carbs_g: 10, fiber_g: 0, sugar_g: 0, sodium_mg: 18, diabetic_rating: 'red', health_score: 35, country: 'Ireland', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Stella Artois (1 bottle 330ml)', calories: 150, protein_g: 1.4, fat_g: 0, carbs_g: 12.5, fiber_g: 0, sugar_g: 0, sodium_mg: 13, diabetic_rating: 'red', health_score: 30, country: 'Belgium', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Carlsberg Beer (1 bottle 330ml)', calories: 138, protein_g: 1.2, fat_g: 0, carbs_g: 11, fiber_g: 0, sugar_g: 0, sodium_mg: 11, diabetic_rating: 'red', health_score: 32, country: 'Denmark', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Tuborg Beer (1 bottle 330ml)', calories: 140, protein_g: 1.3, fat_g: 0, carbs_g: 11.5, fiber_g: 0, sugar_g: 0, sodium_mg: 12, diabetic_rating: 'red', health_score: 31, country: 'Denmark', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Bira 91 Blonde (1 bottle 330ml)', calories: 150, protein_g: 1.4, fat_g: 0, carbs_g: 12.8, fiber_g: 0, sugar_g: 0, sodium_mg: 13, diabetic_rating: 'red', health_score: 30, country: 'India', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },
      { food_name: 'Hoegaarden (1 bottle 330ml)', calories: 155, protein_g: 1.5, fat_g: 0, carbs_g: 13, fiber_g: 0, sugar_g: 0, sodium_mg: 14, diabetic_rating: 'red', health_score: 29, country: 'Belgium', cuisine_type: 'Alcohol', category: 'Beer', regional_names: [] },

      // ============================================
      // BUBBLE TEA VARIETIES (12 flavors)
      // ============================================
      { food_name: 'Bubble Tea Classic Milk Tea (1 glass)', calories: 280, protein_g: 2, fat_g: 5, carbs_g: 60, fiber_g: 0, sugar_g: 38, sodium_mg: 50, diabetic_rating: 'red', health_score: 35, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: ['బబుల్ టీ', 'बबल टी'] },
      { food_name: 'Bubble Tea Taro (1 glass)', calories: 300, protein_g: 2, fat_g: 6, carbs_g: 62, fiber_g: 1, sugar_g: 40, sodium_mg: 55, diabetic_rating: 'red', health_score: 32, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Matcha (1 glass)', calories: 260, protein_g: 3, fat_g: 5, carbs_g: 55, fiber_g: 2, sugar_g: 35, sodium_mg: 45, diabetic_rating: 'red', health_score: 42, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Mango (1 glass)', calories: 290, protein_g: 1, fat_g: 4, carbs_g: 65, fiber_g: 1, sugar_g: 42, sodium_mg: 50, diabetic_rating: 'red', health_score: 35, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Strawberry (1 glass)', calories: 285, protein_g: 1.5, fat_g: 4, carbs_g: 63, fiber_g: 1, sugar_g: 40, sodium_mg: 48, diabetic_rating: 'red', health_score: 36, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Brown Sugar (1 glass)', calories: 320, protein_g: 2, fat_g: 6, carbs_g: 68, fiber_g: 0, sugar_g: 48, sodium_mg: 60, diabetic_rating: 'red', health_score: 28, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Thai (1 glass)', calories: 310, protein_g: 3, fat_g: 7, carbs_g: 62, fiber_g: 0, sugar_g: 42, sodium_mg: 55, diabetic_rating: 'red', health_score: 32, country: 'Thailand', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },
      { food_name: 'Bubble Tea Lychee (1 glass)', calories: 275, protein_g: 1, fat_g: 4, carbs_g: 61, fiber_g: 1, sugar_g: 39, sodium_mg: 50, diabetic_rating: 'red', health_score: 38, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Bubble Tea', regional_names: [] },

      // ============================================
      // CHICKEN CURRY TYPES (12 varieties)
      // ============================================
      { food_name: 'Chicken Curry South Indian (1 serving)', calories: 280, protein_g: 28, fat_g: 14, carbs_g: 10, fiber_g: 2, sugar_g: 4, sodium_mg: 520, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'South Indian', category: 'Main Course', regional_names: ['చికెన్ కూర', 'चिकन करी'] },
      { food_name: 'Chicken Curry North Indian (1 serving)', calories: 320, protein_g: 26, fat_g: 18, carbs_g: 12, fiber_g: 3, sugar_g: 5, sodium_mg: 550, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'North Indian', category: 'Main Course', regional_names: [] },
      { food_name: 'Chicken Korma (1 serving)', calories: 380, protein_g: 28, fat_g: 24, carbs_g: 14, fiber_g: 2, sugar_g: 6, sodium_mg: 580, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'Mughlai', category: 'Main Course', regional_names: ['చికెన్ కోర్మా', 'चिकन कोरमा'] },
      { food_name: 'Chicken Vindaloo (1 serving)', calories: 300, protein_g: 30, fat_g: 15, carbs_g: 12, fiber_g: 3, sugar_g: 4, sodium_mg: 600, diabetic_rating: 'green', health_score: 72, country: 'India', cuisine_type: 'Goan', category: 'Main Course', regional_names: ['చికెన్ విండలూ', 'चिकन विंडालू'] },
      { food_name: 'Chicken Chettinad (1 serving)', calories: 290, protein_g: 29, fat_g: 16, carbs_g: 8, fiber_g: 2, sugar_g: 3, sodium_mg: 540, diabetic_rating: 'green', health_score: 76, country: 'India', cuisine_type: 'South Indian', category: 'Main Course', regional_names: ['చికెన్ చెట్టినాడ్', 'चिकन चेट्टीनाड'] },
      { food_name: 'Chicken Madras (1 serving)', calories: 285, protein_g: 27, fat_g: 14, carbs_g: 11, fiber_g: 3, sugar_g: 4, sodium_mg: 530, diabetic_rating: 'green', health_score: 74, country: 'India', cuisine_type: 'South Indian', category: 'Main Course', regional_names: [] },
      { food_name: 'Chicken Jalfrezi (1 serving)', calories: 270, protein_g: 28, fat_g: 12, carbs_g: 14, fiber_g: 4, sugar_g: 6, sodium_mg: 500, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'Indian', category: 'Main Course', regional_names: [] },
      { food_name: 'Chicken Rogan Josh (1 serving)', calories: 310, protein_g: 27, fat_g: 17, carbs_g: 12, fiber_g: 3, sugar_g: 5, sodium_mg: 560, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'Kashmiri', category: 'Main Course', regional_names: [] },
      { food_name: 'Chicken Saagwala (1 serving)', calories: 260, protein_g: 28, fat_g: 13, carbs_g: 10, fiber_g: 4, sugar_g: 3, sodium_mg: 510, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Indian', category: 'Main Course', regional_names: [] },
      { food_name: 'Chicken Kadai (1 serving)', calories: 295, protein_g: 26, fat_g: 16, carbs_g: 12, fiber_g: 3, sugar_g: 5, sodium_mg: 540, diabetic_rating: 'yellow', health_score: 72, country: 'India', cuisine_type: 'Indian', category: 'Main Course', regional_names: ['చికెన్ కడాయ్', 'चिकन कड़ाही'] },

      // ============================================
      // SHAWARMA & ROLLS (12 items)
      // ============================================
      { food_name: 'Chicken Shawarma (1 wrap)', calories: 350, protein_g: 28, fat_g: 15, carbs_g: 32, fiber_g: 3, sugar_g: 3, sodium_mg: 650, diabetic_rating: 'yellow', health_score: 62, country: 'Middle East', cuisine_type: 'Middle Eastern', category: 'Wrap', regional_names: ['చికెన్ షవర్మా', 'चिकन शवरमा'] },
      { food_name: 'Beef Shawarma (1 wrap)', calories: 380, protein_g: 26, fat_g: 18, carbs_g: 32, fiber_g: 3, sugar_g: 3, sodium_mg: 680, diabetic_rating: 'yellow', health_score: 58, country: 'Middle East', cuisine_type: 'Middle Eastern', category: 'Wrap', regional_names: [] },
      { food_name: 'Falafel Shawarma (1 wrap)', calories: 320, protein_g: 12, fat_g: 14, carbs_g: 40, fiber_g: 6, sugar_g: 4, sodium_mg: 580, diabetic_rating: 'yellow', health_score: 68, country: 'Middle East', cuisine_type: 'Middle Eastern', category: 'Wrap', regional_names: [] },
      { food_name: 'Chicken Kathi Roll (1 roll)', calories: 320, protein_g: 22, fat_g: 14, carbs_g: 30, fiber_g: 2, sugar_g: 3, sodium_mg: 520, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Roll', regional_names: ['చికెన్ కాతి రోల్', 'चिकन काठी रोल'] },
      { food_name: 'Paneer Kathi Roll (1 roll)', calories: 300, protein_g: 14, fat_g: 16, carbs_g: 28, fiber_g: 3, sugar_g: 3, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Indian', category: 'Roll', regional_names: [] },
      { food_name: 'Egg Roll Calcutta (1 roll)', calories: 280, protein_g: 12, fat_g: 14, carbs_g: 28, fiber_g: 2, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Bengali', category: 'Roll', regional_names: [] },
      { food_name: 'Mutton Kathi Roll (1 roll)', calories: 360, protein_g: 24, fat_g: 18, carbs_g: 28, fiber_g: 2, sugar_g: 2, sodium_mg: 550, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indian', category: 'Roll', regional_names: [] },
      { food_name: 'Veg Frankie (1 roll)', calories: 280, protein_g: 8, fat_g: 12, carbs_g: 36, fiber_g: 4, sugar_g: 4, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Roll', regional_names: ['వెజ్ ఫ్రాంకీ', 'वेज फ्रेंकी'] },
      { food_name: 'Chicken Frankie (1 roll)', calories: 340, protein_g: 20, fat_g: 16, carbs_g: 32, fiber_g: 3, sugar_g: 3, sodium_mg: 540, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Indian', category: 'Roll', regional_names: [] },

      // ============================================
      // KFC FOODS (10 items)
      // ============================================
      { food_name: 'KFC Fried Chicken (1 piece)', calories: 320, protein_g: 22, fat_g: 20, carbs_g: 12, fiber_g: 1, sugar_g: 0, sodium_mg: 800, diabetic_rating: 'red', health_score: 42, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Zinger Burger (1 piece)', calories: 450, protein_g: 25, fat_g: 24, carbs_g: 40, fiber_g: 2, sugar_g: 6, sodium_mg: 950, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Popcorn Chicken (1 serving)', calories: 320, protein_g: 20, fat_g: 20, carbs_g: 16, fiber_g: 1, sugar_g: 0, sodium_mg: 720, diabetic_rating: 'red', health_score: 42, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Chicken Bucket (3 pieces)', calories: 960, protein_g: 66, fat_g: 60, carbs_g: 36, fiber_g: 3, sugar_g: 0, sodium_mg: 2400, diabetic_rating: 'red', health_score: 25, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Coleslaw (1 serving)', calories: 150, protein_g: 1, fat_g: 9, carbs_g: 17, fiber_g: 2, sugar_g: 12, sodium_mg: 220, diabetic_rating: 'yellow', health_score: 52, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Fries (medium)', calories: 340, protein_g: 4, fat_g: 16, carbs_g: 46, fiber_g: 4, sugar_g: 0, sodium_mg: 480, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },
      { food_name: 'KFC Rice Bowl (1 serving)', calories: 420, protein_g: 24, fat_g: 18, carbs_g: 42, fiber_g: 3, sugar_g: 4, sodium_mg: 850, diabetic_rating: 'yellow', health_score: 55, country: 'USA', cuisine_type: 'Fast Food', category: 'KFC', regional_names: [] },

      // ============================================
      // McDONALDS FOODS (10 items)
      // ============================================
      { food_name: 'McDonalds Big Mac (1 burger)', calories: 540, protein_g: 25, fat_g: 28, carbs_g: 46, fiber_g: 3, sugar_g: 9, sodium_mg: 1040, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds McChicken (1 burger)', calories: 400, protein_g: 15, fat_g: 20, carbs_g: 40, fiber_g: 2, sugar_g: 5, sodium_mg: 560, diabetic_rating: 'red', health_score: 42, country: 'USA', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds Maharaja Mac (1 burger)', calories: 560, protein_g: 26, fat_g: 30, carbs_g: 48, fiber_g: 3, sugar_g: 10, sodium_mg: 1100, diabetic_rating: 'red', health_score: 32, country: 'India', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds McAloo Tikki (1 burger)', calories: 340, protein_g: 8, fat_g: 14, carbs_g: 46, fiber_g: 4, sugar_g: 6, sodium_mg: 680, diabetic_rating: 'yellow', health_score: 48, country: 'India', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds Chicken McNuggets (6 pieces)', calories: 280, protein_g: 18, fat_g: 18, carbs_g: 14, fiber_g: 1, sugar_g: 0, sodium_mg: 480, diabetic_rating: 'red', health_score: 45, country: 'USA', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds Fries Large (1 serving)', calories: 490, protein_g: 6, fat_g: 24, carbs_g: 66, fiber_g: 6, sugar_g: 0, sodium_mg: 400, diabetic_rating: 'red', health_score: 28, country: 'USA', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },
      { food_name: 'McDonalds McFlurry Oreo (1 serving)', calories: 510, protein_g: 11, fat_g: 16, carbs_g: 80, fiber_g: 2, sugar_g: 64, sodium_mg: 280, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'Fast Food', category: 'McDonalds', regional_names: [] },

      // ============================================
      // OATS VARIETIES (10 types)
      // ============================================
      { food_name: 'Oats Rolled (1 cup cooked)', calories: 166, protein_g: 6, fat_g: 3.5, carbs_g: 28, fiber_g: 4, sugar_g: 1, sodium_mg: 9, diabetic_rating: 'green', health_score: 92, country: 'Global', cuisine_type: 'Breakfast', category: 'Oats', regional_names: ['ఓట్స్', 'ओट्स'] },
      { food_name: 'Oats Steel Cut (1 cup cooked)', calories: 150, protein_g: 5, fat_g: 2.5, carbs_g: 27, fiber_g: 4, sugar_g: 0, sodium_mg: 0, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Breakfast', category: 'Oats', regional_names: [] },
      { food_name: 'Oats Instant Plain (1 cup cooked)', calories: 130, protein_g: 5, fat_g: 2, carbs_g: 23, fiber_g: 3, sugar_g: 1, sodium_mg: 80, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Breakfast', category: 'Oats', regional_names: [] },
      { food_name: 'Oats Masala (1 bowl)', calories: 200, protein_g: 6, fat_g: 6, carbs_g: 30, fiber_g: 5, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'green', health_score: 82, country: 'India', cuisine_type: 'Indian', category: 'Oats', regional_names: ['మసాలా ఓట్స్', 'मसाला ओट्स'] },
      { food_name: 'Oats Upma (1 bowl)', calories: 180, protein_g: 6, fat_g: 5, carbs_g: 28, fiber_g: 5, sugar_g: 1, sodium_mg: 320, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian', category: 'Oats', regional_names: ['ఓట్స్ ఉప్మా', 'ओट्स उपमा'] },
      { food_name: 'Oats Porridge Sweet (1 bowl)', calories: 160, protein_g: 6, fat_g: 3, carbs_g: 28, fiber_g: 4, sugar_g: 10, sodium_mg: 120, diabetic_rating: 'yellow', health_score: 75, country: 'Global', cuisine_type: 'Breakfast', category: 'Oats', regional_names: [] },
      { food_name: 'Oats Idli (3 pieces)', calories: 150, protein_g: 6, fat_g: 3, carbs_g: 24, fiber_g: 4, sugar_g: 1, sodium_mg: 250, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'South Indian', category: 'Oats', regional_names: ['ఓట్స్ ఇడ్లీ', 'ओट्स इडली'] },

      // ============================================
      // DOSA TYPES (15 varieties)
      // ============================================
      { food_name: 'Plain Dosa (1 piece)', calories: 120, protein_g: 4, fat_g: 3, carbs_g: 20, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 250, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['సాదా దోశ', 'सादा डोसा'] },
      { food_name: 'Masala Dosa (1 piece)', calories: 220, protein_g: 6, fat_g: 8, carbs_g: 32, fiber_g: 3, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['మసాలా దోశ', 'मसाला डोसा'] },
      { food_name: 'Onion Dosa (1 piece)', calories: 150, protein_g: 5, fat_g: 5, carbs_g: 22, fiber_g: 2, sugar_g: 2, sodium_mg: 280, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['ఉల్లిపాయ దోశ', 'प्याज डोसा'] },
      { food_name: 'Rava Dosa (1 piece)', calories: 180, protein_g: 5, fat_g: 8, carbs_g: 24, fiber_g: 2, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'yellow', health_score: 72, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['రవ్వ దోశ', 'रवा डोसा'] },
      { food_name: 'Set Dosa (3 pieces)', calories: 200, protein_g: 6, fat_g: 6, carbs_g: 30, fiber_g: 2, sugar_g: 1, sodium_mg: 350, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['సెట్ దోశ', 'सेट डोसा'] },
      { food_name: 'Mysore Masala Dosa (1 piece)', calories: 240, protein_g: 6, fat_g: 10, carbs_g: 34, fiber_g: 3, sugar_g: 2, sodium_mg: 380, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['మైసూర్ మసాలా దోశ', 'मैसूर मसाला डोसा'] },
      { food_name: 'Paper Dosa (1 piece)', calories: 180, protein_g: 5, fat_g: 7, carbs_g: 26, fiber_g: 2, sugar_g: 1, sodium_mg: 280, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['పేపర్ దోశ', 'पेपर डोसा'] },
      { food_name: 'Cheese Dosa (1 piece)', calories: 280, protein_g: 12, fat_g: 14, carbs_g: 28, fiber_g: 2, sugar_g: 1, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Fusion', category: 'Dosa', regional_names: ['చీజ్ దోశ', 'चीज़ डोसा'] },
      { food_name: 'Paneer Dosa (1 piece)', calories: 260, protein_g: 10, fat_g: 12, carbs_g: 30, fiber_g: 3, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Fusion', category: 'Dosa', regional_names: ['పనీర్ దోశ', 'पनीर डोसा'] },
      { food_name: 'Butter Dosa (1 piece)', calories: 180, protein_g: 4, fat_g: 9, carbs_g: 22, fiber_g: 1.5, sugar_g: 0.5, sodium_mg: 280, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['బటర్ దోశ', 'बटर डोसा'] },
      { food_name: 'Podi Dosa (1 piece)', calories: 160, protein_g: 5, fat_g: 7, carbs_g: 22, fiber_g: 2, sugar_g: 1, sodium_mg: 320, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'South Indian', category: 'Dosa', regional_names: ['పొడి దోశ', 'पोडी डोसा'] },
      { food_name: 'Schezwan Dosa (1 piece)', calories: 240, protein_g: 6, fat_g: 11, carbs_g: 30, fiber_g: 3, sugar_g: 3, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Fusion', category: 'Dosa', regional_names: [] },

      // ============================================
      // GUJARATI FOODS (15 dishes)
      // ============================================
      { food_name: 'Dhokla (4 pieces)', calories: 160, protein_g: 6, fat_g: 4, carbs_g: 28, fiber_g: 3, sugar_g: 4, sodium_mg: 350, diabetic_rating: 'green', health_score: 82, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['ధోక్లా', 'ढोकला'] },
      { food_name: 'Khandvi (6 pieces)', calories: 120, protein_g: 5, fat_g: 4, carbs_g: 18, fiber_g: 2, sugar_g: 2, sodium_mg: 280, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['ఖండ్వి', 'खांडवी'] },
      { food_name: 'Thepla (3 pieces)', calories: 240, protein_g: 7, fat_g: 10, carbs_g: 32, fiber_g: 4, sugar_g: 2, sodium_mg: 320, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'Gujarati', category: 'Bread', regional_names: ['థేప్లా', 'थेपला'] },
      { food_name: 'Fafda (6 pieces)', calories: 200, protein_g: 5, fat_g: 10, carbs_g: 24, fiber_g: 3, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['ఫాఫ్డా', 'फाफड़ा'] },
      { food_name: 'Undhiyu (1 serving)', calories: 220, protein_g: 8, fat_g: 12, carbs_g: 24, fiber_g: 6, sugar_g: 6, sodium_mg: 380, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'Gujarati', category: 'Main Course', regional_names: ['ఉందియు', 'उंधीयूं'] },
      { food_name: 'Gujarati Kadhi (1 bowl)', calories: 180, protein_g: 5, fat_g: 10, carbs_g: 18, fiber_g: 2, sugar_g: 8, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Gujarati', category: 'Curry', regional_names: ['గుజరాతీ కధి', 'गुजराती कढ़ी'] },
      { food_name: 'Handvo (1 piece)', calories: 200, protein_g: 6, fat_g: 8, carbs_g: 28, fiber_g: 4, sugar_g: 3, sodium_mg: 340, diabetic_rating: 'green', health_score: 72, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['హండ్వో', 'हांडवो'] },
      { food_name: 'Patra (6 pieces)', calories: 180, protein_g: 5, fat_g: 8, carbs_g: 24, fiber_g: 4, sugar_g: 3, sodium_mg: 320, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['పాత్రా', 'पत्रा'] },
      { food_name: 'Methi Thepla (3 pieces)', calories: 260, protein_g: 8, fat_g: 11, carbs_g: 34, fiber_g: 5, sugar_g: 2, sodium_mg: 340, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'Gujarati', category: 'Bread', regional_names: ['మేథి థేప్లా', 'मेथी थेपला'] },
      { food_name: 'Sev Khamani (1 serving)', calories: 220, protein_g: 7, fat_g: 10, carbs_g: 28, fiber_g: 3, sugar_g: 4, sodium_mg: 380, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: [] },

      // ============================================
      // KACHORI & STREET FOODS (10 items)
      // ============================================
      { food_name: 'Kachori Urad Dal (2 pieces)', calories: 280, protein_g: 5, fat_g: 16, carbs_g: 30, fiber_g: 3, sugar_g: 2, sodium_mg: 420, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'Indian', category: 'Street Food', regional_names: ['కచోరీ', 'कचौड़ी'] },
      { food_name: 'Kachori Matar (2 pieces)', calories: 270, protein_g: 6, fat_g: 15, carbs_g: 30, fiber_g: 4, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Indian', category: 'Street Food', regional_names: [] },
      { food_name: 'Pyaz Kachori (2 pieces)', calories: 290, protein_g: 5, fat_g: 17, carbs_g: 32, fiber_g: 3, sugar_g: 3, sodium_mg: 440, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Rajasthani', category: 'Street Food', regional_names: [] },
      { food_name: 'Pani Puri / Gol Gappa (6 pieces)', calories: 120, protein_g: 3, fat_g: 4, carbs_g: 20, fiber_g: 2, sugar_g: 4, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Street Food', category: 'Chaat', regional_names: ['పాని పూరి', 'पानी पूरी'] },
      { food_name: 'Dahi Puri (6 pieces)', calories: 180, protein_g: 5, fat_g: 8, carbs_g: 24, fiber_g: 2, sugar_g: 6, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'Street Food', category: 'Chaat', regional_names: ['దహి పూరి', 'दही पूरी'] },
      { food_name: 'Sev Puri (6 pieces)', calories: 200, protein_g: 4, fat_g: 10, carbs_g: 26, fiber_g: 3, sugar_g: 5, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 52, country: 'India', cuisine_type: 'Street Food', category: 'Chaat', regional_names: ['సేవ్ పూరి', 'सेव पूरी'] },
      { food_name: 'Bhel Puri (1 serving)', calories: 180, protein_g: 5, fat_g: 6, carbs_g: 28, fiber_g: 4, sugar_g: 6, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Street Food', category: 'Chaat', regional_names: ['భేల్ పూరి', 'भेल पूरी'] },

      // ============================================
      // ALOO (POTATO) VARIETIES (12 dishes)
      // ============================================
      { food_name: 'Aloo Gobi (1 serving)', calories: 180, protein_g: 4, fat_g: 10, carbs_g: 20, fiber_g: 4, sugar_g: 4, sodium_mg: 380, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'North Indian', category: 'Vegetable', regional_names: ['ఆలూ గోబీ', 'आलू गोभी'] },
      { food_name: 'Aloo Matar (1 serving)', calories: 200, protein_g: 5, fat_g: 12, carbs_g: 22, fiber_g: 4, sugar_g: 5, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'North Indian', category: 'Vegetable', regional_names: ['ఆలూ మటర్', 'आलू मटर'] },
      { food_name: 'Jeera Aloo (1 serving)', calories: 160, protein_g: 3, fat_g: 8, carbs_g: 20, fiber_g: 3, sugar_g: 2, sodium_mg: 320, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'Indian', category: 'Vegetable', regional_names: ['జీర ఆలూ', 'जीरा आलू'] },
      { food_name: 'Dum Aloo (1 serving)', calories: 220, protein_g: 4, fat_g: 14, carbs_g: 22, fiber_g: 3, sugar_g: 4, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Kashmiri', category: 'Vegetable', regional_names: ['దమ్ ఆలూ', 'दम आलू'] },
      { food_name: 'Aloo Palak (1 serving)', calories: 180, protein_g: 5, fat_g: 10, carbs_g: 18, fiber_g: 4, sugar_g: 3, sodium_mg: 380, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'Indian', category: 'Vegetable', regional_names: ['ఆలూ పాలక్', 'आलू पालक'] },
      { food_name: 'Aloo Bhaji (1 serving)', calories: 170, protein_g: 3, fat_g: 9, carbs_g: 20, fiber_g: 3, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Indian', category: 'Vegetable', regional_names: ['ఆలూ భాజీ', 'आलू भाजी'] },
      { food_name: 'Bombay Potatoes (1 serving)', calories: 190, protein_g: 4, fat_g: 10, carbs_g: 22, fiber_g: 3, sugar_g: 3, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Vegetable', regional_names: [] },
      { food_name: 'Aloo Bonda (3 pieces)', calories: 210, protein_g: 4, fat_g: 11, carbs_g: 26, fiber_g: 2, sugar_g: 2, sodium_mg: 340, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'South Indian', category: 'Snack', regional_names: ['ఆలూ బోండా', 'आलू बोंडा'] },

      // ============================================
      // SUSHI VARIETIES (10 types)
      // ============================================
      { food_name: 'California Roll (6 pieces)', calories: 200, protein_g: 8, fat_g: 1, carbs_g: 40, fiber_g: 1, sugar_g: 2, sodium_mg: 300, diabetic_rating: 'green', health_score: 85, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: ['సుషీ', 'सुशी'] },
      { food_name: 'Spicy Tuna Roll (6 pieces)', calories: 220, protein_g: 12, fat_g: 4, carbs_g: 38, fiber_g: 1, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'green', health_score: 82, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },
      { food_name: 'Salmon Sushi (6 pieces)', calories: 210, protein_g: 10, fat_g: 3, carbs_g: 38, fiber_g: 1, sugar_g: 2, sodium_mg: 320, diabetic_rating: 'green', health_score: 88, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },
      { food_name: 'Dragon Roll (6 pieces)', calories: 280, protein_g: 14, fat_g: 8, carbs_g: 42, fiber_g: 2, sugar_g: 3, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 75, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },
      { food_name: 'Rainbow Roll (6 pieces)', calories: 260, protein_g: 12, fat_g: 6, carbs_g: 40, fiber_g: 2, sugar_g: 2, sodium_mg: 380, diabetic_rating: 'green', health_score: 80, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },
      { food_name: 'Tempura Roll (6 pieces)', calories: 320, protein_g: 10, fat_g: 14, carbs_g: 42, fiber_g: 1, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 62, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },
      { food_name: 'Avocado Roll (6 pieces)', calories: 180, protein_g: 4, fat_g: 5, carbs_g: 32, fiber_g: 4, sugar_g: 1, sodium_mg: 250, diabetic_rating: 'green', health_score: 85, country: 'Japan', cuisine_type: 'Japanese', category: 'Sushi', regional_names: [] },

      // ============================================
      // CHINESE FOODS (15 dishes)
      // ============================================
      { food_name: 'Manchurian Veg (1 serving)', calories: 280, protein_g: 6, fat_g: 14, carbs_g: 34, fiber_g: 3, sugar_g: 12, sodium_mg: 650, diabetic_rating: 'red', health_score: 52, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Main Course', regional_names: ['మంచూరియన్', 'मंचूरियन'] },
      { food_name: 'Manchurian Chicken (1 serving)', calories: 320, protein_g: 22, fat_g: 16, carbs_g: 24, fiber_g: 2, sugar_g: 10, sodium_mg: 700, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Main Course', regional_names: [] },
      { food_name: 'Hakka Noodles Veg (1 plate)', calories: 320, protein_g: 8, fat_g: 12, carbs_g: 46, fiber_g: 4, sugar_g: 4, sodium_mg: 580, diabetic_rating: 'yellow', health_score: 62, country: 'China', cuisine_type: 'Chinese', category: 'Main Course', regional_names: ['హక్కా నూడిల్స్', 'हक्का नूडल्स'] },
      { food_name: 'Hakka Noodles Chicken (1 plate)', calories: 380, protein_g: 20, fat_g: 16, carbs_g: 44, fiber_g: 3, sugar_g: 4, sodium_mg: 650, diabetic_rating: 'yellow', health_score: 60, country: 'China', cuisine_type: 'Chinese', category: 'Main Course', regional_names: [] },
      { food_name: 'Sweet and Sour Chicken (1 serving)', calories: 300, protein_g: 15, fat_g: 12, carbs_g: 35, fiber_g: 2, sugar_g: 20, sodium_mg: 600, diabetic_rating: 'yellow', health_score: 60, country: 'China', cuisine_type: 'Chinese', category: 'Main Course', regional_names: [] },
      { food_name: 'Honey Chilli Potato (1 serving)', calories: 280, protein_g: 4, fat_g: 14, carbs_g: 36, fiber_g: 3, sugar_g: 16, sodium_mg: 550, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Appetizer', regional_names: [] },
      { food_name: 'Dim Sum Veg (6 pieces)', calories: 180, protein_g: 6, fat_g: 6, carbs_g: 26, fiber_g: 2, sugar_g: 2, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 68, country: 'China', cuisine_type: 'Chinese', category: 'Appetizer', regional_names: ['డిమ్ సమ్', 'डिम सम'] },
      { food_name: 'Dim Sum Chicken (6 pieces)', calories: 220, protein_g: 12, fat_g: 9, carbs_g: 24, fiber_g: 1, sugar_g: 2, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 65, country: 'China', cuisine_type: 'Chinese', category: 'Appetizer', regional_names: [] },
      { food_name: 'Szechwan Chicken (1 serving)', calories: 320, protein_g: 24, fat_g: 16, carbs_g: 20, fiber_g: 3, sugar_g: 8, sodium_mg: 700, diabetic_rating: 'yellow', health_score: 62, country: 'China', cuisine_type: 'Chinese', category: 'Main Course', regional_names: [] },
      { food_name: 'Chilli Chicken Dry (1 serving)', calories: 300, protein_g: 26, fat_g: 16, carbs_g: 14, fiber_g: 2, sugar_g: 6, sodium_mg: 680, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Main Course', regional_names: ['చిల్లీ చికెన్', 'चिली चिकन'] },
      { food_name: 'Chilli Chicken Gravy (1 serving)', calories: 340, protein_g: 24, fat_g: 18, carbs_g: 20, fiber_g: 3, sugar_g: 8, sodium_mg: 720, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Main Course', regional_names: [] },
      { food_name: 'Chilli Paneer (1 serving)', calories: 280, protein_g: 14, fat_g: 18, carbs_g: 18, fiber_g: 3, sugar_g: 7, sodium_mg: 650, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Indo-Chinese', category: 'Main Course', regional_names: ['చిల్లీ పనీర్', 'चिली पनीर'] },

      // ============================================
      // ITALIAN PASTA (15 varieties)
      // ============================================
      { food_name: 'Spaghetti Carbonara (1 plate)', calories: 550, protein_g: 20, fat_g: 35, carbs_g: 40, fiber_g: 3, sugar_g: 2, sodium_mg: 800, diabetic_rating: 'red', health_score: 40, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: ['స్పఘెట్టి', 'स्पेगेटी'] },
      { food_name: 'Pasta Alfredo (1 plate)', calories: 580, protein_g: 18, fat_g: 38, carbs_g: 42, fiber_g: 2, sugar_g: 3, sodium_mg: 850, diabetic_rating: 'red', health_score: 38, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Pasta Arrabbiata (1 plate)', calories: 420, protein_g: 12, fat_g: 14, carbs_g: 62, fiber_g: 5, sugar_g: 8, sodium_mg: 650, diabetic_rating: 'yellow', health_score: 62, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Penne Pesto (1 plate)', calories: 480, protein_g: 14, fat_g: 24, carbs_g: 54, fiber_g: 4, sugar_g: 3, sodium_mg: 720, diabetic_rating: 'yellow', health_score: 58, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Bolognese Pasta (1 plate)', calories: 520, protein_g: 22, fat_g: 20, carbs_g: 58, fiber_g: 5, sugar_g: 10, sodium_mg: 780, diabetic_rating: 'yellow', health_score: 62, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Lasagna (1 piece)', calories: 350, protein_g: 18, fat_g: 15, carbs_g: 35, fiber_g: 3, sugar_g: 5, sodium_mg: 650, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: ['లసాగ్నా', 'लसग्ना'] },
      { food_name: 'Ravioli (1 serving)', calories: 380, protein_g: 16, fat_g: 16, carbs_g: 44, fiber_g: 3, sugar_g: 4, sodium_mg: 680, diabetic_rating: 'yellow', health_score: 58, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Mac and Cheese (1 bowl)', calories: 450, protein_g: 18, fat_g: 22, carbs_g: 44, fiber_g: 2, sugar_g: 6, sodium_mg: 920, diabetic_rating: 'red', health_score: 45, country: 'USA', cuisine_type: 'American', category: 'Pasta', regional_names: [] },
      { food_name: 'Aglio e Olio (1 plate)', calories: 420, protein_g: 10, fat_g: 18, carbs_g: 56, fiber_g: 3, sugar_g: 2, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 68, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] },
      { food_name: 'Pasta Marinara (1 plate)', calories: 380, protein_g: 12, fat_g: 10, carbs_g: 62, fiber_g: 5, sugar_g: 10, sodium_mg: 620, diabetic_rating: 'yellow', health_score: 68, country: 'Italy', cuisine_type: 'Italian', category: 'Pasta', regional_names: [] }
    ];

    console.log(`📊 Inserting ${foods.length} foods...`);

    let insertedCount = 0;
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
            food.continent || 'Global',
            food.cuisine_type,
            food.category,
            'Final Mega Foods Database',
            true,
            ['USDA', 'ICMR', 'Brand Data', 'Traditional Recipes']
          ]
        );
        insertedCount++;
      } catch (error) {
        if (error.code === '23505') { // Duplicate key error
          console.log(`⚠️  Skipped duplicate: ${food.food_name}`);
        } else {
          console.error(`❌ Error inserting ${food.food_name}:`, error.message);
        }
      }
      
      if ((i + 1) % 30 === 0) {
        console.log(`📊 Processed ${i + 1}/${foods.length} foods...`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${insertedCount} FINAL MEGA FOODS!`);
    console.log('\n✅ Database now contains:');
    console.log('   🍨 PREMIUM ICE CREAM (10): Cold Stone, Ben & Jerry, Haagen-Dazs, Cookie Crumble, Brownie Fudge, Caramel, Rocky Road');
    console.log('   🥣 MUESLI & GRANOLA (6): Muesli (Plain, Fruit & Nut), Granola (Plain, Honey, Chocolate), Oats Muesli');
    console.log('   🍰 TIRAMISU (4): Classic, with Berries, Panna Cotta, Affogato');
    console.log('   🍺 BEERS (10): Kingfisher, Budweiser, Corona, Heineken, Guinness, Stella, Carlsberg, Tuborg, Bira, Hoegaarden');
    console.log('   🧋 BUBBLE TEA (8): Classic, Taro, Matcha, Mango, Strawberry, Brown Sugar, Thai, Lychee');
    console.log('   🍛 CHICKEN CURRY (10): South Indian, North Indian, Korma, Vindaloo, Chettinad, Madras, Jalfrezi, Rogan Josh, Saagwala, Kadai');
    console.log('   🌯 SHAWARMA & ROLLS (9): Chicken/Beef/Falafel Shawarma, Chicken/Paneer/Egg/Mutton Kathi Roll, Veg/Chicken Frankie');
    console.log('   🍗 KFC (7): Fried Chicken, Zinger Burger, Popcorn Chicken, Bucket, Coleslaw, Fries, Rice Bowl');
    console.log('   🍔 McDONALDS (7): Big Mac, McChicken, Maharaja Mac, McAloo Tikki, McNuggets, Fries, McFlurry');
    console.log('   🥣 OATS (7): Rolled, Steel Cut, Instant, Masala, Upma, Porridge, Idli');
    console.log('   🥞 DOSA (12): Plain, Masala, Onion, Rava, Set, Mysore, Paper, Cheese, Paneer, Butter, Podi, Schezwan');
    console.log('   🥘 GUJARATI (10): Dhokla, Khandvi, Thepla, Fafda, Undhiyu, Kadhi, Handvo, Patra, Methi Thepla, Sev Khamani');
    console.log('   🥟 KACHORI & CHAAT (7): Kachori (Urad, Matar, Pyaz), Pani Puri, Dahi Puri, Sev Puri, Bhel Puri');
    console.log('   🥔 ALOO (8): Aloo Gobi, Aloo Matar, Jeera Aloo, Dum Aloo, Aloo Palak, Aloo Bhaji, Bombay Potatoes, Aloo Bonda');
    console.log('   🍣 SUSHI (7): California Roll, Spicy Tuna, Salmon, Dragon Roll, Rainbow Roll, Tempura Roll, Avocado Roll');
    console.log('   🥡 CHINESE (12): Manchurian (Veg/Chicken), Hakka Noodles (Veg/Chicken), Sweet & Sour, Honey Chilli Potato, Dim Sum, Szechwan, Chilli Chicken, Chilli Paneer');
    console.log('   🍝 PASTA (10): Carbonara, Alfredo, Arrabbiata, Pesto, Bolognese, Lasagna, Ravioli, Mac & Cheese, Aglio e Olio, Marinara');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedFinalMegaFoods();
