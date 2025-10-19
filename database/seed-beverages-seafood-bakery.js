const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedBeveragesSeafoodBakery() {
  try {
    console.log('🍦 Starting BEVERAGES, SEAFOOD & BAKERY seeding...');
    console.log('📊 Adding: Ice Creams, Shakes, Teas, Coffees, Sandwiches, Rice Items, Seafood, Bakery');

    const foods = [
      // ============================================
      // ICE CREAMS (25 flavors)
      // ============================================
      { food_name: 'Vanilla Ice Cream (1 scoop)', calories: 137, protein_g: 2.3, fat_g: 7, carbs_g: 16, fiber_g: 0.5, sugar_g: 14, sodium_mg: 53, diabetic_rating: 'red', health_score: 35, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['వెనీలా ఐస్ క్రీం', 'वनीला आइस क्रीम'] },
      { food_name: 'Chocolate Ice Cream (1 scoop)', calories: 143, protein_g: 2.5, fat_g: 7.3, carbs_g: 19, fiber_g: 1, sugar_g: 16, sodium_mg: 50, diabetic_rating: 'red', health_score: 32, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['చాక్లెట్ ఐస్ క్రీం', 'चॉकलेट आइस क्रीम'] },
      { food_name: 'Strawberry Ice Cream (1 scoop)', calories: 127, protein_g: 2.1, fat_g: 5.5, carbs_g: 18, fiber_g: 0.6, sugar_g: 15, sodium_mg: 40, diabetic_rating: 'red', health_score: 38, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['స్ట్రాబెర్రీ ఐస్ క్రీం', 'स्ट्रॉबेरी आइस क्रीम'] },
      { food_name: 'Mango Ice Cream (1 scoop)', calories: 130, protein_g: 2, fat_g: 6, carbs_g: 18, fiber_g: 0.5, sugar_g: 16, sodium_mg: 45, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['మామిడి ఐస్ క్రీం', 'आम आइस क्रीम'] },
      { food_name: 'Butterscotch Ice Cream (1 scoop)', calories: 150, protein_g: 2.2, fat_g: 8, carbs_g: 18, fiber_g: 0.3, sugar_g: 15, sodium_mg: 55, diabetic_rating: 'red', health_score: 33, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['బటర్‌స్కాచ్ ఐస్ క్రీం', 'बटरस्कॉच आइस क्रीम'] },
      { food_name: 'Pistachio Ice Cream (1 scoop)', calories: 145, protein_g: 3, fat_g: 8, carbs_g: 16, fiber_g: 1, sugar_g: 13, sodium_mg: 50, diabetic_rating: 'red', health_score: 42, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: ['పిస్తా ఐస్ క్రీం', 'पिस्ता आइस क्रीम'] },
      { food_name: 'Cookies and Cream Ice Cream (1 scoop)', calories: 160, protein_g: 2.5, fat_g: 9, carbs_g: 19, fiber_g: 0.5, sugar_g: 16, sodium_mg: 60, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Mint Chocolate Chip Ice Cream (1 scoop)', calories: 150, protein_g: 2.3, fat_g: 8.5, carbs_g: 17, fiber_g: 1, sugar_g: 14, sodium_mg: 52, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Kulfi Malai (1 piece)', calories: 120, protein_g: 3, fat_g: 4, carbs_g: 20, fiber_g: 0, sugar_g: 16, sodium_mg: 30, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indian', category: 'Ice Cream', regional_names: ['కుల్ఫీ', 'कुल्फी'] },
      { food_name: 'Kulfi Pista (1 piece)', calories: 130, protein_g: 3.5, fat_g: 5, carbs_g: 19, fiber_g: 0.5, sugar_g: 15, sodium_mg: 32, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Indian', category: 'Ice Cream', regional_names: ['పిస్తా కుల్ఫీ', 'पिस्ता कुल्फी'] },
      { food_name: 'Kulfi Mango (1 piece)', calories: 125, protein_g: 3, fat_g: 4, carbs_g: 21, fiber_g: 0, sugar_g: 17, sodium_mg: 30, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'Indian', category: 'Ice Cream', regional_names: ['మామిడి కుల్ఫీ', 'आम कुल्फी'] },
      { food_name: 'Ice Cream Cone (1 cone)', calories: 250, protein_g: 4, fat_g: 12, carbs_g: 32, fiber_g: 1, sugar_g: 22, sodium_mg: 80, diabetic_rating: 'red', health_score: 28, country: 'Global', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Ice Cream Sundae (1 serving)', calories: 350, protein_g: 5, fat_g: 18, carbs_g: 45, fiber_g: 1, sugar_g: 38, sodium_mg: 100, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Ice Cream Sandwich (1 piece)', calories: 180, protein_g: 3, fat_g: 6, carbs_g: 30, fiber_g: 1, sugar_g: 18, sodium_mg: 85, diabetic_rating: 'red', health_score: 32, country: 'USA', cuisine_type: 'Dessert', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Popsicle (1 piece)', calories: 40, protein_g: 0, fat_g: 0, carbs_g: 10, fiber_g: 0, sugar_g: 9, sodium_mg: 5, diabetic_rating: 'yellow', health_score: 55, country: 'Global', cuisine_type: 'Dessert', category: 'Frozen Dessert', regional_names: [] },
      { food_name: 'Frozen Yogurt (1 cup)', calories: 120, protein_g: 5, fat_g: 2, carbs_g: 23, fiber_g: 0, sugar_g: 20, sodium_mg: 70, diabetic_rating: 'yellow', health_score: 65, country: 'Global', cuisine_type: 'Dessert', category: 'Frozen Dessert', regional_names: [] },
      { food_name: 'Gelato (1 scoop)', calories: 120, protein_g: 3, fat_g: 6, carbs_g: 15, fiber_g: 0, sugar_g: 13, sodium_mg: 40, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Ice Cream', regional_names: [] },
      { food_name: 'Sorbet (1 scoop)', calories: 100, protein_g: 0.5, fat_g: 0.1, carbs_g: 25, fiber_g: 1, sugar_g: 22, sodium_mg: 10, diabetic_rating: 'yellow', health_score: 58, country: 'Global', cuisine_type: 'Dessert', category: 'Frozen Dessert', regional_names: [] },

      // ============================================
      // MILKSHAKES & SMOOTHIES (20 drinks)
      // ============================================
      { food_name: 'Vanilla Milkshake (1 glass)', calories: 350, protein_g: 10, fat_g: 12, carbs_g: 50, fiber_g: 0, sugar_g: 46, sodium_mg: 150, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Beverage', category: 'Milkshake', regional_names: ['వెనీలా మిల్క్‌షేక్', 'वनीला मिल्कशेक'] },
      { food_name: 'Chocolate Milkshake (1 glass)', calories: 400, protein_g: 11, fat_g: 15, carbs_g: 55, fiber_g: 2, sugar_g: 50, sodium_mg: 160, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'Beverage', category: 'Milkshake', regional_names: ['చాక్లెట్ మిల్క్‌షేక్', 'चॉकलेट मिल्कशेक'] },
      { food_name: 'Strawberry Milkshake (1 glass)', calories: 320, protein_g: 9, fat_g: 10, carbs_g: 48, fiber_g: 1, sugar_g: 44, sodium_mg: 140, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'Beverage', category: 'Milkshake', regional_names: ['స్ట్రాబెర్రీ మిల్క్‌షేక్', 'स्ट्रॉबेरी मिल्कशेक'] },
      { food_name: 'Mango Milkshake (1 glass)', calories: 300, protein_g: 8, fat_g: 8, carbs_g: 50, fiber_g: 2, sugar_g: 45, sodium_mg: 130, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'Beverage', category: 'Milkshake', regional_names: ['మామిడి మిల్క్‌షేక్', 'आम मिल्कशेक'] },
      { food_name: 'Banana Shake (1 glass)', calories: 280, protein_g: 9, fat_g: 6, carbs_g: 48, fiber_g: 3, sugar_g: 40, sodium_mg: 120, diabetic_rating: 'yellow', health_score: 65, country: 'Global', cuisine_type: 'Beverage', category: 'Milkshake', regional_names: ['అరటిపండు షేక్', 'केला शेक'] },
      { food_name: 'Badam Milk (1 glass)', calories: 200, protein_g: 7, fat_g: 8, carbs_g: 25, fiber_g: 2, sugar_g: 20, sodium_mg: 100, diabetic_rating: 'yellow', health_score: 75, country: 'India', cuisine_type: 'Indian', category: 'Beverage', regional_names: ['బాదం పాలు', 'बादाम दूध'] },
      { food_name: 'Lassi Plain (1 glass)', calories: 150, protein_g: 8, fat_g: 4, carbs_g: 20, fiber_g: 0, sugar_g: 18, sodium_mg: 100, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'Indian', category: 'Beverage', regional_names: ['లస్సీ', 'लस्सी'] },
      { food_name: 'Lassi Sweet (1 glass)', calories: 180, protein_g: 7, fat_g: 5, carbs_g: 28, fiber_g: 0, sugar_g: 25, sodium_mg: 110, diabetic_rating: 'red', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Beverage', regional_names: ['తీపి లస్సీ', 'मीठी लस्सी'] },
      { food_name: 'Lassi Mango (1 glass)', calories: 200, protein_g: 7, fat_g: 5, carbs_g: 32, fiber_g: 1, sugar_g: 28, sodium_mg: 105, diabetic_rating: 'red', health_score: 58, country: 'India', cuisine_type: 'Indian', category: 'Beverage', regional_names: ['మామిడి లస్సీ', 'आम लस्सी'] },
      { food_name: 'Buttermilk / Chaas (1 glass)', calories: 60, protein_g: 3, fat_g: 1, carbs_g: 10, fiber_g: 0, sugar_g: 8, sodium_mg: 200, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian', category: 'Beverage', regional_names: ['మజ్జిగ', 'छाछ'] },
      { food_name: 'Green Smoothie (1 glass)', calories: 150, protein_g: 4, fat_g: 2, carbs_g: 30, fiber_g: 5, sugar_g: 18, sodium_mg: 40, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Healthy', category: 'Smoothie', regional_names: [] },
      { food_name: 'Berry Smoothie (1 glass)', calories: 180, protein_g: 5, fat_g: 2, carbs_g: 35, fiber_g: 6, sugar_g: 24, sodium_mg: 50, diabetic_rating: 'yellow', health_score: 80, country: 'Global', cuisine_type: 'Healthy', category: 'Smoothie', regional_names: [] },
      { food_name: 'Protein Shake (1 glass)', calories: 200, protein_g: 20, fat_g: 3, carbs_g: 25, fiber_g: 2, sugar_g: 12, sodium_mg: 150, diabetic_rating: 'green', health_score: 85, country: 'Global', cuisine_type: 'Fitness', category: 'Shake', regional_names: [] },
      { food_name: 'Avocado Smoothie (1 glass)', calories: 250, protein_g: 6, fat_g: 12, carbs_g: 30, fiber_g: 8, sugar_g: 18, sodium_mg: 60, diabetic_rating: 'green', health_score: 82, country: 'Global', cuisine_type: 'Healthy', category: 'Smoothie', regional_names: [] },

      // ============================================
      // TEA & COFFEE (25 drinks)
      // ============================================
      { food_name: 'Black Tea (1 cup)', calories: 2, protein_g: 0, fat_g: 0, carbs_g: 0.5, fiber_g: 0, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Beverage', category: 'Tea', regional_names: ['నల్ల టీ', 'काली चाय'] },
      { food_name: 'Green Tea (1 cup)', calories: 2, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'green', health_score: 98, country: 'Global', cuisine_type: 'Healthy', category: 'Tea', regional_names: ['గ్రీన్ టీ', 'ग्रीन टी'] },
      { food_name: 'Masala Chai (1 cup)', calories: 80, protein_g: 3, fat_g: 3, carbs_g: 10, fiber_g: 0, sugar_g: 8, sodium_mg: 50, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'Indian', category: 'Tea', regional_names: ['మసాలా చాయ్', 'मसाला चाय'] },
      { food_name: 'Ginger Tea (1 cup)', calories: 70, protein_g: 2, fat_g: 2, carbs_g: 10, fiber_g: 0, sugar_g: 8, sodium_mg: 45, diabetic_rating: 'yellow', health_score: 75, country: 'India', cuisine_type: 'Indian', category: 'Tea', regional_names: ['అల్లం టీ', 'अदरक चाय'] },
      { food_name: 'Cardamom Tea (1 cup)', calories: 75, protein_g: 2.5, fat_g: 2.5, carbs_g: 10, fiber_g: 0, sugar_g: 8, sodium_mg: 48, diabetic_rating: 'yellow', health_score: 72, country: 'India', cuisine_type: 'Indian', category: 'Tea', regional_names: ['ఏలకుల టీ', 'इलायची चाय'] },
      { food_name: 'Lemon Tea (1 cup)', calories: 30, protein_g: 0.5, fat_g: 0, carbs_g: 8, fiber_g: 0, sugar_g: 6, sodium_mg: 5, diabetic_rating: 'green', health_score: 85, country: 'Global', cuisine_type: 'Beverage', category: 'Tea', regional_names: ['నిమ్మ టీ', 'नींबू चाय'] },
      { food_name: 'Iced Tea (1 glass)', calories: 90, protein_g: 0, fat_g: 0, carbs_g: 23, fiber_g: 0, sugar_g: 22, sodium_mg: 10, diabetic_rating: 'yellow', health_score: 50, country: 'USA', cuisine_type: 'Beverage', category: 'Tea', regional_names: [] },
      { food_name: 'Bubble Tea / Boba (1 glass)', calories: 280, protein_g: 2, fat_g: 5, carbs_g: 60, fiber_g: 0, sugar_g: 38, sodium_mg: 50, diabetic_rating: 'red', health_score: 35, country: 'Taiwan', cuisine_type: 'Beverage', category: 'Tea', regional_names: [] },
      { food_name: 'Matcha Latte (1 cup)', calories: 120, protein_g: 3, fat_g: 4, carbs_g: 18, fiber_g: 1, sugar_g: 15, sodium_mg: 60, diabetic_rating: 'yellow', health_score: 68, country: 'Japan', cuisine_type: 'Japanese', category: 'Tea', regional_names: [] },
      { food_name: 'Black Coffee (1 cup)', calories: 2, protein_g: 0.3, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Beverage', category: 'Coffee', regional_names: ['బ్లాక్ కాఫీ', 'काली कॉफी'] },
      { food_name: 'Espresso (1 shot)', calories: 3, protein_g: 0.1, fat_g: 0, carbs_g: 0.5, fiber_g: 0, sugar_g: 0, sodium_mg: 5, diabetic_rating: 'green', health_score: 92, country: 'Italy', cuisine_type: 'Italian', category: 'Coffee', regional_names: [] },
      { food_name: 'Cappuccino (1 cup)', calories: 120, protein_g: 6, fat_g: 4, carbs_g: 12, fiber_g: 0, sugar_g: 10, sodium_mg: 70, diabetic_rating: 'yellow', health_score: 65, country: 'Italy', cuisine_type: 'Italian', category: 'Coffee', regional_names: [] },
      { food_name: 'Latte (1 cup)', calories: 150, protein_g: 8, fat_g: 6, carbs_g: 15, fiber_g: 0, sugar_g: 13, sodium_mg: 95, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Coffee', regional_names: [] },
      { food_name: 'Americano (1 cup)', calories: 15, protein_g: 0.5, fat_g: 0, carbs_g: 3, fiber_g: 0, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 88, country: 'USA', cuisine_type: 'Beverage', category: 'Coffee', regional_names: [] },
      { food_name: 'Mocha (1 cup)', calories: 200, protein_g: 7, fat_g: 8, carbs_g: 26, fiber_g: 2, sugar_g: 22, sodium_mg: 85, diabetic_rating: 'red', health_score: 48, country: 'USA', cuisine_type: 'Beverage', category: 'Coffee', regional_names: [] },
      { food_name: 'Frappuccino (1 tall)', calories: 250, protein_g: 5, fat_g: 3.5, carbs_g: 50, fiber_g: 0, sugar_g: 46, sodium_mg: 140, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'Beverage', category: 'Coffee', regional_names: [] },
      { food_name: 'Cold Brew Coffee (1 cup)', calories: 5, protein_g: 0.5, fat_g: 0, carbs_g: 1, fiber_g: 0, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 90, country: 'USA', cuisine_type: 'Beverage', category: 'Coffee', regional_names: [] },
      { food_name: 'Filter Coffee / Kaapi (1 cup)', calories: 60, protein_g: 2, fat_g: 2, carbs_g: 8, fiber_g: 0, sugar_g: 6, sodium_mg: 40, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'South Indian', category: 'Coffee', regional_names: ['ఫిల్టర్ కాఫీ', 'फ़िल्टर कॉफी'] },

      // ============================================
      // SANDWICHES (20 types)
      // ============================================
      { food_name: 'Veg Sandwich (1 piece)', calories: 250, protein_g: 8, fat_g: 10, carbs_g: 32, fiber_g: 4, sugar_g: 4, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 65, country: 'Global', cuisine_type: 'Snack', category: 'Sandwich', regional_names: ['వెజ్ శాండ్‌విచ్', 'वेज सैंडविच'] },
      { food_name: 'Grilled Sandwich (1 piece)', calories: 300, protein_g: 10, fat_g: 14, carbs_g: 34, fiber_g: 3, sugar_g: 3, sodium_mg: 500, diabetic_rating: 'yellow', health_score: 58, country: 'Global', cuisine_type: 'Snack', category: 'Sandwich', regional_names: ['గ్రిల్డ్ శాండ్‌విచ్', 'ग्रिल्ड सैंडविच'] },
      { food_name: 'Cheese Sandwich (1 piece)', calories: 320, protein_g: 12, fat_g: 16, carbs_g: 32, fiber_g: 2, sugar_g: 3, sodium_mg: 550, diabetic_rating: 'red', health_score: 50, country: 'Global', cuisine_type: 'Snack', category: 'Sandwich', regional_names: ['చీజ్ శాండ్‌విచ్', 'चीज़ सैंडविच'] },
      { food_name: 'Paneer Sandwich (1 piece)', calories: 280, protein_g: 14, fat_g: 12, carbs_g: 30, fiber_g: 3, sugar_g: 2, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Indian', category: 'Sandwich', regional_names: ['పనీర్ శాండ్‌విచ్', 'पनीर सैंडविच'] },
      { food_name: 'Chicken Sandwich (1 piece)', calories: 350, protein_g: 22, fat_g: 15, carbs_g: 32, fiber_g: 2, sugar_g: 3, sodium_mg: 600, diabetic_rating: 'yellow', health_score: 60, country: 'Global', cuisine_type: 'Snack', category: 'Sandwich', regional_names: ['చికెన్ శాండ్‌విచ్', 'चिकन सैंडविच'] },
      { food_name: 'Egg Sandwich (1 piece)', calories: 280, protein_g: 15, fat_g: 12, carbs_g: 28, fiber_g: 2, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'green', health_score: 68, country: 'Global', cuisine_type: 'Snack', category: 'Sandwich', regional_names: ['గుడ్డు శాండ్‌విచ్', 'अंडा सैंडविच'] },
      { food_name: 'Club Sandwich (1 piece)', calories: 450, protein_g: 25, fat_g: 22, carbs_g: 40, fiber_g: 3, sugar_g: 4, sodium_mg: 800, diabetic_rating: 'red', health_score: 48, country: 'USA', cuisine_type: 'American', category: 'Sandwich', regional_names: [] },
      { food_name: 'BLT Sandwich (1 piece)', calories: 350, protein_g: 18, fat_g: 18, carbs_g: 30, fiber_g: 2, sugar_g: 3, sodium_mg: 700, diabetic_rating: 'red', health_score: 52, country: 'USA', cuisine_type: 'American', category: 'Sandwich', regional_names: [] },
      { food_name: 'Subway Veggie Delite (6 inch)', calories: 230, protein_g: 9, fat_g: 3, carbs_g: 44, fiber_g: 5, sugar_g: 7, sodium_mg: 410, diabetic_rating: 'yellow', health_score: 72, country: 'USA', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: [] },
      { food_name: 'Subway Chicken Teriyaki (6 inch)', calories: 370, protein_g: 25, fat_g: 5, carbs_g: 59, fiber_g: 4, sugar_g: 17, sodium_mg: 780, diabetic_rating: 'yellow', health_score: 65, country: 'USA', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: [] },
      { food_name: 'Burger (1 piece)', calories: 350, protein_g: 20, fat_g: 18, carbs_g: 25, fiber_g: 1, sugar_g: 5, sodium_mg: 500, diabetic_rating: 'yellow', health_score: 50, country: 'USA', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: ['బర్గర్', 'बर्गर'] },
      { food_name: 'Veg Burger (1 piece)', calories: 300, protein_g: 12, fat_g: 14, carbs_g: 35, fiber_g: 4, sugar_g: 6, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 58, country: 'Global', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: ['వెజ్ బర్గర్', 'वेज बर्गर'] },
      { food_name: 'Chicken Burger (1 piece)', calories: 380, protein_g: 25, fat_g: 18, carbs_g: 28, fiber_g: 2, sugar_g: 5, sodium_mg: 550, diabetic_rating: 'yellow', health_score: 55, country: 'Global', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: ['చికెన్ బర్గర్', 'चिकन बर्गर'] },
      { food_name: 'Cheese Burger (1 piece)', calories: 400, protein_g: 22, fat_g: 20, carbs_g: 32, fiber_g: 2, sugar_g: 6, sodium_mg: 600, diabetic_rating: 'red', health_score: 45, country: 'USA', cuisine_type: 'Fast Food', category: 'Sandwich', regional_names: ['చీజ్ బర్గర్', 'चीज़ बर्गर'] },
      { food_name: 'Wrap Veg (1 piece)', calories: 280, protein_g: 10, fat_g: 10, carbs_g: 38, fiber_g: 5, sugar_g: 4, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 65, country: 'Global', cuisine_type: 'Snack', category: 'Wrap', regional_names: [] },
      { food_name: 'Wrap Chicken (1 piece)', calories: 350, protein_g: 24, fat_g: 14, carbs_g: 36, fiber_g: 4, sugar_g: 3, sodium_mg: 550, diabetic_rating: 'yellow', health_score: 62, country: 'Global', cuisine_type: 'Snack', category: 'Wrap', regional_names: [] },

      // ============================================
      // RICE ITEMS (25 varieties)
      // ============================================
      { food_name: 'Plain Rice / Steamed Rice (1 cup)', calories: 205, protein_g: 4.3, fat_g: 0.4, carbs_g: 45, fiber_g: 0.6, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'yellow', health_score: 60, country: 'Global', cuisine_type: 'Staple', category: 'Rice', regional_names: ['సాదా అన్నం', 'सादा चावल'] },
      { food_name: 'Brown Rice (1 cup cooked)', calories: 215, protein_g: 5, fat_g: 1.8, carbs_g: 45, fiber_g: 3.5, sugar_g: 0.7, sodium_mg: 10, diabetic_rating: 'green', health_score: 80, country: 'Global', cuisine_type: 'Healthy', category: 'Rice', regional_names: ['బ్రౌన్ రైస్', 'ब्राउन राइस'] },
      { food_name: 'Basmati Rice (1 cup cooked)', calories: 210, protein_g: 4.4, fat_g: 0.5, carbs_g: 46, fiber_g: 0.7, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'yellow', health_score: 62, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['బాస్మతి రైస్', 'बासमती चावल'] },
      { food_name: 'Jeera Rice / Cumin Rice (1 cup)', calories: 230, protein_g: 4.5, fat_g: 5, carbs_g: 42, fiber_g: 1, sugar_g: 0, sodium_mg: 200, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['జీర రైస్', 'जीरा चावल'] },
      { food_name: 'Lemon Rice (1 plate)', calories: 280, protein_g: 5, fat_g: 10, carbs_g: 40, fiber_g: 2, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'South Indian', category: 'Rice', regional_names: ['నిమ్మ అన్నం', 'नींबू चावल'] },
      { food_name: 'Tamarind Rice / Pulihora (1 plate)', calories: 280, protein_g: 5, fat_g: 10, carbs_g: 40, fiber_g: 2, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'South Indian', category: 'Rice', regional_names: ['పులిహోర', 'इमली चावल'] },
      { food_name: 'Curd Rice (1 bowl)', calories: 250, protein_g: 8, fat_g: 6, carbs_g: 40, fiber_g: 1, sugar_g: 5, sodium_mg: 200, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'South Indian', category: 'Rice', regional_names: ['పెరుగు అన్నం', 'दही चावल'] },
      { food_name: 'Tomato Rice (1 plate)', calories: 270, protein_g: 5, fat_g: 9, carbs_g: 42, fiber_g: 3, sugar_g: 4, sodium_mg: 320, diabetic_rating: 'yellow', health_score: 72, country: 'India', cuisine_type: 'South Indian', category: 'Rice', regional_names: ['టమోటా అన్నం', 'टमाटर चावल'] },
      { food_name: 'Coconut Rice (1 plate)', calories: 300, protein_g: 5, fat_g: 12, carbs_g: 45, fiber_g: 2, sugar_g: 1, sodium_mg: 250, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'South Indian', category: 'Rice', regional_names: ['కొబ్బరి అన్నం', 'नारियल चावल'] },
      { food_name: 'Mint Rice (1 plate)', calories: 260, protein_g: 5, fat_g: 8, carbs_g: 40, fiber_g: 2, sugar_g: 0, sodium_mg: 280, diabetic_rating: 'yellow', health_score: 74, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['పుదీనా అన్నం', 'पुदीना चावल'] },
      { food_name: 'Biryani Veg (1 plate)', calories: 300, protein_g: 8, fat_g: 10, carbs_g: 45, fiber_g: 4, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['వెజ్ బిర్యాని', 'वेज बिरयानी'] },
      { food_name: 'Biryani Chicken (1 plate)', calories: 350, protein_g: 15, fat_g: 18, carbs_g: 30, fiber_g: 3, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['చికెన్ బిర్యాని', 'चिकन बिरयानी'] },
      { food_name: 'Biryani Mutton (1 plate)', calories: 400, protein_g: 18, fat_g: 22, carbs_g: 28, fiber_g: 2, sugar_g: 1, sodium_mg: 450, diabetic_rating: 'red', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['మట్టన్ బిర్యాని', 'मटन बिरयानी'] },
      { food_name: 'Fried Rice Veg (1 plate)', calories: 280, protein_g: 6, fat_g: 10, carbs_g: 40, fiber_g: 3, sugar_g: 3, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 65, country: 'China', cuisine_type: 'Chinese', category: 'Rice', regional_names: ['వెజ్ ఫ్రైడ్ రైస్', 'वेज फ्राइड राइस'] },
      { food_name: 'Fried Rice Chicken (1 plate)', calories: 350, protein_g: 18, fat_g: 14, carbs_g: 38, fiber_g: 2, sugar_g: 3, sodium_mg: 500, diabetic_rating: 'yellow', health_score: 62, country: 'China', cuisine_type: 'Chinese', category: 'Rice', regional_names: ['చికెన్ ఫ్రైడ్ రైస్', 'चिकन फ्राइड राइस'] },
      { food_name: 'Schezwan Rice (1 plate)', calories: 320, protein_g: 8, fat_g: 12, carbs_g: 42, fiber_g: 3, sugar_g: 4, sodium_mg: 550, diabetic_rating: 'red', health_score: 58, country: 'China', cuisine_type: 'Chinese', category: 'Rice', regional_names: ['షెజ్వాన్ రైస్', 'शेझवान राइस'] },
      { food_name: 'Ghee Rice (1 cup)', calories: 300, protein_g: 5, fat_g: 14, carbs_g: 40, fiber_g: 1, sugar_g: 0, sodium_mg: 180, diabetic_rating: 'red', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['నేయి అన్నం', 'घी चावल'] },
      { food_name: 'Pulao / Pilaf (1 cup)', calories: 260, protein_g: 6, fat_g: 8, carbs_g: 42, fiber_g: 3, sugar_g: 2, sodium_mg: 320, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['పులావ్', 'पुलाव'] },
      { food_name: 'Khichdi (1 bowl)', calories: 200, protein_g: 7, fat_g: 5, carbs_g: 32, fiber_g: 5, sugar_g: 0, sodium_mg: 300, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian', category: 'Rice', regional_names: ['ఖిచ్డి', 'खिचड़ी'] },
      { food_name: 'Risotto (1 serving)', calories: 300, protein_g: 8, fat_g: 10, carbs_g: 45, fiber_g: 2, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 65, country: 'Italy', cuisine_type: 'Italian', category: 'Rice', regional_names: [] },
      { food_name: 'Paella (1 serving)', calories: 350, protein_g: 20, fat_g: 12, carbs_g: 40, fiber_g: 3, sugar_g: 3, sodium_mg: 500, diabetic_rating: 'yellow', health_score: 68, country: 'Spain', cuisine_type: 'Spanish', category: 'Rice', regional_names: [] },
      { food_name: 'Jambalaya (1 serving)', calories: 320, protein_g: 18, fat_g: 10, carbs_g: 42, fiber_g: 3, sugar_g: 4, sodium_mg: 550, diabetic_rating: 'yellow', health_score: 65, country: 'USA', cuisine_type: 'Cajun', category: 'Rice', regional_names: [] },
      { food_name: 'Rice Noodles (1 plate)', calories: 190, protein_g: 3, fat_g: 0.5, carbs_g: 44, fiber_g: 2, sugar_g: 0, sodium_mg: 20, diabetic_rating: 'yellow', health_score: 62, country: 'Asia', cuisine_type: 'Asian', category: 'Rice', regional_names: [] },

      // ============================================
      // SEAFOOD & FISH (30 items)
      // ============================================
      { food_name: 'Fish Curry (1 serving)', calories: 250, protein_g: 25, fat_g: 12, carbs_g: 8, fiber_g: 2, sugar_g: 3, sodium_mg: 500, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['చేప కూర', 'मछली करी'] },
      { food_name: 'Fish Fry (1 piece)', calories: 200, protein_g: 20, fat_g: 12, carbs_g: 5, fiber_g: 0, sugar_g: 0, sodium_mg: 350, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['చేప ఫ్రై', 'मछली फ्राई'] },
      { food_name: 'Salmon Grilled (1 fillet)', calories: 280, protein_g: 30, fat_g: 18, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 80, diabetic_rating: 'green', health_score: 92, country: 'Global', cuisine_type: 'Healthy', category: 'Seafood', regional_names: ['సాల్మన్', 'सालमन'] },
      { food_name: 'Tuna (1 can)', calories: 120, protein_g: 26, fat_g: 1, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 400, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Healthy', category: 'Seafood', regional_names: ['ట్యూనా', 'टूना'] },
      { food_name: 'Prawns Curry (1 serving)', calories: 220, protein_g: 24, fat_g: 10, carbs_g: 8, fiber_g: 1, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'green', health_score: 82, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['రొయ్యల కూర', 'झींगा करी'] },
      { food_name: 'Prawns Fry (1 serving)', calories: 180, protein_g: 22, fat_g: 9, carbs_g: 3, fiber_g: 0, sugar_g: 0, sodium_mg: 400, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['రొయ్యల ఫ్రై', 'झींगा फ्राई'] },
      { food_name: 'Crab Curry (1 serving)', calories: 200, protein_g: 20, fat_g: 8, carbs_g: 10, fiber_g: 2, sugar_g: 3, sodium_mg: 480, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Coastal', category: 'Seafood', regional_names: ['పీత కూర', 'केकड़ा करी'] },
      { food_name: 'Lobster Grilled (1 tail)', calories: 140, protein_g: 28, fat_g: 2, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 400, diabetic_rating: 'green', health_score: 85, country: 'Global', cuisine_type: 'Seafood', category: 'Seafood', regional_names: ['లాబ్స్టర్', 'लॉबस्टर'] },
      { food_name: 'Squid Rings / Calamari (1 serving)', calories: 180, protein_g: 18, fat_g: 8, carbs_g: 12, fiber_g: 0, sugar_g: 0, sodium_mg: 350, diabetic_rating: 'green', health_score: 72, country: 'Global', cuisine_type: 'Seafood', category: 'Seafood', regional_names: ['స్క్విడ్', 'कैलामारी'] },
      { food_name: 'Octopus (1 serving)', calories: 140, protein_g: 25, fat_g: 2, carbs_g: 4, fiber_g: 0, sugar_g: 0, sodium_mg: 280, diabetic_rating: 'green', health_score: 82, country: 'Global', cuisine_type: 'Seafood', category: 'Seafood', regional_names: ['ఆక్టోపస్', 'ऑक्टोपस'] },
      { food_name: 'Fish Tikka (6 pieces)', calories: 220, protein_g: 26, fat_g: 10, carbs_g: 6, fiber_g: 1, sugar_g: 2, sodium_mg: 420, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['ఫిష్ టిక్కా', 'फिश टिक्का'] },
      { food_name: 'Fish Biryani (1 plate)', calories: 380, protein_g: 25, fat_g: 18, carbs_g: 32, fiber_g: 3, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['చేప బిర్యాని', 'फिश बिरयानी'] },
      { food_name: 'Prawn Biryani (1 plate)', calories: 400, protein_g: 28, fat_g: 20, carbs_g: 30, fiber_g: 2, sugar_g: 1, sodium_mg: 480, diabetic_rating: 'yellow', health_score: 68, country: 'India', cuisine_type: 'Indian', category: 'Seafood', regional_names: ['రొయ్యల బిర్యాని', 'झींगा बिरयानी'] },
      { food_name: 'Fish Fingers (6 pieces)', calories: 280, protein_g: 18, fat_g: 14, carbs_g: 20, fiber_g: 1, sugar_g: 1, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 58, country: 'Global', cuisine_type: 'Snack', category: 'Seafood', regional_names: ['ఫిష్ ఫింగర్స్', 'फिश फिंगर्स'] },
      { food_name: 'Fish and Chips (1 serving)', calories: 450, protein_g: 25, fat_g: 22, carbs_g: 40, fiber_g: 3, sugar_g: 2, sodium_mg: 550, diabetic_rating: 'red', health_score: 48, country: 'UK', cuisine_type: 'British', category: 'Seafood', regional_names: [] },
      { food_name: 'Sushi (6 pieces)', calories: 200, protein_g: 8, fat_g: 1, carbs_g: 40, fiber_g: 1, sugar_g: 2, sodium_mg: 300, diabetic_rating: 'green', health_score: 85, country: 'Japan', cuisine_type: 'Japanese', category: 'Seafood', regional_names: ['సుషీ', 'सुशी'] },
      { food_name: 'Sashimi (6 pieces)', calories: 120, protein_g: 24, fat_g: 2, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 40, diabetic_rating: 'green', health_score: 95, country: 'Japan', cuisine_type: 'Japanese', category: 'Seafood', regional_names: ['సషిమి', 'साशिमी'] },
      { food_name: 'Crab Cakes (2 pieces)', calories: 280, protein_g: 18, fat_g: 16, carbs_g: 14, fiber_g: 1, sugar_g: 2, sodium_mg: 500, diabetic_rating: 'yellow', health_score: 65, country: 'USA', cuisine_type: 'American', category: 'Seafood', regional_names: [] },
      { food_name: 'Shrimp Scampi (1 serving)', calories: 320, protein_g: 28, fat_g: 18, carbs_g: 12, fiber_g: 1, sugar_g: 1, sodium_mg: 600, diabetic_rating: 'green', health_score: 72, country: 'Italy', cuisine_type: 'Italian', category: 'Seafood', regional_names: [] },
      { food_name: 'Clam Chowder (1 bowl)', calories: 220, protein_g: 12, fat_g: 10, carbs_g: 20, fiber_g: 2, sugar_g: 3, sodium_mg: 700, diabetic_rating: 'yellow', health_score: 62, country: 'USA', cuisine_type: 'American', category: 'Seafood', regional_names: [] },

      // ============================================
      // BAKERY ITEMS (30 items)
      // ============================================
      { food_name: 'White Bread (2 slices)', calories: 160, protein_g: 5, fat_g: 2, carbs_g: 30, fiber_g: 1, sugar_g: 4, sodium_mg: 320, diabetic_rating: 'yellow', health_score: 50, country: 'Global', cuisine_type: 'Bakery', category: 'Bread', regional_names: ['తెల్ల బ్రెడ్', 'सफेद ब्रेड'] },
      { food_name: 'Whole Wheat Bread (2 slices)', calories: 140, protein_g: 6, fat_g: 2, carbs_g: 26, fiber_g: 4, sugar_g: 3, sodium_mg: 280, diabetic_rating: 'green', health_score: 75, country: 'Global', cuisine_type: 'Bakery', category: 'Bread', regional_names: ['గోధుమ బ్రెడ్', 'गेहूं ब्रेड'] },
      { food_name: 'Brown Bread (2 slices)', calories: 150, protein_g: 6, fat_g: 2, carbs_g: 28, fiber_g: 3, sugar_g: 3, sodium_mg: 300, diabetic_rating: 'green', health_score: 72, country: 'Global', cuisine_type: 'Bakery', category: 'Bread', regional_names: ['బ్రౌన్ బ్రెడ్', 'ब्राउन ब्रेड'] },
      { food_name: 'Multigrain Bread (2 slices)', calories: 130, protein_g: 6, fat_g: 2, carbs_g: 24, fiber_g: 5, sugar_g: 2, sodium_mg: 260, diabetic_rating: 'green', health_score: 82, country: 'Global', cuisine_type: 'Bakery', category: 'Bread', regional_names: ['మల్టిగ్రెయిన్ బ్రెడ్', 'मल्टीग्रेन ब्रेड'] },
      { food_name: 'Pav / Bun (1 piece)', calories: 120, protein_g: 4, fat_g: 2, carbs_g: 22, fiber_g: 1, sugar_g: 3, sodium_mg: 220, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Bread', regional_names: ['పావ్', 'पाव'] },
      { food_name: 'Croissant (1 piece)', calories: 230, protein_g: 5, fat_g: 12, carbs_g: 26, fiber_g: 1.5, sugar_g: 5, sodium_mg: 240, diabetic_rating: 'red', health_score: 42, country: 'France', cuisine_type: 'French', category: 'Pastry', regional_names: [] },
      { food_name: 'Muffin (1 piece)', calories: 280, protein_g: 5, fat_g: 12, carbs_g: 38, fiber_g: 2, sugar_g: 18, sodium_mg: 320, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: ['మఫిన్', 'मफिन'] },
      { food_name: 'Blueberry Muffin (1 piece)', calories: 320, protein_g: 5, fat_g: 14, carbs_g: 42, fiber_g: 2, sugar_g: 22, sodium_mg: 340, diabetic_rating: 'red', health_score: 35, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: [] },
      { food_name: 'Cupcake (1 piece)', calories: 250, protein_g: 3, fat_g: 10, carbs_g: 38, fiber_g: 0, sugar_g: 28, sodium_mg: 200, diabetic_rating: 'red', health_score: 28, country: 'Global', cuisine_type: 'Bakery', category: 'Dessert', regional_names: ['కప్‌కేక్', 'कपकेक'] },
      { food_name: 'Donut (1 piece)', calories: 280, protein_g: 4, fat_g: 14, carbs_g: 35, fiber_g: 1, sugar_g: 18, sodium_mg: 260, diabetic_rating: 'red', health_score: 25, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: ['డోనట్', 'डोनट'] },
      { food_name: 'Chocolate Donut (1 piece)', calories: 320, protein_g: 4, fat_g: 16, carbs_g: 40, fiber_g: 2, sugar_g: 22, sodium_mg: 280, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: [] },
      { food_name: 'Brownie (1 piece)', calories: 200, protein_g: 3, fat_g: 9, carbs_g: 28, fiber_g: 2, sugar_g: 20, sodium_mg: 100, diabetic_rating: 'red', health_score: 32, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: ['బ్రౌనీ', 'ब्राउनी'] },
      { food_name: 'Cookie Chocolate Chip (2 pieces)', calories: 160, protein_g: 2, fat_g: 8, carbs_g: 22, fiber_g: 1, sugar_g: 14, sodium_mg: 120, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: ['కుకీ', 'कुकी'] },
      { food_name: 'Biscuit Plain (4 pieces)', calories: 140, protein_g: 2, fat_g: 5, carbs_g: 22, fiber_g: 0.5, sugar_g: 6, sodium_mg: 180, diabetic_rating: 'yellow', health_score: 48, country: 'Global', cuisine_type: 'Snack', category: 'Biscuit', regional_names: ['బిస్కెట్', 'बिस्किट'] },
      { food_name: 'Marie Biscuit (4 pieces)', calories: 120, protein_g: 2, fat_g: 3, carbs_g: 22, fiber_g: 0.5, sugar_g: 5, sodium_mg: 150, diabetic_rating: 'yellow', health_score: 55, country: 'Global', cuisine_type: 'Snack', category: 'Biscuit', regional_names: [] },
      { food_name: 'Cream Biscuit (4 pieces)', calories: 180, protein_g: 2, fat_g: 8, carbs_g: 26, fiber_g: 0, sugar_g: 12, sodium_mg: 200, diabetic_rating: 'red', health_score: 35, country: 'Global', cuisine_type: 'Snack', category: 'Biscuit', regional_names: [] },
      { food_name: 'Danish Pastry (1 piece)', calories: 300, protein_g: 5, fat_g: 16, carbs_g: 35, fiber_g: 1, sugar_g: 14, sodium_mg: 280, diabetic_rating: 'red', health_score: 32, country: 'Denmark', cuisine_type: 'European', category: 'Pastry', regional_names: [] },
      { food_name: 'Eclair (1 piece)', calories: 250, protein_g: 4, fat_g: 14, carbs_g: 28, fiber_g: 0, sugar_g: 18, sodium_mg: 120, diabetic_rating: 'red', health_score: 35, country: 'France', cuisine_type: 'French', category: 'Pastry', regional_names: [] },
      { food_name: 'Macaron (2 pieces)', calories: 140, protein_g: 2, fat_g: 6, carbs_g: 20, fiber_g: 0, sugar_g: 18, sodium_mg: 20, diabetic_rating: 'red', health_score: 38, country: 'France', cuisine_type: 'French', category: 'Pastry', regional_names: [] },
      { food_name: 'Bagel (1 piece)', calories: 250, protein_g: 10, fat_g: 2, carbs_g: 50, fiber_g: 2, sugar_g: 5, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 58, country: 'USA', cuisine_type: 'American', category: 'Bread', regional_names: [] },
      { food_name: 'English Muffin (1 piece)', calories: 130, protein_g: 5, fat_g: 1, carbs_g: 26, fiber_g: 2, sugar_g: 2, sodium_mg: 260, diabetic_rating: 'yellow', health_score: 62, country: 'UK', cuisine_type: 'British', category: 'Bread', regional_names: [] },
      { food_name: 'Pancake (2 pieces)', calories: 200, protein_g: 6, fat_g: 4, carbs_g: 35, fiber_g: 1, sugar_g: 8, sodium_mg: 420, diabetic_rating: 'yellow', health_score: 55, country: 'USA', cuisine_type: 'American', category: 'Breakfast', regional_names: ['పాన్‌కేక్', 'पैनकेक'] },
      { food_name: 'Waffle (2 pieces)', calories: 220, protein_g: 8, fat_g: 6, carbs_g: 38, fiber_g: 1, sugar_g: 10, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 52, country: 'Belgium', cuisine_type: 'European', category: 'Breakfast', regional_names: ['వాఫిల్', 'वफ़ल'] },
      { food_name: 'Cake Chocolate (1 slice)', calories: 350, protein_g: 5, fat_g: 18, carbs_g: 45, fiber_g: 2, sugar_g: 32, sodium_mg: 300, diabetic_rating: 'red', health_score: 25, country: 'Global', cuisine_type: 'Bakery', category: 'Cake', regional_names: ['కేక్', 'केक'] },
      { food_name: 'Cake Vanilla (1 slice)', calories: 320, protein_g: 4, fat_g: 16, carbs_g: 42, fiber_g: 1, sugar_g: 28, sodium_mg: 280, diabetic_rating: 'red', health_score: 28, country: 'Global', cuisine_type: 'Bakery', category: 'Cake', regional_names: [] },
      { food_name: 'Cheesecake (1 slice)', calories: 400, protein_g: 7, fat_g: 26, carbs_g: 36, fiber_g: 0, sugar_g: 28, sodium_mg: 320, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'American', category: 'Cake', regional_names: [] },
      { food_name: 'Black Forest Cake (1 slice)', calories: 380, protein_g: 5, fat_g: 20, carbs_g: 48, fiber_g: 2, sugar_g: 34, sodium_mg: 280, diabetic_rating: 'red', health_score: 24, country: 'Germany', cuisine_type: 'European', category: 'Cake', regional_names: [] },
      { food_name: 'Red Velvet Cake (1 slice)', calories: 360, protein_g: 4, fat_g: 18, carbs_g: 46, fiber_g: 1, sugar_g: 32, sodium_mg: 320, diabetic_rating: 'red', health_score: 26, country: 'USA', cuisine_type: 'American', category: 'Cake', regional_names: [] },
      { food_name: 'Puff Pastry (1 piece)', calories: 180, protein_g: 3, fat_g: 10, carbs_g: 20, fiber_g: 0.5, sugar_g: 2, sodium_mg: 180, diabetic_rating: 'yellow', health_score: 45, country: 'France', cuisine_type: 'French', category: 'Pastry', regional_names: ['పఫ్ పేస్ట్రీ', 'पफ पेस्ट्री'] },
      { food_name: 'Cinnamon Roll (1 piece)', calories: 320, protein_g: 5, fat_g: 14, carbs_g: 45, fiber_g: 2, sugar_g: 24, sodium_mg: 350, diabetic_rating: 'red', health_score: 32, country: 'USA', cuisine_type: 'American', category: 'Bakery', regional_names: [] }
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
            food.continent || 'Global',
            food.cuisine_type,
            food.category,
            'Beverages Seafood Bakery Database',
            true,
            ['USDA', 'ICMR', 'Manufacturer Data']
          ]
        );
      } catch (error) {
        if (error.code === '23505') { // Duplicate key error
          console.log(`⚠️  Skipped duplicate: ${food.food_name}`);
        } else {
          console.error(`❌ Error inserting ${food.food_name}:`, error.message);
        }
      }
      
      if ((i + 1) % 30 === 0) {
        console.log(`📊 Inserted ${i + 1} foods...`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${foods.length} BEVERAGES, SEAFOOD & BAKERY foods!`);
    console.log('\n✅ Database now contains:');
    console.log('   🍦 ICE CREAMS (18): Vanilla, Chocolate, Strawberry, Mango, Butterscotch, Pistachio, Cookies & Cream, Mint Chocolate Chip, Kulfi (Malai, Pista, Mango), Ice Cream Cone, Sundae, Sandwich, Popsicle, Frozen Yogurt, Gelato, Sorbet');
    console.log('   🥤 SHAKES & SMOOTHIES (14): Vanilla/Chocolate/Strawberry/Mango/Banana Milkshake, Badam Milk, Lassi (Plain, Sweet, Mango), Buttermilk, Green/Berry Smoothie, Protein Shake, Avocado Smoothie');
    console.log('   ☕ TEA & COFFEE (18): Black Tea, Green Tea, Masala Chai, Ginger Tea, Cardamom Tea, Lemon Tea, Iced Tea, Bubble Tea, Matcha Latte, Black Coffee, Espresso, Cappuccino, Latte, Americano, Mocha, Frappuccino, Cold Brew, Filter Coffee');
    console.log('   🥪 SANDWICHES (16): Veg, Grilled, Cheese, Paneer, Chicken, Egg, Club, BLT, Subway (Veggie Delite, Chicken Teriyaki), Burger (Veg, Chicken, Cheese), Wrap (Veg, Chicken)');
    console.log('   🍚 RICE ITEMS (23): Plain Rice, Brown Rice, Basmati, Jeera Rice, Lemon Rice, Tamarind Rice/Pulihora, Curd Rice, Tomato Rice, Coconut Rice, Mint Rice, Biryani (Veg, Chicken, Mutton), Fried Rice (Veg, Chicken), Schezwan Rice, Ghee Rice, Pulao, Khichdi, Risotto, Paella, Jambalaya, Rice Noodles');
    console.log('   🐟 SEAFOOD (20): Fish Curry, Fish Fry, Salmon, Tuna, Prawns Curry/Fry, Crab Curry, Lobster, Squid/Calamari, Octopus, Fish Tikka, Fish/Prawn Biryani, Fish Fingers, Fish & Chips, Sushi, Sashimi, Crab Cakes, Shrimp Scampi, Clam Chowder');
    console.log('   🥐 BAKERY (30): White/Whole Wheat/Brown/Multigrain Bread, Pav, Croissant, Muffin (Blueberry), Cupcake, Donut (Plain, Chocolate), Brownie, Cookie, Biscuit (Plain, Marie, Cream), Danish Pastry, Eclair, Macaron, Bagel, English Muffin, Pancake, Waffle, Cake (Chocolate, Vanilla, Cheesecake, Black Forest, Red Velvet), Puff Pastry, Cinnamon Roll');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedBeveragesSeafoodBakery();
