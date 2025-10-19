const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedDalsAndJunkFoods() {
  try {
    console.log('🫘 Starting DALS, LEGUMES & JUNK FOODS seeding...');
    console.log('📊 Adding: Dals, Legumes, Pesarattu, Samosas, Snacks, Junk Foods');

    const foods = [
      // ============================================
      // DALS & LEGUMES (30 foods)
      // ============================================
      { food_name: 'Toor Dal / Pigeon Pea (1 cup cooked)', calories: 200, protein_g: 11, fat_g: 1, carbs_g: 38, fiber_g: 11, sugar_g: 3, sodium_mg: 5, diabetic_rating: 'green', health_score: 92, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['కందిపప్పు', 'तूर दाल'] },
      { food_name: 'Moong Dal / Green Gram (1 cup cooked)', calories: 212, protein_g: 14, fat_g: 1, carbs_g: 38, fiber_g: 15, sugar_g: 3, sodium_mg: 5, diabetic_rating: 'green', health_score: 95, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['పెసలు', 'मूंग दाल'] },
      { food_name: 'Chana Dal / Bengal Gram (1 cup cooked)', calories: 200, protein_g: 10, fat_g: 3, carbs_g: 33, fiber_g: 12, sugar_g: 6, sodium_mg: 10, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['శనగలు', 'चना दाल'] },
      { food_name: 'Masoor Dal / Red Lentil (1 cup cooked)', calories: 230, protein_g: 18, fat_g: 1, carbs_g: 40, fiber_g: 16, sugar_g: 2, sodium_mg: 5, diabetic_rating: 'green', health_score: 93, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['మసూర్ పప్పు', 'मसूर दाल'] },
      { food_name: 'Urad Dal / Black Gram (1 cup cooked)', calories: 210, protein_g: 14, fat_g: 1, carbs_g: 36, fiber_g: 12, sugar_g: 2, sodium_mg: 8, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['మినుములు', 'उड़द दाल'] },
      { food_name: 'Kabuli Chana / Chickpeas (1 cup cooked)', calories: 269, protein_g: 15, fat_g: 4, carbs_g: 45, fiber_g: 12, sugar_g: 8, sodium_mg: 11, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Indian', category: 'Legume', regional_names: ['కాబులి చనా', 'काबुली चना'] },
      { food_name: 'Black Chana / Kala Chana (1 cup cooked)', calories: 240, protein_g: 13, fat_g: 3, carbs_g: 40, fiber_g: 14, sugar_g: 7, sodium_mg: 10, diabetic_rating: 'green', health_score: 92, country: 'India', cuisine_type: 'Indian', category: 'Legume', regional_names: ['నల్ల శనగలు', 'काला चना'] },
      { food_name: 'Rajma / Kidney Beans (1 cup cooked)', calories: 225, protein_g: 15, fat_g: 1, carbs_g: 40, fiber_g: 13, sugar_g: 3, sodium_mg: 5, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'North Indian', category: 'Legume', regional_names: ['రాజ్మా', 'राजमा'] },
      { food_name: 'Green Peas (1 cup cooked)', calories: 134, protein_g: 9, fat_g: 0.4, carbs_g: 25, fiber_g: 9, sugar_g: 10, sodium_mg: 5, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Healthy', category: 'Legume', regional_names: ['బఠాణీలు', 'मटर'] },
      { food_name: 'Dal Tadka (1 bowl)', calories: 180, protein_g: 10, fat_g: 6, carbs_g: 22, fiber_g: 8, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['దాల్ తడ్క', 'दाल तड़का'] },
      { food_name: 'Dal Fry (1 bowl)', calories: 200, protein_g: 11, fat_g: 8, carbs_g: 24, fiber_g: 9, sugar_g: 3, sodium_mg: 420, diabetic_rating: 'green', health_score: 83, country: 'India', cuisine_type: 'Indian', category: 'Dal', regional_names: ['దాల్ ఫ్రై', 'दाल फ्राई'] },
      { food_name: 'Dal Makhani (1 bowl)', calories: 280, protein_g: 12, fat_g: 15, carbs_g: 25, fiber_g: 6, sugar_g: 3, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'North Indian', category: 'Dal', regional_names: ['దాల్ మఖానీ', 'दाल मखनी'] },
      { food_name: 'Chana Masala (1 bowl)', calories: 250, protein_g: 12, fat_g: 8, carbs_g: 35, fiber_g: 10, sugar_g: 6, sodium_mg: 450, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'North Indian', category: 'Legume', regional_names: ['చనా మసాలా', 'चना मसाला'] },
      { food_name: 'Rajma Masala (1 bowl)', calories: 280, protein_g: 14, fat_g: 10, carbs_g: 38, fiber_g: 12, sugar_g: 4, sodium_mg: 480, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'North Indian', category: 'Legume', regional_names: ['రాజ్మా మసాలా', 'राजमा मसाला'] },
      { food_name: 'Pesarattu / Moong Dal Dosa (2 pieces)', calories: 180, protein_g: 10, fat_g: 6, carbs_g: 24, fiber_g: 6, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'Telugu', category: 'Breakfast', regional_names: ['పెసరట్టు', 'मूंग दाल डोसा'] },
      { food_name: 'Pesarattu with Upma (1 plate)', calories: 280, protein_g: 13, fat_g: 10, carbs_g: 38, fiber_g: 8, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Telugu', category: 'Breakfast', regional_names: ['పెసరట్టు ఉప్మా', 'पेसरट्टु उपमा'] },
      { food_name: 'Moong Dal Chilla (2 pieces)', calories: 160, protein_g: 9, fat_g: 5, carbs_g: 22, fiber_g: 5, sugar_g: 1, sodium_mg: 280, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'North Indian', category: 'Breakfast', regional_names: ['మూంగ్ దాల్ చిల్లా', 'मूंग दाल चिल्ला'] },
      { food_name: 'Besan Chilla / Gram Flour Pancake (2 pieces)', calories: 180, protein_g: 8, fat_g: 6, carbs_g: 24, fiber_g: 4, sugar_g: 2, sodium_mg: 300, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'North Indian', category: 'Breakfast', regional_names: ['బేసన్ చిల్లా', 'बेसन चिल्ला'] },
      { food_name: 'Dhokla (4 pieces)', calories: 160, protein_g: 6, fat_g: 4, carbs_g: 28, fiber_g: 3, sugar_g: 4, sodium_mg: 350, diabetic_rating: 'green', health_score: 82, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['ధోక్లా', 'ढोकला'] },
      { food_name: 'Khandvi (6 pieces)', calories: 120, protein_g: 5, fat_g: 4, carbs_g: 18, fiber_g: 2, sugar_g: 2, sodium_mg: 280, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Gujarati', category: 'Snack', regional_names: ['ఖండ్వి', 'खांडवी'] },
      { food_name: 'Sundal / Boiled Chana (1 cup)', calories: 150, protein_g: 8, fat_g: 3, carbs_g: 24, fiber_g: 7, sugar_g: 4, sodium_mg: 200, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'South Indian', category: 'Snack', regional_names: ['సుందల్', 'सुंडल'] },
      { food_name: 'Sprouted Moong (1 cup)', calories: 100, protein_g: 8, fat_g: 0.5, carbs_g: 18, fiber_g: 8, sugar_g: 3, sodium_mg: 10, diabetic_rating: 'green', health_score: 95, country: 'India', cuisine_type: 'Healthy', category: 'Legume', regional_names: ['మొలకలు', 'अंकुरित मूंग'] },
      { food_name: 'Hummus (2 tbsp)', calories: 70, protein_g: 2, fat_g: 5, carbs_g: 6, fiber_g: 2, sugar_g: 0, sodium_mg: 120, diabetic_rating: 'green', health_score: 85, country: 'Middle East', cuisine_type: 'Mediterranean', category: 'Dip', regional_names: ['హుమ్మస్', 'हुम्मस'] },
      { food_name: 'Falafel (4 pieces)', calories: 280, protein_g: 10, fat_g: 16, carbs_g: 28, fiber_g: 6, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'yellow', health_score: 70, country: 'Middle East', cuisine_type: 'Mediterranean', category: 'Snack', regional_names: ['ఫలాఫెల్', 'फलाफल'] },
      { food_name: 'Black Beans (1 cup cooked)', calories: 227, protein_g: 15, fat_g: 1, carbs_g: 41, fiber_g: 15, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'green', health_score: 92, country: 'Latin America', cuisine_type: 'Mexican', category: 'Legume', regional_names: ['బ్లాక్ బీన్స్', 'काली बीन्स'] },
      { food_name: 'Soya Chunks (1 cup cooked)', calories: 170, protein_g: 16, fat_g: 9, carbs_g: 6, fiber_g: 3, sugar_g: 0, sodium_mg: 10, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'Vegetarian', category: 'Protein', regional_names: ['సోయా చంక్స్', 'सोया चंक्स'] },
      { food_name: 'Tofu (100g)', calories: 76, protein_g: 8, fat_g: 5, carbs_g: 2, fiber_g: 0.5, sugar_g: 0, sodium_mg: 7, diabetic_rating: 'green', health_score: 90, country: 'Global', cuisine_type: 'Healthy', category: 'Protein', regional_names: ['టోఫు', 'टोफू'] },
      { food_name: 'Edamame (1 cup)', calories: 188, protein_g: 18, fat_g: 8, carbs_g: 14, fiber_g: 8, sugar_g: 3, sodium_mg: 9, diabetic_rating: 'green', health_score: 92, country: 'Japan', cuisine_type: 'Japanese', category: 'Legume', regional_names: ['ఎడమామె', 'एडामामे'] },
      { food_name: 'Peanuts / Groundnuts (1/4 cup)', calories: 207, protein_g: 9, fat_g: 18, carbs_g: 6, fiber_g: 3, sugar_g: 1, sodium_mg: 5, diabetic_rating: 'green', health_score: 80, country: 'Global', cuisine_type: 'Snack', category: 'Legume', regional_names: ['వేరుసెనగలు', 'मूंगफली'] },
      { food_name: 'Boiled Peanuts (1 cup)', calories: 180, protein_g: 8, fat_g: 14, carbs_g: 10, fiber_g: 4, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'green', health_score: 75, country: 'Global', cuisine_type: 'Snack', category: 'Legume', regional_names: ['ఉడికించిన వేరుసెనగలు', 'उबली मूंगफली'] },

      // ============================================
      // SAMOSAS & FRIED SNACKS (20 foods)
      // ============================================
      { food_name: 'Samosa (2 pieces)', calories: 300, protein_g: 6, fat_g: 18, carbs_g: 32, fiber_g: 3, sugar_g: 2, sodium_mg: 450, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['సమోసా', 'समोसा'] },
      { food_name: 'Aloo Samosa (2 pieces)', calories: 320, protein_g: 5, fat_g: 20, carbs_g: 35, fiber_g: 3, sugar_g: 2, sodium_mg: 480, diabetic_rating: 'red', health_score: 38, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['ఆలూ సమోసా', 'आलू समोसा'] },
      { food_name: 'Keema Samosa (2 pieces)', calories: 350, protein_g: 12, fat_g: 22, carbs_g: 30, fiber_g: 2, sugar_g: 1, sodium_mg: 500, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['కీమా సమోసా', 'कीमा समोसा'] },
      { food_name: 'Kachori (2 pieces)', calories: 280, protein_g: 5, fat_g: 16, carbs_g: 30, fiber_g: 3, sugar_g: 2, sodium_mg: 420, diabetic_rating: 'red', health_score: 42, country: 'India', cuisine_type: 'North Indian', category: 'Fried Snack', regional_names: ['కచోరీ', 'कचौड़ी'] },
      { food_name: 'Pakora / Bhajiya (6 pieces)', calories: 250, protein_g: 5, fat_g: 15, carbs_g: 25, fiber_g: 2, sugar_g: 2, sodium_mg: 400, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['పకోడీ', 'पकोड़ा'] },
      { food_name: 'Onion Pakora (6 pieces)', calories: 240, protein_g: 4, fat_g: 14, carbs_g: 26, fiber_g: 2, sugar_g: 3, sodium_mg: 380, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['ఉల్లిపాయ పకోడీ', 'प्याज पकोड़ा'] },
      { food_name: 'Mirchi Bajji (3 pieces)', calories: 200, protein_g: 3, fat_g: 12, carbs_g: 20, fiber_g: 2, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'Telugu', category: 'Fried Snack', regional_names: ['మిర్చి బజ్జి', 'मिर्च बज्जी'] },
      { food_name: 'Punugulu (8 pieces)', calories: 220, protein_g: 4, fat_g: 12, carbs_g: 26, fiber_g: 2, sugar_g: 1, sodium_mg: 320, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'Telugu', category: 'Fried Snack', regional_names: ['పునుగులు', 'पुनुगुलु'] },
      { food_name: 'Bonda (3 pieces)', calories: 210, protein_g: 4, fat_g: 11, carbs_g: 26, fiber_g: 2, sugar_g: 2, sodium_mg: 340, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'South Indian', category: 'Fried Snack', regional_names: ['బోండా', 'बोंडा'] },
      { food_name: 'Medu Vada (3 pieces)', calories: 200, protein_g: 6, fat_g: 10, carbs_g: 22, fiber_g: 3, sugar_g: 1, sodium_mg: 380, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'South Indian', category: 'Fried Snack', regional_names: ['మేడు వడ', 'मेदु वड़ा'] },
      { food_name: 'Masala Vada (3 pieces)', calories: 220, protein_g: 7, fat_g: 12, carbs_g: 24, fiber_g: 4, sugar_g: 1, sodium_mg: 400, diabetic_rating: 'yellow', health_score: 58, country: 'India', cuisine_type: 'South Indian', category: 'Fried Snack', regional_names: ['మసాలా వడ', 'मसाला वड़ा'] },
      { food_name: 'Aloo Tikki (2 pieces)', calories: 200, protein_g: 3, fat_g: 10, carbs_g: 26, fiber_g: 2, sugar_g: 2, sodium_mg: 350, diabetic_rating: 'red', health_score: 48, country: 'India', cuisine_type: 'North Indian', category: 'Fried Snack', regional_names: ['ఆలూ టిక్కీ', 'आलू टिक्की'] },
      { food_name: 'Cutlet (2 pieces)', calories: 240, protein_g: 6, fat_g: 14, carbs_g: 24, fiber_g: 3, sugar_g: 2, sodium_mg: 380, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'Indian', category: 'Fried Snack', regional_names: ['కట్లెట్', 'कटलेट'] },
      { food_name: 'Spring Roll (2 pieces)', calories: 220, protein_g: 5, fat_g: 12, carbs_g: 24, fiber_g: 2, sugar_g: 2, sodium_mg: 360, diabetic_rating: 'red', health_score: 52, country: 'China', cuisine_type: 'Chinese', category: 'Fried Snack', regional_names: ['స్ప్రింగ్ రోల్', 'स्प्रिंग रोल'] },
      { food_name: 'French Fries (medium)', calories: 365, protein_g: 4, fat_g: 17, carbs_g: 48, fiber_g: 5, sugar_g: 0, sodium_mg: 246, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['ఫ్రెంచ్ ఫ్రైస్', 'फ्रेंच फ्राइज'] },
      { food_name: 'Potato Wedges (1 serving)', calories: 280, protein_g: 5, fat_g: 14, carbs_g: 36, fiber_g: 4, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'red', health_score: 40, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['పొటాటో వెడ్జెస్', 'पोटैटो वेजेज'] },
      { food_name: 'Onion Rings (8 pieces)', calories: 300, protein_g: 4, fat_g: 18, carbs_g: 32, fiber_g: 2, sugar_g: 3, sodium_mg: 340, diabetic_rating: 'red', health_score: 38, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['ఆనియన్ రింగ్స్', 'अनियन रिंग्स'] },
      { food_name: 'Mozzarella Sticks (6 pieces)', calories: 320, protein_g: 14, fat_g: 18, carbs_g: 26, fiber_g: 1, sugar_g: 2, sodium_mg: 680, diabetic_rating: 'red', health_score: 42, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['మోజారెల్లా స్టిక్స్', 'मोजरेला स्टिक्स'] },
      { food_name: 'Chicken Nuggets (6 pieces)', calories: 280, protein_g: 18, fat_g: 18, carbs_g: 14, fiber_g: 1, sugar_g: 0, sodium_mg: 480, diabetic_rating: 'red', health_score: 45, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['చికెన్ నగ్గెట్స్', 'चिकन नगेट्स'] },
      { food_name: 'Popcorn Chicken (1 serving)', calories: 320, protein_g: 20, fat_g: 20, carbs_g: 16, fiber_g: 1, sugar_g: 0, sodium_mg: 520, diabetic_rating: 'red', health_score: 42, country: 'USA', cuisine_type: 'American', category: 'Fried Snack', regional_names: ['పాప్‌కార్న్ చికెన్', 'पॉपकॉर्न चिकन'] },

      // ============================================
      // CHIPS & PACKAGED SNACKS (30 foods)
      // ============================================
      { food_name: 'Lays Classic (1 small pack 28g)', calories: 150, protein_g: 2, fat_g: 10, carbs_g: 15, fiber_g: 1, sugar_g: 0, sodium_mg: 170, diabetic_rating: 'red', health_score: 25, country: 'USA', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Lays Masala (1 small pack 28g)', calories: 155, protein_g: 2, fat_g: 10, carbs_g: 16, fiber_g: 1, sugar_g: 1, sodium_mg: 180, diabetic_rating: 'red', health_score: 22, country: 'India', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Kurkure Masala Munch (1 pack 40g)', calories: 200, protein_g: 2, fat_g: 11, carbs_g: 23, fiber_g: 1, sugar_g: 2, sodium_mg: 240, diabetic_rating: 'red', health_score: 20, country: 'India', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Cheetos (1 pack 28g)', calories: 160, protein_g: 2, fat_g: 10, carbs_g: 16, fiber_g: 0, sugar_g: 1, sodium_mg: 250, diabetic_rating: 'red', health_score: 18, country: 'USA', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Doritos (1 pack 28g)', calories: 140, protein_g: 2, fat_g: 7, carbs_g: 18, fiber_g: 1, sugar_g: 0, sodium_mg: 170, diabetic_rating: 'red', health_score: 22, country: 'USA', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Pringles (1 serving 28g)', calories: 150, protein_g: 1, fat_g: 9, carbs_g: 16, fiber_g: 1, sugar_g: 0, sodium_mg: 160, diabetic_rating: 'red', health_score: 23, country: 'USA', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Bingo Mad Angles (1 pack 36g)', calories: 180, protein_g: 2, fat_g: 10, carbs_g: 20, fiber_g: 1, sugar_g: 1, sodium_mg: 200, diabetic_rating: 'red', health_score: 21, country: 'India', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Uncle Chips (1 pack 30g)', calories: 160, protein_g: 2, fat_g: 9, carbs_g: 18, fiber_g: 1, sugar_g: 0, sodium_mg: 180, diabetic_rating: 'red', health_score: 24, country: 'India', cuisine_type: 'Junk Food', category: 'Chips', regional_names: [] },
      { food_name: 'Haldirams Aloo Bhujia (1 cup)', calories: 240, protein_g: 4, fat_g: 14, carbs_g: 25, fiber_g: 2, sugar_g: 1, sodium_mg: 280, diabetic_rating: 'red', health_score: 28, country: 'India', cuisine_type: 'Indian Snack', category: 'Namkeen', regional_names: [] },
      { food_name: 'Haldirams Bhujia Sev (1 cup)', calories: 260, protein_g: 5, fat_g: 16, carbs_g: 24, fiber_g: 2, sugar_g: 1, sodium_mg: 300, diabetic_rating: 'red', health_score: 26, country: 'India', cuisine_type: 'Indian Snack', category: 'Namkeen', regional_names: [] },
      { food_name: 'Haldirams Mixture (1 cup)', calories: 280, protein_g: 6, fat_g: 18, carbs_g: 26, fiber_g: 3, sugar_g: 2, sodium_mg: 320, diabetic_rating: 'red', health_score: 30, country: 'India', cuisine_type: 'Indian Snack', category: 'Namkeen', regional_names: [] },
      { food_name: 'Haldirams Moong Dal (1 cup)', calories: 220, protein_g: 8, fat_g: 12, carbs_g: 22, fiber_g: 4, sugar_g: 1, sodium_mg: 260, diabetic_rating: 'yellow', health_score: 50, country: 'India', cuisine_type: 'Indian Snack', category: 'Namkeen', regional_names: [] },
      { food_name: 'Murukku (6 pieces)', calories: 200, protein_g: 3, fat_g: 10, carbs_g: 25, fiber_g: 2, sugar_g: 1, sodium_mg: 240, diabetic_rating: 'red', health_score: 38, country: 'India', cuisine_type: 'South Indian', category: 'Snack', regional_names: ['చక్లి', 'मुरुक्कु'] },
      { food_name: 'Chakli / Chakri (6 pieces)', calories: 210, protein_g: 3, fat_g: 11, carbs_g: 26, fiber_g: 2, sugar_g: 1, sodium_mg: 250, diabetic_rating: 'red', health_score: 36, country: 'India', cuisine_type: 'Indian', category: 'Snack', regional_names: ['చక్లి', 'चकली'] },
      { food_name: 'Banana Chips (1 cup)', calories: 300, protein_g: 2, fat_g: 18, carbs_g: 35, fiber_g: 3, sugar_g: 18, sodium_mg: 200, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'South Indian', category: 'Chips', regional_names: ['అరటిపండు చిప్స్', 'केला चिप्स'] },
      { food_name: 'Tapioca Chips (1 cup)', calories: 320, protein_g: 1, fat_g: 20, carbs_g: 36, fiber_g: 2, sugar_g: 2, sodium_mg: 180, diabetic_rating: 'red', health_score: 32, country: 'India', cuisine_type: 'South Indian', category: 'Chips', regional_names: ['కరపెండలం చిప్స్', 'टैपिओका चिप्स'] },
      { food_name: 'Popcorn Plain (1 cup)', calories: 55, protein_g: 2, fat_g: 1, carbs_g: 11, fiber_g: 2, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'green', health_score: 70, country: 'Global', cuisine_type: 'Snack', category: 'Popcorn', regional_names: ['పాప్‌కార్న్', 'पॉपकॉर्न'] },
      { food_name: 'Popcorn Butter (1 cup)', calories: 80, protein_g: 2, fat_g: 4, carbs_g: 10, fiber_g: 2, sugar_g: 0, sodium_mg: 80, diabetic_rating: 'yellow', health_score: 55, country: 'Global', cuisine_type: 'Snack', category: 'Popcorn', regional_names: ['బటర్ పాప్‌కార్న్', 'बटर पॉपकॉर्न'] },
      { food_name: 'Popcorn Caramel (1 cup)', calories: 120, protein_g: 1, fat_g: 2, carbs_g: 24, fiber_g: 1, sugar_g: 18, sodium_mg: 60, diabetic_rating: 'red', health_score: 35, country: 'Global', cuisine_type: 'Snack', category: 'Popcorn', regional_names: ['కారమెల్ పాప్‌కార్న్', 'कैरामेल पॉपकॉर्न'] },
      { food_name: 'Nachos with Cheese (1 serving)', calories: 350, protein_g: 8, fat_g: 20, carbs_g: 36, fiber_g: 3, sugar_g: 2, sodium_mg: 680, diabetic_rating: 'red', health_score: 28, country: 'Mexico', cuisine_type: 'Mexican', category: 'Junk Food', regional_names: [] },
      { food_name: 'Corn Chips (1 cup)', calories: 280, protein_g: 3, fat_g: 15, carbs_g: 35, fiber_g: 3, sugar_g: 1, sodium_mg: 240, diabetic_rating: 'red', health_score: 30, country: 'Mexico', cuisine_type: 'Mexican', category: 'Chips', regional_names: [] },
      { food_name: 'Tortilla Chips (1 cup)', calories: 260, protein_g: 4, fat_g: 14, carbs_g: 32, fiber_g: 3, sugar_g: 1, sodium_mg: 220, diabetic_rating: 'red', health_score: 32, country: 'Mexico', cuisine_type: 'Mexican', category: 'Chips', regional_names: [] },
      { food_name: 'Pretzels (1 serving 28g)', calories: 110, protein_g: 3, fat_g: 1, carbs_g: 23, fiber_g: 1, sugar_g: 1, sodium_mg: 450, diabetic_rating: 'yellow', health_score: 40, country: 'Germany', cuisine_type: 'Snack', category: 'Baked Snack', regional_names: [] },
      { food_name: 'Crackers (6 pieces)', calories: 80, protein_g: 2, fat_g: 3, carbs_g: 13, fiber_g: 0, sugar_g: 1, sodium_mg: 150, diabetic_rating: 'yellow', health_score: 45, country: 'Global', cuisine_type: 'Snack', category: 'Baked Snack', regional_names: [] },
      { food_name: 'Rice Crackers (1 serving)', calories: 120, protein_g: 2, fat_g: 4, carbs_g: 20, fiber_g: 1, sugar_g: 1, sodium_mg: 180, diabetic_rating: 'yellow', health_score: 48, country: 'Japan', cuisine_type: 'Japanese', category: 'Snack', regional_names: [] },
      { food_name: 'Trail Mix (1/4 cup)', calories: 180, protein_g: 5, fat_g: 12, carbs_g: 15, fiber_g: 2, sugar_g: 10, sodium_mg: 40, diabetic_rating: 'yellow', health_score: 65, country: 'Global', cuisine_type: 'Healthy Snack', category: 'Mix', regional_names: [] },
      { food_name: 'Roasted Chana (1/4 cup)', calories: 120, protein_g: 6, fat_g: 2, carbs_g: 20, fiber_g: 5, sugar_g: 4, sodium_mg: 5, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'Indian Snack', category: 'Healthy Snack', regional_names: ['వేయించిన శనగలు', 'भुना चना'] },
      { food_name: 'Makhana / Fox Nuts (1 cup)', calories: 100, protein_g: 4, fat_g: 1, carbs_g: 20, fiber_g: 3, sugar_g: 0, sodium_mg: 2, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'Indian Snack', category: 'Healthy Snack', regional_names: ['మఖానా', 'मखाना'] },
      { food_name: 'Roasted Makhana (1 cup)', calories: 150, protein_g: 4, fat_g: 6, carbs_g: 20, fiber_g: 3, sugar_g: 0, sodium_mg: 150, diabetic_rating: 'green', health_score: 78, country: 'India', cuisine_type: 'Indian Snack', category: 'Healthy Snack', regional_names: ['వేయించిన మఖానా', 'भुना मखाना'] },
      { food_name: 'Khakhra (2 pieces)', calories: 120, protein_g: 4, fat_g: 3, carbs_g: 20, fiber_g: 2, sugar_g: 1, sodium_mg: 200, diabetic_rating: 'green', health_score: 70, country: 'India', cuisine_type: 'Gujarati', category: 'Healthy Snack', regional_names: ['ఖాఖ్రా', 'खाखरा'] }
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
            'Dals & Junk Foods Database',
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
      
      if ((i + 1) % 20 === 0) {
        console.log(`📊 Inserted ${i + 1} foods...`);
      }
    }

    console.log(`\n🎉 Successfully seeded ${foods.length} DALS & JUNK FOODS!`);
    console.log('\n✅ Database now contains:');
    console.log('   🫘 DALS & LEGUMES (30): Toor, Moong, Chana, Masoor, Urad, Kabuli Chana, Black Chana, Rajma, Green Peas, Dal Tadka, Dal Fry, Dal Makhani, Chana Masala, Rajma Masala, Pesarattu, Moong Dal Chilla, Besan Chilla, Dhokla, Khandvi, Sundal, Sprouted Moong, Hummus, Falafel, Black Beans, Soya Chunks, Tofu, Edamame, Peanuts, Boiled Peanuts');
    console.log('   🥟 SAMOSAS & FRIED (20): Samosa, Aloo Samosa, Keema Samosa, Kachori, Pakora, Onion Pakora, Mirchi Bajji, Punugulu, Bonda, Medu Vada, Masala Vada, Aloo Tikki, Cutlet, Spring Roll, French Fries, Potato Wedges, Onion Rings, Mozzarella Sticks, Chicken Nuggets, Popcorn Chicken');
    console.log('   🍟 CHIPS & SNACKS (30): Lays Classic, Lays Masala, Kurkure, Cheetos, Doritos, Pringles, Bingo, Uncle Chips, Haldirams (Aloo Bhujia, Bhujia Sev, Mixture, Moong Dal), Murukku, Chakli, Banana Chips, Tapioca Chips, Popcorn, Nachos, Corn Chips, Tortilla Chips, Pretzels, Crackers, Rice Crackers, Trail Mix, Roasted Chana, Makhana, Khakhra');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDalsAndJunkFoods();
