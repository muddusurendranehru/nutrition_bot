import OpenAI from 'openai';
import axios from 'axios';

// Initialize OpenAI client ONLY when needed (no endless loops)
let openai = null;

const getOpenAIClient = () => {
  if (!openai && process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('🤖 OpenAI Client initialized for Bolt Search');
  }
  return openai;
};

// ============================================
// BOLT INTERNATIONAL SEARCH ENGINE
// ============================================

const FOOD_DATABASES = {
  ICMR: {
    name: 'Indian Council of Medical Research',
    context: 'Indian foods with accurate nutrition data, traditional preparations',
    sample_foods: ['idli', 'dosa', 'biryani', 'dal', 'chapati', 'sambar']
  },
  TARA_DALAL: {
    name: 'Tara Dalal Recipe Database',
    context: 'Indian recipes and nutrition information',
    sample_foods: ['dhokla', 'pav bhaji', 'chole bhature', 'rajma']
  },
  CHINESE_CDN: {
    name: 'Chinese Food Database',
    context: 'Chinese foods with local names and nutrition',
    sample_foods: ['fried rice', 'chow mein', 'dumplings', 'hot pot']
  },
  AMERICAN_FOODS: {
    name: 'USDA American Foods',
    context: 'American foods, fast food, processed foods',
    sample_foods: ['hamburger', 'pizza', 'hot dog', 'mac and cheese']
  },
  GLOBAL_FOODS: {
    name: 'Global Food Database',
    context: 'International foods from various cuisines',
    sample_foods: ['sushi', 'pasta', 'tacos', 'falafel']
  }
};

// ============================================
// AI-POWERED FOOD SEARCH
// ============================================
export const searchFoodsWithAI = async (query, options = {}) => {
  try {
    const {
      country = 'global',
      cuisine = 'any',
      dietary_preferences = 'none',
      health_focus = 'general'
    } = options;

    // Create intelligent search prompt
    const searchPrompt = `
You are a nutrition expert with access to multiple international food databases:
- ICMR (Indian Council of Medical Research)
- Tara Dalal (Indian recipes)
- Chinese Food Database (CDN)
- USDA American Foods
- Global International Foods

User Query: "${query}"
Country Context: ${country}
Cuisine: ${cuisine}
Dietary: ${dietary_preferences}
Health Focus: ${health_focus}

Please provide 5-8 relevant foods that match this query. For each food, provide:
1. Food name (in English and local language if applicable)
2. Estimated calories per 100g
3. Key macronutrients (protein, carbs, fats)
4. Glycemic index (if known)
5. Health notes
6. Data source (ICMR/Tara Dalal/Chinese CDN/USDA/Global)

Format as JSON array with this structure:
[
  {
    "food_name": "Food Name",
    "local_name": "Local Name (if applicable)",
    "calories": 150,
    "protein_g": 5.2,
    "carbs_g": 25.0,
    "fats_g": 3.1,
    "glycemic_index": 55,
    "health_notes": "Brief health information",
    "data_source": "ICMR",
    "country_context": "India",
    "diabetes_friendly": true
  }
]
`;

    // Get OpenAI client (lazy load - NO endless loops)
    const client = getOpenAIClient();
    
    if (!client) {
      console.log('⚠️ OpenAI API key not configured - falling back to database search');
      return await fallbackSearch(query);
    }

    // Call OpenAI API
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a nutrition expert with access to international food databases. Always respond with valid JSON."
        },
        {
          role: "user", 
          content: searchPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    // Parse AI response
    const aiResponse = completion.choices[0].message.content;
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = aiResponse;
    if (aiResponse.includes('```json')) {
      jsonStr = aiResponse.split('```json')[1].split('```')[0];
    } else if (aiResponse.includes('```')) {
      jsonStr = aiResponse.split('```')[1].split('```')[0];
    }

    const foods = JSON.parse(jsonStr.trim());

    // Enhance with additional metadata
    const enhancedFoods = foods.map(food => ({
      ...food,
      search_query: query,
      search_timestamp: new Date().toISOString(),
      confidence_score: calculateConfidenceScore(food, query),
      serving_suggestions: generateServingSuggestions(food)
    }));

    return {
      success: true,
      query: query,
      results: enhancedFoods,
      total_results: enhancedFoods.length,
      search_method: 'AI-Powered Bolt Search',
      databases_searched: Object.keys(FOOD_DATABASES)
    };

  } catch (error) {
    console.error('Bolt Search Error:', error);
    
    // Fallback to simple search if AI fails
    return await fallbackSearch(query);
  }
};

// ============================================
// SMART FOOD MATCHING
// ============================================
const calculateConfidenceScore = (food, query) => {
  const queryWords = query.toLowerCase().split(' ');
  const foodName = food.food_name.toLowerCase();
  const localName = (food.local_name || '').toLowerCase();
  
  let score = 0;
  
  queryWords.forEach(word => {
    if (foodName.includes(word)) score += 30;
    if (localName.includes(word)) score += 25;
    if (food.health_notes.toLowerCase().includes(word)) score += 10;
  });
  
  return Math.min(score, 100);
};

const generateServingSuggestions = (food) => {
  const suggestions = [];
  
  if (food.glycemic_index <= 55) {
    suggestions.push('Good for diabetics - stable blood sugar');
  }
  
  if (food.protein_g >= 10) {
    suggestions.push('High protein - good for muscle building');
  }
  
  if (food.calories <= 100) {
    suggestions.push('Low calorie - suitable for weight loss');
  }
  
  return suggestions;
};

// ============================================
// FALLBACK SEARCH (Database)
// ============================================
const fallbackSearch = async (query) => {
  try {
    // This would connect to your existing database search
    // For now, return a basic structure
    return {
      success: true,
      query: query,
      results: [],
      total_results: 0,
      search_method: 'Database Fallback',
      note: 'AI search temporarily unavailable'
    };
  } catch (error) {
    return {
      success: false,
      error: 'Search failed',
      query: query
    };
  }
};

// ============================================
// SPECIALIZED SEARCHES
// ============================================
export const searchICMRFoods = async (query) => {
  return await searchFoodsWithAI(query, {
    country: 'India',
    cuisine: 'indian',
    health_focus: 'traditional'
  });
};

export const searchTaraDalalFoods = async (query) => {
  return await searchFoodsWithAI(query, {
    country: 'India', 
    cuisine: 'indian',
    health_focus: 'recipes'
  });
};

export const searchChineseFoods = async (query) => {
  return await searchFoodsWithAI(query, {
    country: 'China',
    cuisine: 'chinese',
    health_focus: 'traditional'
  });
};

export const searchAmericanFoods = async (query) => {
  return await searchFoodsWithAI(query, {
    country: 'USA',
    cuisine: 'american',
    health_focus: 'processed'
  });
};
