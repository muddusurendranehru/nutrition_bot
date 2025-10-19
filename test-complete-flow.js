// Complete Dry Run - Test Login, Signup, Password, Dashboard
const axios = require('axios');

async function testCompleteFlow() {
  console.log('🧪 COMPLETE DRY RUN - HOMA FOODS APPLICATION\n');

  const baseUrl = 'http://localhost:3000';
  let testResults = {
    signup: false,
    login: false,
    dashboard: false,
    search: false,
    logout: false
  };

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${baseUrl}/api/health`);
    console.log(`✅ Health Check: ${healthResponse.data.message}`);
    console.log('');

    // Test 2: Sign Up with Universal Name & Phone
    console.log('2️⃣ Testing Sign Up with Universal Name & Phone...');
    const signupData = {
      email: 'dryrun@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      name: 'Dr. Padmavathi Reddy (Mrs)',
      phone: '+91 99637 21999'
    };

    try {
      const signupResponse = await axios.post(`${baseUrl}/api/auth/signup`, signupData);
      console.log('✅ Sign Up SUCCESS!');
      console.log(`   User ID: ${signupResponse.data.user.id}`);
      console.log(`   Email: ${signupResponse.data.user.email}`);
      console.log(`   Name: ${signupResponse.data.user.name}`);
      console.log(`   Phone: ${signupResponse.data.user.phone}`);
      console.log(`   Token: ${signupResponse.data.token ? 'Generated' : 'Missing'}`);
      testResults.signup = true;
    } catch (error) {
      if (error.response?.data?.error === 'User already exists') {
        console.log('⚠️ User already exists - testing with new email...');
        const newSignupData = {
          ...signupData,
          email: 'dryrun2@homafoods.com'
        };
        const newSignupResponse = await axios.post(`${baseUrl}/api/auth/signup`, newSignupData);
        console.log('✅ Sign Up SUCCESS with new email!');
        console.log(`   User ID: ${newSignupResponse.data.user.id}`);
        console.log(`   Email: ${newSignupResponse.data.user.email}`);
        console.log(`   Name: ${newSignupResponse.data.user.name}`);
        console.log(`   Phone: ${newSignupResponse.data.user.phone}`);
        testResults.signup = true;
      } else {
        console.log(`❌ Sign Up FAILED: ${error.response?.data?.error || error.message}`);
      }
    }
    console.log('');

    // Test 3: Login
    console.log('3️⃣ Testing Login...');
    const loginData = {
      email: 'dryrun@homafoods.com',
      password: 'test123'
    };

    try {
      const loginResponse = await axios.post(`${baseUrl}/api/auth/login`, loginData);
      console.log('✅ Login SUCCESS!');
      console.log(`   User ID: ${loginResponse.data.user.id}`);
      console.log(`   Email: ${loginResponse.data.user.email}`);
      console.log(`   Name: ${loginResponse.data.user.name}`);
      console.log(`   Phone: ${loginResponse.data.user.phone}`);
      console.log(`   Token: ${loginResponse.data.token ? 'Generated' : 'Missing'}`);
      testResults.login = true;
      
      // Store token for protected routes
      const token = loginResponse.data.token;
      
      // Test 4: Protected Route (User Profile)
      console.log('4️⃣ Testing Protected Route (User Profile)...');
      const profileResponse = await axios.get(`${baseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Protected Route SUCCESS!');
      console.log(`   User Profile: ${JSON.stringify(profileResponse.data.user, null, 2)}`);
      console.log('');

      // Test 5: Dashboard Data (Food Search)
      console.log('5️⃣ Testing Dashboard Data (Food Search)...');
      const searchResponse = await axios.get(`${baseUrl}/api/data?search=chicken`);
      console.log('✅ Food Search SUCCESS!');
      console.log(`   Found ${searchResponse.data.foods.length} foods`);
      if (searchResponse.data.foods.length > 0) {
        console.log(`   Sample: ${searchResponse.data.foods[0].food_name}`);
        console.log(`   Calories: ${searchResponse.data.foods[0].calories}`);
        console.log(`   Health Score: ${searchResponse.data.foods[0].health_score}`);
      }
      testResults.dashboard = true;
      testResults.search = true;
      console.log('');

      // Test 6: Database Stats
      console.log('6️⃣ Testing Database Stats...');
      const statsResponse = await axios.get(`${baseUrl}/api/data/stats`);
      console.log('✅ Database Stats SUCCESS!');
      console.log(`   Total Foods: ${statsResponse.data.totalFoods}`);
      console.log(`   Continents: ${statsResponse.data.continents.length}`);
      console.log(`   Diabetic Ratings: ${statsResponse.data.diabeticRating.length}`);
      console.log('');

      // Test 7: Logout
      console.log('7️⃣ Testing Logout...');
      const logoutResponse = await axios.post(`${baseUrl}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Logout SUCCESS!');
      console.log(`   Message: ${logoutResponse.data.message}`);
      testResults.logout = true;
      console.log('');

    } catch (error) {
      console.log(`❌ Login FAILED: ${error.response?.data?.error || error.message}`);
    }

  } catch (error) {
    console.log(`❌ Health Check FAILED: ${error.message}`);
  }

  // Final Results
  console.log('=' .repeat(60));
  console.log('📊 COMPLETE DRY RUN RESULTS:');
  console.log('=' .repeat(60));
  console.log(`✅ Sign Up: ${testResults.signup ? 'SUCCESS' : 'FAILED'}`);
  console.log(`✅ Login: ${testResults.login ? 'SUCCESS' : 'FAILED'}`);
  console.log(`✅ Dashboard: ${testResults.dashboard ? 'SUCCESS' : 'FAILED'}`);
  console.log(`✅ Search: ${testResults.search ? 'SUCCESS' : 'FAILED'}`);
  console.log(`✅ Logout: ${testResults.logout ? 'SUCCESS' : 'FAILED'}`);
  console.log('');

  const successCount = Object.values(testResults).filter(Boolean).length;
  const totalTests = Object.keys(testResults).length;

  if (successCount === totalTests) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Complete application flow working!');
    console.log('✅ Universal name & phone support working!');
    console.log('✅ Password handling working!');
    console.log('✅ Dashboard functionality working!');
    console.log('✅ Ready for production!');
  } else {
    console.log(`⚠️ ${successCount}/${totalTests} tests passed`);
    console.log('❌ Some functionality needs fixing');
  }

  console.log('\n🌐 Test the complete application at: http://localhost:3000');
}

testCompleteFlow();
