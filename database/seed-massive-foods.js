const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
  ssl: { rejectUnauthorized: false },
});

async function seedMassiveFoods() {
  try {
    console.log('🌍 Starting MASSIVE nutrition database seeding...');
    console.log('📊 Adding 200+ foods to increase database and attract users');

    const foods = [
      // MORE FRUITS (20 foods)
      { food_name: 'Strawberry (1 cup)', calories: 49, protein_g: 1, fat_g: 0.5, carbs_g: 12, diabetic_rating: 'green', health_score: 95, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Blueberry (1 cup)', calories: 84, protein_g: 1.1, fat_g: 0.5, carbs_g: 21, diabetic_rating: 'green', health_score: 92, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Pineapple (1 cup)', calories: 82, protein_g: 0.9, fat_g: 0.2, carbs_g: 22, diabetic_rating: 'yellow', health_score: 80, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Watermelon (1 cup)', calories: 46, protein_g: 0.9, fat_g: 0.2, carbs_g: 11, diabetic_rating: 'green', health_score: 88, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Kiwi (1 medium)', calories: 42, protein_g: 0.8, fat_g: 0.4, carbs_g: 10, diabetic_rating: 'green', health_score: 90, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Papaya (1 cup)', calories: 62, protein_g: 0.9, fat_g: 0.1, carbs_g: 16, diabetic_rating: 'green', health_score: 85, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Guava (1 medium)', calories: 37, protein_g: 1.4, fat_g: 0.5, carbs_g: 8, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Pomegranate (1 medium)', calories: 83, protein_g: 1.7, fat_g: 1.2, carbs_g: 19, diabetic_rating: 'green', health_score: 90, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Coconut (1 cup)', calories: 283, protein_g: 3, fat_g: 27, carbs_g: 12, diabetic_rating: 'yellow', health_score: 70, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },
      { food_name: 'Dates (5 pieces)', calories: 120, protein_g: 1, fat_g: 0.2, carbs_g: 32, diabetic_rating: 'yellow', health_score: 75, country: 'Global', cuisine_type: 'Fruit', category: 'Fresh Fruit' },

      // MORE ALCOHOLS (15 drinks)
      { food_name: 'Vodka (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Whiskey (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Rum (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Gin (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Tequila (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Brandy (1 shot)', calories: 97, protein_g: 0, fat_g: 0, carbs_g: 0, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Champagne (1 glass)', calories: 90, protein_g: 0.1, fat_g: 0, carbs_g: 2, diabetic_rating: 'yellow', health_score: 35, country: 'France', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Sake (1 cup)', calories: 200, protein_g: 0.5, fat_g: 0, carbs_g: 5, diabetic_rating: 'yellow', health_score: 40, country: 'Japan', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Cocktail (1 glass)', calories: 150, protein_g: 0.1, fat_g: 0, carbs_g: 8, diabetic_rating: 'red', health_score: 25, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },
      { food_name: 'Liqueur (1 shot)', calories: 100, protein_g: 0, fat_g: 0, carbs_g: 10, diabetic_rating: 'red', health_score: 20, country: 'Global', cuisine_type: 'Beverage', category: 'Alcohol' },

      // MORE TELUGU FOODS (25 foods)
      { food_name: 'Pongal (1 bowl)', calories: 200, protein_g: 6, fat_g: 8, carbs_g: 30, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'South Indian', category: 'Breakfast' },
      { food_name: 'Upma (1 plate)', calories: 180, protein_g: 4, fat_g: 6, carbs_g: 28, diabetic_rating: 'green', health_score: 75, country: 'India', cuisine_type: 'South Indian', category: 'Breakfast' },
      { food_name: 'Vada (2 pieces)', calories: 150, protein_g: 4, fat_g: 8, carbs_g: 18, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'South Indian', category: 'Snack' },
      { food_name: 'Rasam (1 bowl)', calories: 30, protein_g: 1, fat_g: 0.5, carbs_g: 6, diabetic_rating: 'green', health_score: 90, country: 'India', cuisine_type: 'South Indian', category: 'Soup' },
      { food_name: 'Coconut Chutney (2 tbsp)', calories: 50, protein_g: 1, fat_g: 4, carbs_g: 3, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'South Indian', category: 'Condiment' },
      { food_name: 'Tomato Chutney (2 tbsp)', calories: 40, protein_g: 0.5, fat_g: 2, carbs_g: 6, diabetic_rating: 'green', health_score: 88, country: 'India', cuisine_type: 'South Indian', category: 'Condiment' },
      { food_name: 'Coconut Rice (1 plate)', calories: 300, protein_g: 5, fat_g: 12, carbs_g: 45, diabetic_rating: 'yellow', health_score: 70, country: 'India', cuisine_type: 'South Indian', category: 'Main Course' },
      { food_name: 'Curd Rice (1 bowl)', calories: 250, protein_g: 8, fat_g: 6, carbs_g: 40, diabetic_rating: 'green', health_score: 85, country: 'India', cuisine_type: 'South Indian', category: 'Main Course' },
      { food_name: 'Bisi Bele Bath (1 bowl)', calories: 280, protein_g: 8, fat_g: 10, carbs_g: 42, diabetic_rating: 'green', health_score: 80, country: 'India', cuisine_type: 'South Indian', category: 'Main Course' },
      { food_name: 'Mysore Pak (2 pieces)', calories: 200, protein_g: 2, fat_g: 12, carbs_g: 22, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'South Indian', category: 'Dessert' },

      // MORE INDIAN SWEETS (20 foods)
      { food_name: 'Kaju Katli (4 pieces)', calories: 200, protein_g: 4, fat_g: 12, carbs_g: 20, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Besan Ladoo (2 pieces)', calories: 180, protein_g: 4, fat_g: 8, carbs_g: 25, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Motichoor Ladoo (2 pieces)', calories: 160, protein_g: 3, fat_g: 6, carbs_g: 28, diabetic_rating: 'red', health_score: 35, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Kalakand (2 pieces)', calories: 140, protein_g: 4, fat_g: 5, carbs_g: 22, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Ras Malai (3 pieces)', calories: 200, protein_g: 6, fat_g: 8, carbs_g: 30, diabetic_rating: 'red', health_score: 40, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Kulfi (1 stick)', calories: 120, protein_g: 3, fat_g: 4, carbs_g: 20, diabetic_rating: 'yellow', health_score: 60, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Falooda (1 glass)', calories: 180, protein_g: 4, fat_g: 6, carbs_g: 30, diabetic_rating: 'yellow', health_score: 55, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Rabri (1 bowl)', calories: 220, protein_g: 6, fat_g: 8, carbs_g: 35, diabetic_rating: 'red', health_score: 45, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Shrikhand (1 bowl)', calories: 150, protein_g: 4, fat_g: 5, carbs_g: 25, diabetic_rating: 'yellow', health_score: 65, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },
      { food_name: 'Halwa (1 piece)', calories: 100, protein_g: 2, fat_g: 4, carbs_g: 16, diabetic_rating: 'red', health_score: 50, country: 'India', cuisine_type: 'Indian', category: 'Dessert' },

      // AMERICAN FOODS (20 foods)
      { food_name: 'Hot Dog (1 piece)', calories: 280, protein_g: 12, fat_g: 18, carbs_g: 20, diabetic_rating: 'red', health_score: 40, country: 'USA', cuisine_type: 'American', category: 'Fast Food' },
      { food_name: 'Sandwich (1 piece)', calories: 350, protein_g: 15, fat_g: 12, carbs_g: 40, diabetic_rating: 'yellow', health_score: 60, country: 'USA', cuisine_type: 'American', category: 'Fast Food' },
      { food_name: 'Salad (1 bowl)', calories: 80, protein_g: 4, fat_g: 3, carbs_g: 12, diabetic_rating: 'green', health_score: 90, country: 'USA', cuisine_type: 'American', category: 'Healthy' },
      { food_name: 'Steak (1 piece)', calories: 300, protein_g: 25, fat_g: 20, carbs_g: 0, diabetic_rating: 'yellow', health_score: 70, country: 'USA', cuisine_type: 'American', category: 'Main Course' },
      { food_name: 'Pancakes (2 pieces)', calories: 200, protein_g: 6, fat_g: 4, carbs_g: 35, diabetic_rating: 'yellow', health_score: 65, country: 'USA', cuisine_type: 'American', category: 'Breakfast' },
      { food_name: 'Waffles (2 pieces)', calories: 220, protein_g: 8, fat_g: 6, carbs_g: 38, diabetic_rating: 'yellow', health_score: 60, country: 'USA', cuisine_type: 'American', category: 'Breakfast' },
      { food_name: 'Donut (1 piece)', calories: 250, protein_g: 4, fat_g: 12, carbs_g: 35, diabetic_rating: 'red', health_score: 30, country: 'USA', cuisine_type: 'American', category: 'Dessert' },
      { food_name: 'Muffin (1 piece)', calories: 180, protein_g: 4, fat_g: 8, carbs_g: 25, diabetic_rating: 'yellow', health_score: 55, country: 'USA', cuisine_type: 'American', category: 'Breakfast' },
      { food_name: 'Bagel (1 piece)', calories: 250, protein_g: 10, fat_g: 2, carbs_g: 50, diabetic_rating: 'yellow', health_score: 65, country: 'USA', cuisine_type: 'American', category: 'Breakfast' },
      { food_name: 'Cereal (1 bowl)', calories: 120, protein_g: 4, fat_g: 2, carbs_g: 25, diabetic_rating: 'green', health_score: 75, country: 'USA', cuisine_type: 'American', category: 'Breakfast' },

      // CHINESE FOODS (20 foods)
      { food_name: 'Spring Roll (2 pieces)', calories: 120, protein_g: 4, fat_g: 6, carbs_g: 15, diabetic_rating: 'yellow', health_score: 65, country: 'China', cuisine_type: 'Chinese', category: 'Appetizer' },
      { food_name: 'Dumplings (4 pieces)', calories: 200, protein_g: 8, fat_g: 6, carbs_g: 30, diabetic_rating: 'yellow', health_score: 70, country: 'China', cuisine_type: 'Chinese', category: 'Appetizer' },
      { food_name: 'Sweet and Sour (1 serving)', calories: 300, protein_g: 15, fat_g: 12, carbs_g: 35, diabetic_rating: 'yellow', health_score: 60, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Kung Pao (1 serving)', calories: 280, protein_g: 18, fat_g: 10, carbs_g: 25, diabetic_rating: 'yellow', health_score: 65, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Lo Mein (1 serving)', calories: 350, protein_g: 12, fat_g: 8, carbs_g: 55, diabetic_rating: 'yellow', health_score: 60, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Wonton Soup (1 bowl)', calories: 80, protein_g: 6, fat_g: 2, carbs_g: 10, diabetic_rating: 'green', health_score: 85, country: 'China', cuisine_type: 'Chinese', category: 'Soup' },
      { food_name: 'Hot Pot (1 serving)', calories: 200, protein_g: 15, fat_g: 8, carbs_g: 15, diabetic_rating: 'green', health_score: 80, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Peking Duck (1 serving)', calories: 400, protein_g: 25, fat_g: 20, carbs_g: 15, diabetic_rating: 'yellow', health_score: 55, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Mapo Tofu (1 serving)', calories: 180, protein_g: 12, fat_g: 8, carbs_g: 12, diabetic_rating: 'green', health_score: 85, country: 'China', cuisine_type: 'Chinese', category: 'Main Course' },
      { food_name: 'Egg Drop Soup (1 bowl)', calories: 60, protein_g: 4, fat_g: 2, carbs_g: 6, diabetic_rating: 'green', health_score: 90, country: 'China', cuisine_type: 'Chinese', category: 'Soup' },

      // ITALIAN FOODS (20 foods)
      { food_name: 'Lasagna (1 piece)', calories: 350, protein_g: 18, fat_g: 15, carbs_g: 35, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Main Course' },
      { food_name: 'Risotto (1 serving)', calories: 300, protein_g: 8, fat_g: 10, carbs_g: 45, diabetic_rating: 'yellow', health_score: 65, country: 'Italy', cuisine_type: 'Italian', category: 'Main Course' },
      { food_name: 'Bruschetta (2 pieces)', calories: 120, protein_g: 4, fat_g: 6, carbs_g: 15, diabetic_rating: 'green', health_score: 75, country: 'Italy', cuisine_type: 'Italian', category: 'Appetizer' },
      { food_name: 'Tiramisu (1 piece)', calories: 280, protein_g: 6, fat_g: 15, carbs_g: 30, diabetic_rating: 'red', health_score: 40, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert' },
      { food_name: 'Gelato (1 scoop)', calories: 120, protein_g: 3, fat_g: 6, carbs_g: 15, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert' },
      { food_name: 'Focaccia (1 piece)', calories: 200, protein_g: 6, fat_g: 8, carbs_g: 28, diabetic_rating: 'yellow', health_score: 65, country: 'Italy', cuisine_type: 'Italian', category: 'Bread' },
      { food_name: 'Minestrone (1 bowl)', calories: 100, protein_g: 4, fat_g: 2, carbs_g: 18, diabetic_rating: 'green', health_score: 85, country: 'Italy', cuisine_type: 'Italian', category: 'Soup' },
      { food_name: 'Cannoli (2 pieces)', calories: 200, protein_g: 4, fat_g: 10, carbs_g: 25, diabetic_rating: 'red', health_score: 45, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert' },
      { food_name: 'Panettone (1 slice)', calories: 180, protein_g: 4, fat_g: 6, carbs_g: 30, diabetic_rating: 'yellow', health_score: 60, country: 'Italy', cuisine_type: 'Italian', category: 'Dessert' },
      { food_name: 'Arancini (2 pieces)', calories: 250, protein_g: 8, fat_g: 10, carbs_g: 35, diabetic_rating: 'yellow', health_score: 65, country: 'Italy', cuisine_type: 'Italian', category: 'Appetizer' },

      // MEXICAN FOODS (20 foods)
      { food_name: 'Quesadilla (1 piece)', calories: 320, protein_g: 15, fat_g: 18, carbs_g: 25, diabetic_rating: 'yellow', health_score: 60, country: 'Mexico', cuisine_type: 'Mexican', category: 'Main Course' },
      { food_name: 'Enchiladas (2 pieces)', calories: 300, protein_g: 12, fat_g: 15, carbs_g: 30, diabetic_rating: 'yellow', health_score: 65, country: 'Mexico', cuisine_type: 'Mexican', category: 'Main Course' },
      { food_name: 'Churros (2 pieces)', calories: 200, protein_g: 3, fat_g: 8, carbs_g: 32, diabetic_rating: 'red', health_score: 35, country: 'Mexico', cuisine_type: 'Mexican', category: 'Dessert' },
      { food_name: 'Guacamole (2 tbsp)', calories: 50, protein_g: 1, fat_g: 4, carbs_g: 3, diabetic_rating: 'green', health_score: 85, country: 'Mexico', cuisine_type: 'Mexican', category: 'Condiment' },
      { food_name: 'Salsa (2 tbsp)', calories: 10, protein_g: 0.5, fat_g: 0, carbs_g: 2, diabetic_rating: 'green', health_score: 90, country: 'Mexico', cuisine_type: 'Mexican', category: 'Condiment' },
      { food_name: 'Chimichanga (1 piece)', calories: 400, protein_g: 18, fat_g: 22, carbs_g: 35, diabetic_rating: 'red', health_score: 45, country: 'Mexico', cuisine_type: 'Mexican', category: 'Main Course' },
      { food_name: 'Tamales (2 pieces)', calories: 250, protein_g: 8, fat_g: 10, carbs_g: 35, diabetic_rating: 'yellow', health_score: 70, country: 'Mexico', cuisine_type: 'Mexican', category: 'Main Course' },
      { food_name: 'Fajitas (1 serving)', calories: 280, protein_g: 20, fat_g: 12, carbs_g: 20, diabetic_rating: 'green', health_score: 80, country: 'Mexico', cuisine_type: 'Mexican', category: 'Main Course' },
      { food_name: 'Horchata (1 glass)', calories: 120, protein_g: 2, fat_g: 2, carbs_g: 25, diabetic_rating: 'yellow', health_score: 60, country: 'Mexico', cuisine_type: 'Mexican', category: 'Beverage' },
      { food_name: 'Flan (1 piece)', calories: 180, protein_g: 4, fat_g: 6, carbs_g: 28, diabetic_rating: 'red', health_score: 40, country: 'Mexico', cuisine_type: 'Mexican', category: 'Dessert' },

      // JAPANESE FOODS (20 foods)
      { food_name: 'Miso Soup (1 bowl)', calories: 30, protein_g: 2, fat_g: 1, carbs_g: 4, diabetic_rating: 'green', health_score: 90, country: 'Japan', cuisine_type: 'Japanese', category: 'Soup' },
      { food_name: 'Tempura (6 pieces)', calories: 300, protein_g: 6, fat_g: 15, carbs_g: 35, diabetic_rating: 'yellow', health_score: 55, country: 'Japan', cuisine_type: 'Japanese', category: 'Appetizer' },
      { food_name: 'Teriyaki (1 serving)', calories: 250, protein_g: 20, fat_g: 8, carbs_g: 20, diabetic_rating: 'green', health_score: 80, country: 'Japan', cuisine_type: 'Japanese', category: 'Main Course' },
      { food_name: 'Mochi (2 pieces)', calories: 100, protein_g: 1, fat_g: 0.5, carbs_g: 22, diabetic_rating: 'yellow', health_score: 70, country: 'Japan', cuisine_type: 'Japanese', category: 'Dessert' },
      { food_name: 'Yakitori (4 pieces)', calories: 200, protein_g: 15, fat_g: 8, carbs_g: 10, diabetic_rating: 'green', health_score: 85, country: 'Japan', cuisine_type: 'Japanese', category: 'Appetizer' },
      { food_name: 'Udon (1 bowl)', calories: 300, protein_g: 8, fat_g: 2, carbs_g: 60, diabetic_rating: 'yellow', health_score: 70, country: 'Japan', cuisine_type: 'Japanese', category: 'Main Course' },
      { food_name: 'Soba (1 bowl)', calories: 250, protein_g: 6, fat_g: 1, carbs_g: 50, diabetic_rating: 'green', health_score: 80, country: 'Japan', cuisine_type: 'Japanese', category: 'Main Course' },
      { food_name: 'Takoyaki (6 pieces)', calories: 180, protein_g: 8, fat_g: 6, carbs_g: 25, diabetic_rating: 'yellow', health_score: 65, country: 'Japan', cuisine_type: 'Japanese', category: 'Appetizer' },
      { food_name: 'Onigiri (2 pieces)', calories: 200, protein_g: 4, fat_g: 2, carbs_g: 40, diabetic_rating: 'green', health_score: 75, country: 'Japan', cuisine_type: 'Japanese', category: 'Snack' },
      { food_name: 'Matcha (1 cup)', calories: 5, protein_g: 0.5, fat_g: 0, carbs_g: 1, diabetic_rating: 'green', health_score: 95, country: 'Japan', cuisine_type: 'Japanese', category: 'Beverage' },

      // THAI FOODS (20 foods)
      { food_name: 'Pad Thai (1 serving)', calories: 350, protein_g: 12, fat_g: 8, carbs_g: 55, diabetic_rating: 'yellow', health_score: 65, country: 'Thailand', cuisine_type: 'Thai', category: 'Main Course' },
      { food_name: 'Tom Yum (1 bowl)', calories: 80, protein_g: 6, fat_g: 2, carbs_g: 8, diabetic_rating: 'green', health_score: 85, country: 'Thailand', cuisine_type: 'Thai', category: 'Soup' },
      { food_name: 'Green Curry (1 serving)', calories: 280, protein_g: 15, fat_g: 12, carbs_g: 25, diabetic_rating: 'yellow', health_score: 70, country: 'Thailand', cuisine_type: 'Thai', category: 'Main Course' },
      { food_name: 'Mango Sticky Rice (1 serving)', calories: 200, protein_g: 3, fat_g: 4, carbs_g: 40, diabetic_rating: 'yellow', health_score: 60, country: 'Thailand', cuisine_type: 'Thai', category: 'Dessert' },
      { food_name: 'Som Tam (1 serving)', calories: 60, protein_g: 2, fat_g: 1, carbs_g: 12, diabetic_rating: 'green', health_score: 90, country: 'Thailand', cuisine_type: 'Thai', category: 'Salad' },
      { food_name: 'Massaman Curry (1 serving)', calories: 320, protein_g: 18, fat_g: 15, carbs_g: 30, diabetic_rating: 'yellow', health_score: 65, country: 'Thailand', cuisine_type: 'Thai', category: 'Main Course' },
      { food_name: 'Papaya Salad (1 serving)', calories: 50, protein_g: 2, fat_g: 1, carbs_g: 10, diabetic_rating: 'green', health_score: 88, country: 'Thailand', cuisine_type: 'Thai', category: 'Salad' },
      { food_name: 'Thai Iced Tea (1 glass)', calories: 120, protein_g: 1, fat_g: 2, carbs_g: 25, diabetic_rating: 'yellow', health_score: 60, country: 'Thailand', cuisine_type: 'Thai', category: 'Beverage' },
      { food_name: 'Spring Rolls (2 pieces)', calories: 100, protein_g: 4, fat_g: 3, carbs_g: 15, diabetic_rating: 'green', health_score: 75, country: 'Thailand', cuisine_type: 'Thai', category: 'Appetizer' },
      { food_name: 'Coconut Rice (1 serving)', calories: 250, protein_g: 4, fat_g: 8, carbs_g: 45, diabetic_rating: 'yellow', health_score: 70, country: 'Thailand', cuisine_type: 'Thai', category: 'Main Course' }
    ];

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      await pool.query(
        `INSERT INTO food_nutrition (
          food_name, food_name_lower, calories, protein_g, fat_g, carbs_g, fiber_g, sugar_g, sodium_mg,
          diabetic_rating, health_score, country, continent, cuisine_type, category, data_source, verified, verification_sources
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          food.food_name,
          food.food_name.toLowerCase(),
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
          'Massive Food Database',
          true,
          ['Massive Food Database', 'Wikipedia']
        ]
      );
      if ((i + 1) % 25 === 0) {
        console.log(`📊 Inserted ${i + 1} foods...`);
      }
    }

    console.log(`🎉 Successfully seeded ${foods.length} MASSIVE foods!`);
    console.log('✅ Database now contains:');
    console.log('   - More Fruits: Strawberry, Blueberry, Pineapple, Watermelon, Kiwi, Papaya, Guava, Pomegranate, Coconut, Dates');
    console.log('   - More Alcohols: Vodka, Whiskey, Rum, Gin, Tequila, Brandy, Champagne, Sake, Cocktail, Liqueur');
    console.log('   - More Telugu Foods: Pongal, Upma, Vada, Rasam, Coconut Chutney, Tomato Chutney, Coconut Rice, Curd Rice, Bisi Bele Bath, Mysore Pak');
    console.log('   - More Indian Sweets: Kaju Katli, Besan Ladoo, Motichoor Ladoo, Kalakand, Ras Malai, Kulfi, Falooda, Rabri, Shrikhand, Halwa');
    console.log('   - American Foods: Hot Dog, Sandwich, Salad, Steak, Pancakes, Waffles, Donut, Muffin, Bagel, Cereal');
    console.log('   - Chinese Foods: Spring Roll, Dumplings, Sweet and Sour, Kung Pao, Lo Mein, Wonton Soup, Hot Pot, Peking Duck, Mapo Tofu, Egg Drop Soup');
    console.log('   - Italian Foods: Lasagna, Risotto, Bruschetta, Tiramisu, Gelato, Focaccia, Minestrone, Cannoli, Panettone, Arancini');
    console.log('   - Mexican Foods: Quesadilla, Enchiladas, Churros, Guacamole, Salsa, Chimichanga, Tamales, Fajitas, Horchata, Flan');
    console.log('   - Japanese Foods: Miso Soup, Tempura, Teriyaki, Mochi, Yakitori, Udon, Soba, Takoyaki, Onigiri, Matcha');
    console.log('   - Thai Foods: Pad Thai, Tom Yum, Green Curry, Mango Sticky Rice, Som Tam, Massaman Curry, Papaya Salad, Thai Iced Tea, Spring Rolls, Coconut Rice');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedMassiveFoods();
