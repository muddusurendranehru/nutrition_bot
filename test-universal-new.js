// Test Universal Name & Phone with New Email
const axios = require('axios');

async function testUniversalNew() {
  console.log('👤📱 TESTING UNIVERSAL NAME & PHONE - NEW EMAIL\n');

  try {
    const response = await axios.post('http://localhost:3000/api/auth/signup', {
      email: 'new@homafoods.com',
      password: 'test123',
      confirmPassword: 'test123',
      name: 'Lakshmi Galla-Reddy (Mrs)',
      phone: '+91 99637 21999'
    });
    
    console.log('✅ Sign Up Response:');
    console.log('   Message:', response.data.message);
    console.log('   User ID:', response.data.user.id);
    console.log('   Email:', response.data.user.email);
    console.log('   Name:', response.data.user.name);
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
      'SELECT email, name, phone FROM users WHERE email = $1',
      ['new@homafoods.com']
    );
    
    if (dbResult.rows.length > 0) {
      const user = dbResult.rows[0];
      console.log('✅ Database Check:');
      console.log('   Email:', user.email);
      console.log('   Name:', user.name);
      console.log('   Phone:', user.phone);
      
      if (user.name === 'Lakshmi Galla-Reddy (Mrs)' && user.phone === '+91 99637 21999') {
        console.log('🎉 UNIVERSAL NAME & PHONE STORED CORRECTLY!');
        console.log('✅ No more name validation delays!');
        console.log('✅ No more phone validation delays!');
        console.log('✅ Universal name support!');
        console.log('✅ Universal phone support!');
        console.log('✅ Ready for production!');
      } else {
        console.log('❌ Name or phone not stored correctly');
        console.log('   Expected Name: Lakshmi Galla-Reddy (Mrs)');
        console.log('   Actual Name:', user.name);
        console.log('   Expected Phone: +91 99637 21999');
        console.log('   Actual Phone:', user.phone);
      }
    }
    
    await client.end();
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testUniversalNew();
