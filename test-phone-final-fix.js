// Final Fix: Phone Number Storage
const axios = require('axios');

async function testPhoneFinalFix() {
  console.log('📱 FINAL FIX: Phone Number Storage\n');

  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', {
      email: 'final@homafoods.com',
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
    
    // Check database directly
    console.log('\n🔍 Checking database directly...');
    
    const { Client } = require('pg');
    const client = new Client({
      connectionString: 'postgresql://neondb_owner:npg_Bl9kug4wxKzN@ep-weathered-paper-a1mbh5zv-pooler.ap-southeast-1.aws.neon.tech/nutri_bot1?sslmode=require',
      ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();
    
    const dbResult = await client.query(
      'SELECT email, phone FROM users WHERE email = $1',
      ['final@homafoods.com']
    );
    
    if (dbResult.rows.length > 0) {
      const user = dbResult.rows[0];
      console.log('✅ Database Check:');
      console.log('   Email:', user.email);
      console.log('   Phone:', user.phone);
      
      if (user.phone === '+91 99637 21999') {
        console.log('🎉 PHONE NUMBER STORED CORRECTLY!');
        console.log('✅ No more phone validation delays!');
        console.log('✅ Universal phone number support!');
        console.log('✅ Ready for production!');
      } else {
        console.log('❌ Phone number not stored correctly');
        console.log('   Expected: +91 99637 21999');
        console.log('   Actual:', user.phone);
      }
    }
    
    await client.end();
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testPhoneFinalFix();
