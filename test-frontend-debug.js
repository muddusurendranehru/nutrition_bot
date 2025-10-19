// Debug Frontend Sign Up Issue
const axios = require('axios');

async function debugFrontendSignUp() {
  console.log('🔍 DEBUGGING FRONTEND SIGN UP ISSUE\n');

  try {
    // Test 1: Check if server is running
    console.log('1️⃣ Checking server status...');
    const healthResponse = await axios.get('http://localhost:3031/api/health');
    console.log(`✅ Server is running: ${healthResponse.status}`);
    console.log('');

    // Test 2: Test signup endpoint directly
    console.log('2️⃣ Testing signup endpoint...');
    const signupData = {
      email: 'debug@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      name: 'Debug User',
      phone: '+91 99637 21999'
    };

    const signupResponse = await axios.post('http://localhost:3031/api/auth/signup', signupData);
    console.log('✅ Signup endpoint working!');
    console.log(`   Status: ${signupResponse.status}`);
    console.log(`   User ID: ${signupResponse.data.user.id}`);
    console.log(`   Email: ${signupResponse.data.user.email}`);
    console.log(`   Name: ${signupResponse.data.user.name}`);
    console.log(`   Phone: ${signupResponse.data.user.phone}`);
    console.log('');

    // Test 3: Test frontend page
    console.log('3️⃣ Testing frontend page...');
    const frontendResponse = await axios.get('http://localhost:3031/');
    console.log(`✅ Frontend page: ${frontendResponse.status}`);
    console.log(`   Content length: ${frontendResponse.data.length} characters`);
    console.log('');

    // Test 4: Check if app.js is loading
    console.log('4️⃣ Testing app.js file...');
    const appJsResponse = await axios.get('http://localhost:3031/app.js');
    console.log(`✅ app.js: ${appJsResponse.status}`);
    console.log(`   Content length: ${appJsResponse.data.length} characters`);
    console.log('');

    console.log('=' .repeat(60));
    console.log('🎉 DEBUGGING RESULTS:');
    console.log('=' .repeat(60));
    console.log('✅ Server is running on port 3031');
    console.log('✅ Signup endpoint is working');
    console.log('✅ Frontend page is loading');
    console.log('✅ app.js is loading');
    console.log('');
    console.log('💡 POSSIBLE ISSUES:');
    console.log('1. Check browser console for JavaScript errors');
    console.log('2. Check if CORS is working properly');
    console.log('3. Check if form submission is working');
    console.log('4. Check if API calls are being made');
    console.log('');
    console.log('🌐 Test the application at: http://localhost:3031');
    console.log('🔍 Open browser developer tools (F12) to check console errors');

  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Server is not running. Start it with: node index.js');
    }
  }
}

debugFrontendSignUp();
