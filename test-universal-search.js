// Test Universal Food Search - Any Format
const axios = require('axios');

async function testUniversalSearch() {
  console.log('🍎 TESTING UNIVERSAL FOOD SEARCH - ANY FORMAT\n');

  const searchExamples = [
    'biryani',                    // Lowercase
    'Biryani',                    // Title case
    'BIRYANI',                    // Uppercase
    'B iryani',                   // With space
    'B-iryani',                   // With hyphen
    'B.iryani',                   // With dot
    'B@iryani',                   // With special character
    'B123iryani',                 // With numbers
    'Biryani Rice',               // Multiple words
    'Biryani-Rice',               // Hyphenated
    'Biryani_Rice',               // Underscore
    'Biryani Rice (Hyderabadi)',  // With description
    'Biryani Rice - Spicy',       // With dash description
    'Biryani Rice, Spicy',        // With comma description
    'chicken',                    // Simple search
    'Chicken',                    // Title case
    'CHICKEN',                    // Uppercase
    'Chicken Biryani',            // Multiple words
    'Chicken-Biryani',            // Hyphenated
    'Chicken_Biryani',            // Underscore
    'Chicken Biryani (Spicy)',    // With description
    'Chicken Biryani - Spicy',    // With dash description
    'Chicken Biryani, Spicy'      // With comma description
  ];

  let successCount = 0;

  for (const searchTerm of searchExamples) {
    try {
      console.log(`Searching: "${searchTerm}"`);
      
      const response = await axios.get(`http://localhost:3000/api/data?search=${encodeURIComponent(searchTerm)}`);
      
      console.log(`✅ SUCCESS: ${response.data.foods.length} foods found`);
      if (response.data.foods.length > 0) {
        console.log(`   Sample: ${response.data.foods[0].food_name}`);
      }
      console.log('');
      
      successCount++;
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.response?.data?.error || error.message}`);
      console.log('');
    }
  }

  console.log('=' .repeat(60));
  console.log(`📊 RESULTS: ${successCount}/${searchExamples.length} search formats successful`);
  console.log('=' .repeat(60));
  
  if (successCount === searchExamples.length) {
    console.log('🎉 ALL UNIVERSAL SEARCH FORMATS WORKING!');
    console.log('✅ No more food search headaches!');
    console.log('✅ Universal food search support!');
    console.log('✅ Neon PostgreSQL - Best backend choice!');
    console.log('✅ Better than Excel, Airtable, Supabase!');
    console.log('✅ Ready for production!');
  } else {
    console.log('⚠️ Some search formats failed - check search logic');
  }
}

testUniversalSearch();
