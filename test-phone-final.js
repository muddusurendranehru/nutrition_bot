// Final Test: HOMA FOODS Phone Number Flexibility
const axios = require('axios');

async function testPhoneFinal() {
  console.log('📱 FINAL TEST: HOMA FOODS Phone Number Flexibility\n');

  const testCases = [
    { email: 'phone1@homafoods.com', phone: '+91 99637 21999', desc: 'Indian with spaces' },
    { email: 'phone2@homafoods.com', phone: '+919963721999', desc: 'Indian without spaces' },
    { email: 'phone3@homafoods.com', phone: '9963721999', desc: 'Indian without country code' },
    { email: 'phone4@homafoods.com', phone: '+1-555-123-4567', desc: 'US format with dashes' },
    { email: 'phone5@homafoods.com', phone: '1234567890', desc: 'Simple 10 digits' },
    { email: 'phone6@homafoods.com', phone: 'whatsapp:+919963721999', desc: 'WhatsApp format' }
  ];

  let successCount = 0;

  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.desc}`);
      console.log(`Phone: ${testCase.phone}`);
      
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email: testCase.email,
        password: 'test123',
        confirmPassword: 'test123',
        phone: testCase.phone
      });
      
      console.log(`✅ SUCCESS: Phone stored as "${response.data.user.phone}"`);
      console.log(`   User ID: ${response.data.user.id}`);
      console.log(`   Email: ${response.data.user.email}`);
      console.log('');
      
      successCount++;
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.response?.data?.error || error.message}`);
      console.log('');
    }
  }

  console.log('=' .repeat(60));
  console.log(`📊 RESULTS: ${successCount}/${testCases.length} phone formats accepted`);
  console.log('=' .repeat(60));
  
  if (successCount === testCases.length) {
    console.log('🎉 ALL PHONE FORMATS ACCEPTED!');
    console.log('✅ No more phone validation delays!');
    console.log('✅ Universal phone number support!');
    console.log('✅ Ready for production!');
  } else {
    console.log('⚠️ Some phone formats failed - check validation');
  }
}

testPhoneFinal();
