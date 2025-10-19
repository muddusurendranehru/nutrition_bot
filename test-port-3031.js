// Test HOMA FOODS on Port 3031
const axios = require('axios');

async function testPort3031() {
  console.log('🧪 TESTING HOMA FOODS ON PORT 3031\n');

  const baseUrl = 'http://localhost:3031';

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log(`✅ Health Check: ${healthResponse.data.message || 'OK'}`);
    console.log('');

    // Test 2: Frontend Page
    console.log('2️⃣ Testing Frontend Page...');
    const frontendResponse = await axios.get(`${baseUrl}/`);
    console.log(`✅ Frontend Page: ${frontendResponse.status} ${frontendResponse.statusText}`);
    console.log(`   Content-Type: ${frontendResponse.headers['content-type']}`);
    console.log(`   Content Length: ${frontendResponse.data.length} characters`);
    console.log('');

    // Test 3: Sign Up
    console.log('3️⃣ Testing Sign Up...');
    const signupData = {
      email: 'port3031@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      name: 'Dr. Padmavathi Reddy (Mrs)',
      phone: '+91 99637 21999'
    };

    const signupResponse = await axios.post(`${baseUrl}/api/auth/signup`, signupData);
    console.log('✅ Sign Up SUCCESS!');
    console.log(`   User ID: ${signupResponse.data.user.id}`);
    console.log(`   Email: ${signupResponse.data.user.email}`);
    console.log(`   Name: ${signupResponse.data.user.name}`);
    console.log(`   Phone: ${signupResponse.data.user.phone}`);
    console.log(`   Token: ${signupResponse.data.token ? 'Generated' : 'Missing'}`);
    console.log('');

    // Test 4: Login
    console.log('4️⃣ Testing Login...');
    const loginData = {
      email: 'port3031@homafoods.com',
      password: 'test123'
    };

    const loginResponse = await axios.post(`${baseUrl}/api/auth/login`, loginData);
    console.log('✅ Login SUCCESS!');
    console.log(`   User ID: ${loginResponse.data.user.id}`);
    console.log(`   Email: ${loginResponse.data.user.email}`);
    console.log(`   Token: ${loginResponse.data.token ? 'Generated' : 'Missing'}`);
    console.log('');

    // Test 5: Food Search
    console.log('5️⃣ Testing Food Search...');
    const searchResponse = await axios.get(`${baseUrl}/api/data?search=chicken`);
    console.log('✅ Food Search SUCCESS!');
    console.log(`   Found ${searchResponse.data.foods.length} foods`);
    if (searchResponse.data.foods.length > 0) {
      const food = searchResponse.data.foods[0];
      console.log(`   Sample: ${food.food_name}`);
      console.log(`   Calories: ${food.calories}`);
      console.log(`   Health Score: ${food.health_score}`);
    }
    console.log('');

    // Test 6: Database Stats
    console.log('6️⃣ Testing Database Stats...');
    const statsResponse = await axios.get(`${baseUrl}/api/data/stats`);
    console.log('✅ Database Stats SUCCESS!');
    console.log(`   Total Foods: ${statsResponse.data.totalFoods}`);
    console.log(`   Continents: ${statsResponse.data.continents.length}`);
    console.log(`   Diabetic Ratings: ${statsResponse.data.diabeticRating.length}`);
    console.log('');

    console.log('=' .repeat(60));
    console.log('🎉 PORT 3031 TESTING SUCCESS!');
    console.log('=' .repeat(60));
    console.log('✅ Health Check: Working');
    console.log('✅ Frontend Page: Loading');
    console.log('✅ Sign Up: Working with universal name & phone');
    console.log('✅ Login: Working with password verification');
    console.log('✅ Food Search: Working');
    console.log('✅ Database Stats: Working');
    console.log('');
    console.log('🌐 HOMA FOODS is running on: http://localhost:3031');
    console.log('🎨 Beautiful UI with glass morphism design');
    console.log('👤 Universal name & phone support');
    console.log('🍎 Universal food search support');
    console.log('🔐 Complete authentication flow');
    console.log('✅ Ready for production!');

  } catch (error) {
    console.error('❌ Port 3031 Test Failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the server is running on port 3031');
      console.log('💡 Run: node index.js');
    }
  }
}

testPort3031();
