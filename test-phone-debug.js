// Debug Phone Number Storage
const axios = require('axios');

async function debugPhoneStorage() {
  console.log('🔍 DEBUG: Phone Number Storage\n');

  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', {
      email: 'debug@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      phone: '+91 99637 21999'
    });
    
    console.log('✅ Sign Up Response:');
    console.log('   Message:', response.data.message);
    console.log('   User ID:', response.data.user.id);
    console.log('   Email:', response.data.user.email);
    console.log('   Phone:', response.data.user.phone);
    console.log('   Token:', response.data.token ? 'Generated' : 'Missing');
    
    // Test login to verify user exists
    console.log('\n🔍 Testing Login...');
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'debug@homafoods.com',
      password: 'test123'
    });
    
    console.log('✅ Login Response:');
    console.log('   Message:', loginResponse.data.message);
    console.log('   User ID:', loginResponse.data.user.id);
    console.log('   Email:', loginResponse.data.user.email);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

debugPhoneStorage();
