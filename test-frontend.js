// Test HOMA FOODS Frontend Integration
const axios = require('axios');

async function testFrontendIntegration() {
  console.log('🧪 Testing HOMA FOODS Frontend Integration...\n');

  try {
    // Test 1: Frontend page loads
    console.log('1️⃣ Testing Frontend Page...');
    const frontend = await axios.get('http://localhost:3000/');
    console.log('✅ Frontend page loads successfully');
    console.log('   Status:', frontend.status);
    console.log('   Content-Type:', frontend.headers['content-type']);
    console.log('');

    // Test 2: Sign Up Flow
    console.log('2️⃣ Testing Sign Up Flow...');
    const signup = await axios.post('http://localhost:3000/api/auth/signup', {
      email: 'frontend@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123'
    });
    console.log('✅ Sign Up Success:', signup.data.message);
    console.log('   User ID:', signup.data.user.id);
    console.log('   Token Generated:', signup.data.token ? 'Yes' : 'No');
    console.log('');

    const token = signup.data.token;

    // Test 3: Login Flow
    console.log('3️⃣ Testing Login Flow...');
    const login = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'frontend@homafoods.com',
      password: 'test123'
    });
    console.log('✅ Login Success:', login.data.message);
    console.log('   New Token Generated:', login.data.token ? 'Yes' : 'No');
    console.log('');

    // Test 4: Protected Route
    console.log('4️⃣ Testing Protected Route...');
    const profile = await axios.get('http://localhost:3000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile Access:', profile.data.user.email);
    console.log('');

    // Test 5: Food Search
    console.log('5️⃣ Testing Food Search...');
    const search = await axios.get('http://localhost:3000/api/data?search=chicken');
    console.log('✅ Search Results:', search.data.foods.length, 'foods found');
    console.log('   Sample Food:', search.data.foods[0]?.food_name);
    console.log('   Calories:', search.data.foods[0]?.calories);
    console.log('   Diabetic Rating:', search.data.foods[0]?.diabetic_rating);
    console.log('');

    // Test 6: Stats API
    console.log('6️⃣ Testing Stats API...');
    const stats = await axios.get('http://localhost:3000/api/data/stats');
    console.log('✅ Stats Retrieved:');
    console.log('   Total Foods:', stats.data.totalFoods);
    console.log('   Continents:', stats.data.continents.length);
    console.log('   Diabetic Ratings:', stats.data.diabeticRating.length);
    console.log('');

    console.log('🎉 ALL FRONTEND INTEGRATION TESTS PASSED!');
    console.log('✅ Frontend + Backend working perfectly!');
    console.log('✅ Ready for user testing!');
    console.log('');
    console.log('🌐 Open your browser and go to: http://localhost:3000');
    console.log('📝 Test the complete flow:');
    console.log('   1. Sign Up with any email/password');
    console.log('   2. Login with same credentials');
    console.log('   3. Search for foods (chicken, idli, pulihora)');
    console.log('   4. View speedometer ratings');
    console.log('   5. Logout');

  } catch (error) {
    console.error('❌ Test Failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests
testFrontendIntegration();
