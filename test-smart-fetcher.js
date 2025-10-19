const SmartFoodFetcher = require('./database/smart-food-fetcher');

async function testSmartFetcher() {
  console.log('🧪 Testing Smart Food Fetcher...');
  
  const fetcher = new SmartFoodFetcher();
  
  // Test 1: Search for nachos
  console.log('\n🔍 Test 1: Searching for "nachos"');
  const nachos = await fetcher.searchAndAddFood('nachos', 'mexican');
  if (nachos) {
    console.log('✅ Nachos found/added:', nachos.food_name);
  } else {
    console.log('❌ Nachos not found');
  }
  
  // Test 2: Search for tacos
  console.log('\n🔍 Test 2: Searching for "tacos"');
  const tacos = await fetcher.searchAndAddFood('tacos', 'mexican');
  if (tacos) {
    console.log('✅ Tacos found/added:', tacos.food_name);
  } else {
    console.log('❌ Tacos not found');
  }
  
  // Test 3: Bulk add multiple foods
  console.log('\n🔍 Test 3: Bulk adding multiple foods');
  const foodList = [
    { name: 'nachos', cuisine: 'mexican' },
    { name: 'tacos', cuisine: 'mexican' },
    { name: 'burrito', cuisine: 'mexican' },
    { name: 'pizza', cuisine: 'italian' },
    { name: 'pasta', cuisine: 'italian' }
  ];
  
  const result = await fetcher.bulkAddFoods(foodList);
  console.log('📊 Bulk addition result:', result);
  
  console.log('\n🎉 Smart Food Fetcher test complete!');
}

testSmartFetcher().catch(console.error);
