// Test HOMA FOODS Backend - Phase 2 Testing
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testBackend() {
  console.log('🧪 Testing HOMA FOODS Backend...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health Check:', health.data);
    console.log('');

    // Test 2: Get Stats
    console.log('2️⃣ Testing Database Stats...');
    const stats = await axios.get(`${BASE_URL}/api/data/stats`);
    console.log('✅ Database Stats:', stats.data);
    console.log('');

    // Test 3: Search Foods
    console.log('3️⃣ Testing Food Search...');
    const search = await axios.get(`${BASE_URL}/api/data?search=chicken`);
    console.log('✅ Search Results:', search.data.foods.length, 'foods found');
    console.log('   Sample:', search.data.foods[0]?.food_name);
    console.log('');

    // Test 4: Sign Up
    console.log('4️⃣ Testing User Sign Up...');
    const signup = await axios.post(`${BASE_URL}/api/auth/signup`, {
      email: 'test@homafoods.com',
      password: 'Test123!',
      confirmPassword: 'Test123!'
    });
    console.log('✅ Sign Up Success:', signup.data.message);
    console.log('   User ID:', signup.data.user.id);
    console.log('   Token:', signup.data.token ? 'Generated' : 'Missing');
    console.log('');

    const token = signup.data.token;

    // Test 5: Login
    console.log('5️⃣ Testing User Login...');
    const login = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'test@homafoods.com',
      password: 'Test123!'
    });
    console.log('✅ Login Success:', login.data.message);
    console.log('   New Token:', login.data.token ? 'Generated' : 'Missing');
    console.log('');

    // Test 6: Protected Route (Profile)
    console.log('6️⃣ Testing Protected Route...');
    const profile = await axios.get(`${BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile Access:', profile.data.user.email);
    console.log('');

    // Test 7: Search with Authentication
    console.log('7️⃣ Testing Authenticated Search...');
    const authSearch = await axios.get(`${BASE_URL}/api/data?search=idli`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Authenticated Search:', authSearch.data.foods.length, 'foods found');
    console.log('   Found:', authSearch.data.foods[0]?.food_name);
    console.log('');

    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Backend is 100% working!');
    console.log('✅ Ready for Phase 3: Frontend Development');

  } catch (error) {
    console.error('❌ Test Failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests
testBackend();
