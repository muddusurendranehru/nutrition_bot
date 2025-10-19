// Test Universal Name and Phone Sign Up
const axios = require('axios');

async function testUniversalSignup() {
  console.log('👤📱 TESTING UNIVERSAL NAME & PHONE SIGN UP\n');

  const testCases = [
    {
      email: 'universal1@homafoods.com',
      name: 'Lakshmi',
      phone: '+91 99637 21999',
      desc: 'Simple name + Indian phone'
    },
    {
      email: 'universal2@homafoods.com',
      name: 'Lakshmi Galla',
      phone: '+919963721999',
      desc: 'Full name + Indian phone no spaces'
    },
    {
      email: 'universal3@homafoods.com',
      name: 'lakshmi_galla',
      phone: '9963721999',
      desc: 'Underscore name + Indian phone no country code'
    },
    {
      email: 'universal4@homafoods.com',
      name: 'Dr. Lakshmi Galla Reddy',
      phone: '+1-555-123-4567',
      desc: 'Title + Multiple names + US phone'
    },
    {
      email: 'universal5@homafoods.com',
      name: 'Lakshmi Galla-Reddy (Mrs)',
      phone: 'whatsapp:+919963721999',
      desc: 'Hyphenated + Parentheses + WhatsApp phone'
    }
  ];

  let successCount = 0;

  for (const testCase of testCases) {
    try {
      console.log(`Testing: ${testCase.desc}`);
      console.log(`Name: "${testCase.name}"`);
      console.log(`Phone: "${testCase.phone}"`);
      
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email: testCase.email,
        password: 'test123',
        confirmPassword: 'test123',
        name: testCase.name,
        phone: testCase.phone
      });
      
      console.log(`✅ SUCCESS: User created!`);
      console.log(`   User ID: ${response.data.user.id}`);
      console.log(`   Email: ${response.data.user.email}`);
      console.log(`   Name: "${response.data.user.name}"`);
      console.log(`   Phone: "${response.data.user.phone}"`);
      console.log('');
      
      successCount++;
      
    } catch (error) {
      console.log(`❌ FAILED: ${error.response?.data?.error || error.message}`);
      console.log('');
    }
  }

  console.log('=' .repeat(60));
  console.log(`📊 RESULTS: ${successCount}/${testCases.length} universal formats accepted`);
  console.log('=' .repeat(60));
  
  if (successCount === testCases.length) {
    console.log('🎉 ALL UNIVERSAL FORMATS ACCEPTED!');
    console.log('✅ No more name validation delays!');
    console.log('✅ No more phone validation delays!');
    console.log('✅ Universal name support!');
    console.log('✅ Universal phone support!');
    console.log('✅ Ready for production!');
  } else {
    console.log('⚠️ Some universal formats failed - check validation');
  }
}

testUniversalSignup();
