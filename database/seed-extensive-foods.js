const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedExtensiveFoods() {
  try {
    console.log('🌍 Starting extensive nutrition database seeding...');
    console.log('📊 Adding: Fruits, Alcohols, Telugu Foods, Indian Sweets');

    const foods = [
      // FRUITS DATABASE
      {
        food_name: 'Apple (1 medium)', food_name_lower: 'apple (1 medium)', 
        regional_names: ['సీతాఫలం', 'सेब'], alternate_names: ['Red Apple', 'Green Apple'],
        calories: 95, protein_g: 0.5, fat_g: 0.3, carbs_g: 25, fiber_g: 4, sugar_g: 19, sodium_mg: 2,
        diabetic_rating: 'green', health_score: 90, country: 'Global', continent: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Banana (1 medium)', food_name_lower: 'banana (1 medium)', 
        regional_names: ['అరటిపండు', 'केला'], alternate_names: ['Yellow Banana'],
        calories: 105, protein_g: 1.3, fat_g: 0.4, carbs_g: 27, fiber_g: 3, sugar_g: 14, sodium_mg: 1,
        diabetic_rating: 'yellow', health_score: 75, country: 'Global', continent: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Orange (1 medium)', food_name_lower: 'orange (1 medium)', 
        regional_names: ['నారింజ', 'संतरा'], alternate_names: ['Sweet Orange'],
        calories: 62, protein_g: 1.2, fat_g: 0.2, carbs_g: 15, fiber_g: 3, sugar_g: 12, sodium_mg: 0,
        diabetic_rating: 'green', health_score: 88, country: 'Global', continent: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Mango (1 medium)', food_name_lower: 'mango (1 medium)', 
        regional_names: ['మామిడి', 'आम'], alternate_names: ['King of Fruits'],
        calories: 150, protein_g: 1.4, fat_g: 0.6, carbs_g: 37, fiber_g: 3, sugar_g: 31, sodium_mg: 2,
        diabetic_rating: 'yellow', health_score: 70, country: 'India', continent: 'Asia', cuisine_type: 'Fruit', category: 'Fresh Fruit',
        data_source: 'ICMR', verified: true, verification_sources: ['ICMR', 'Wikipedia']
      },
      {
        food_name: 'Grapes (1 cup)', food_name_lower: 'grapes (1 cup)', 
        regional_names: ['ద్రాక్ష', 'अंगूर'], alternate_names: ['Green Grapes', 'Red Grapes'],
        calories: 62, protein_g: 0.6, fat_g: 0.2, carbs_g: 16, fiber_g: 1, sugar_g: 15, sodium_mg: 2,
        diabetic_rating: 'yellow', health_score: 80, country: 'Global', continent: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },

      // ALCOHOLS DATABASE
      {
        food_name: 'Beer (1 bottle)', food_name_lower: 'beer (1 bottle)', 
        regional_names: ['బీర్', 'बीयर'], alternate_names: ['Lager', 'Ale'],
        calories: 150, protein_g: 1.5, fat_g: 0, carbs_g: 13, fiber_g: 0, sugar_g: 0, sodium_mg: 15,
        diabetic_rating: 'red', health_score: 30, country: 'Global', continent: 'Global', cuisine_type: 'Beverage', category: 'Alcohol',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Wine (1 glass)', food_name_lower: 'wine (1 glass)', 
        regional_names: ['వైన్', 'वाइन'], alternate_names: ['Red Wine', 'White Wine'],
        calories: 125, protein_g: 0.1, fat_g: 0, carbs_g: 4, fiber_g: 0, sugar_g: 1, sodium_mg: 5,
        diabetic_rating: 'yellow', health_score: 40, country: 'Global', continent: 'Global', cuisine_type: 'Beverage', category: 'Alcohol',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Whiskey (1 shot)', food_name_lower: 'whiskey (1 shot)', 
        regional_names: ['విస్కీ', 'व्हिस्की'], alternate_names: ['Scotch', 'Bourbon'],
        calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0,
        diabetic_rating: 'red', health_score: 20, country: 'Global', continent: 'Global', cuisine_type: 'Beverage', category: 'Alcohol',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },
      {
        food_name: 'Vodka (1 shot)', food_name_lower: 'vodka (1 shot)', 
        regional_names: ['వోడ్కా', 'वोडका'], alternate_names: ['Premium Vodka'],
        calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0,
        diabetic_rating: 'red', health_score: 20, country: 'Global', continent: 'Global', cuisine_type: 'Beverage', category: 'Alcohol',
        data_source: 'USDA', verified: true, verification_sources: ['USDA', 'Wikipedia']
      },

      // TELUGU NATIVE FOODS
      {
        food_name: 'Pulihora (1 plate)', food_name_lower: 'pulihora (1 plate)', 
        regional_names: ['పులిహోర', 'तड़के वाला चावल'], alternate_names: ['Lemon Rice (Telugu)', 'Chitrannam'],
        calories: 280, protein_g: 5, fat_g: 10, carbs_g: 40, fiber_g: 2, sugar_g: 1, sodium_mg: 300,
        diabetic_rating: 'yellow', health_score: 70, country: 'India', continent: 'Asia', cuisine_type: 'South Indian', category: 'Breakfast',
        data_source: 'ICMR', verified: true, verification_sources: ['ICMR', 'Tara Dalal']
      },
      {
        food_name: 'Bobbatlu (2 pieces)', food_name_lower: 'bobbatlu (2 pieces)', 
        regional_names: ['బొబ్బట్లు', 'पूरन पोली'], alternate_names: ['Sweet Flatbread', 'Puran Poli'],
        calories: 320, protein_g: 6, fat_g: 12, carbs_g: 45, fiber_g: 2, sugar_g: 15, sodium_mg: 50,
        diabetic_rating: 'red', health_score: 50, country: 'India', continent: 'Asia', cuisine_type: 'South Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Gare Gadka (1 bowl)', food_name_lower: 'gare gadka (1 bowl)', 
        regional_names: ['గారె గడక', 'दही वड़ा'], alternate_names: ['Curd Vada', 'Dahi Vada'],
        calories: 250, protein_g: 10, fat_g: 15, carbs_g: 20, fiber_g: 3, sugar_g: 5, sodium_mg: 350,
        diabetic_rating: 'yellow', health_score: 65, country: 'India', continent: 'Asia', cuisine_type: 'South Indian', category: 'Snack',
        data_source: 'ICMR', verified: true, verification_sources: ['ICMR', 'Wikipedia']
      },
      {
        food_name: 'Pesarattu (2 pieces)', food_name_lower: 'pesarattu (2 pieces)', 
        regional_names: ['పేసరట్టు', 'मूंग दाल डोसा'], alternate_names: ['Green Gram Dosa'],
        calories: 180, protein_g: 8, fat_g: 6, carbs_g: 25, fiber_g: 4, sugar_g: 2, sodium_mg: 200,
        diabetic_rating: 'green', health_score: 85, country: 'India', continent: 'Asia', cuisine_type: 'South Indian', category: 'Breakfast',
        data_source: 'ICMR', verified: true, verification_sources: ['ICMR', 'Tara Dalal']
      },
      {
        food_name: 'Gongura Pickle (1 tbsp)', food_name_lower: 'gongura pickle (1 tbsp)', 
        regional_names: ['గోంగూర ఊరగాయ', 'गोंगुरा अचार'], alternate_names: ['Sorrel Pickle'],
        calories: 15, protein_g: 0.5, fat_g: 0.2, carbs_g: 3, fiber_g: 1, sugar_g: 1, sodium_mg: 200,
        diabetic_rating: 'green', health_score: 80, country: 'India', continent: 'Asia', cuisine_type: 'South Indian', category: 'Pickle',
        data_source: 'ICMR', verified: true, verification_sources: ['ICMR', 'Wikipedia']
      },

      // INDIAN SWEETS & DESSERTS
      {
        food_name: 'Gulab Jamun (2 pieces)', food_name_lower: 'gulab jamun (2 pieces)', 
        regional_names: ['గులాబ్ జామున్', 'गुलाब जामुन'], alternate_names: ['Rose Jamun'],
        calories: 300, protein_g: 4, fat_g: 12, carbs_g: 45, fiber_g: 1, sugar_g: 35, sodium_mg: 50,
        diabetic_rating: 'red', health_score: 30, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Rasgulla (3 pieces)', food_name_lower: 'rasgulla (3 pieces)', 
        regional_names: ['రసగుల్ల', 'रसगुल्ला'], alternate_names: ['Cottage Cheese Balls'],
        calories: 180, protein_g: 6, fat_g: 2, carbs_g: 35, fiber_g: 0, sugar_g: 30, sodium_mg: 30,
        diabetic_rating: 'red', health_score: 40, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Kaju Katli (4 pieces)', food_name_lower: 'kaju katli (4 pieces)', 
        regional_names: ['కాజు కత్లి', 'काजू कतली'], alternate_names: ['Cashew Fudge'],
        calories: 200, protein_g: 4, fat_g: 12, carbs_g: 20, fiber_g: 1, sugar_g: 18, sodium_mg: 10,
        diabetic_rating: 'red', health_score: 35, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Ladoo (2 pieces)', food_name_lower: 'ladoo (2 pieces)', 
        regional_names: ['లడ్డు', 'लड्डू'], alternate_names: ['Besan Ladoo', 'Coconut Ladoo'],
        calories: 250, protein_g: 5, fat_g: 15, carbs_g: 25, fiber_g: 2, sugar_g: 20, sodium_mg: 20,
        diabetic_rating: 'red', health_score: 40, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Kheer (1 bowl)', food_name_lower: 'kheer (1 bowl)', 
        regional_names: ['ఖీర్', 'खीर'], alternate_names: ['Rice Pudding', 'Payasam'],
        calories: 220, protein_g: 6, fat_g: 8, carbs_g: 35, fiber_g: 1, sugar_g: 25, sodium_mg: 100,
        diabetic_rating: 'yellow', health_score: 55, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Jalebi (4 pieces)', food_name_lower: 'jalebi (4 pieces)', 
        regional_names: ['జిలేబి', 'जलेबी'], alternate_names: ['Sweet Spiral'],
        calories: 280, protein_g: 2, fat_g: 10, carbs_g: 45, fiber_g: 0, sugar_g: 35, sodium_mg: 30,
        diabetic_rating: 'red', health_score: 25, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      },
      {
        food_name: 'Barfi (3 pieces)', food_name_lower: 'barfi (3 pieces)', 
        regional_names: ['బర్ఫి', 'बर्फी'], alternate_names: ['Milk Fudge'],
        calories: 180, protein_g: 3, fat_g: 8, carbs_g: 25, fiber_g: 0, sugar_g: 22, sodium_mg: 15,
        diabetic_rating: 'red', health_score: 35, country: 'India', continent: 'Asia', cuisine_type: 'Indian', category: 'Dessert',
        data_source: 'Tara Dalal', verified: true, verification_sources: ['Tara Dalal', 'Wikipedia']
      }
    ];

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      await pool.query(
        `INSERT INTO food_nutrition (
          food_name, food_name_lower, regional_names, alternate_names, calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g, sodium_mg,
          diabetic_rating, health_score, country, continent, cuisine_type, category, data_source, verified, verification_sources
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
        [
          food.food_name, food.food_name_lower, food.regional_names, food.alternate_names, food.calories, food.protein_g, food.fat_g,
          food.carbs_g, food.fiber_g, food.sugar_g, food.sodium_mg, food.diabetic_rating, food.health_score, food.country,
          food.continent, food.cuisine_type, food.category, food.data_source, food.verified, food.verification_sources
        ]
      );
      if ((i + 1) % 5 === 0) {
        console.log(`📊 Inserted ${i + 1} foods...`);
      }
    }

    console.log(`🎉 Successfully seeded ${foods.length} extensive foods!`);
    console.log('✅ Database now contains:');
    console.log('   - Fruits: Apple, Banana, Orange, Mango, Grapes');
    console.log('   - Alcohols: Beer, Wine, Whiskey, Vodka');
    console.log('   - Telugu Foods: Pulihora, Bobbatlu, Gare Gadka, Pesarattu, Gongura Pickle');
    console.log('   - Indian Sweets: Gulab Jamun, Rasgulla, Kaju Katli, Ladoo, Kheer, Jalebi, Barfi');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedExtensiveFoods();
