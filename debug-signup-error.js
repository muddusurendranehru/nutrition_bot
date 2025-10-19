// Debug Sign Up Error
const axios = require('axios');

async function debugSignUpError() {
  console.log('🔍 DEBUGGING SIGN UP ERROR\n');

  try {
    const signupData = {
      email: 'debug2@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      name: 'Debug User 2',
      phone: '+91 99637 21999'
    };

    console.log('Testing signup with data:', JSON.stringify(signupData, null, 2));
    
    const response = await axios.post('http://localhost:3031/api/auth/signup', signupData);
    console.log('✅ Success:', response.data);
    
  } catch (error) {
    console.log('❌ Error details:');
    console.log('   Status:', error.response?.status);
    console.log('   Status Text:', error.response?.statusText);
    console.log('   Error Message:', error.response?.data);
    console.log('   Full Error:', error.message);
    
    if (error.response?.data?.errors) {
      console.log('   Validation Errors:', error.response.data.errors);
    }
  }
}

debugSignUpError();
