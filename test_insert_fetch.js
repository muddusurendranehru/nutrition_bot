// Quick test script to verify insert/fetch endpoints work
// Run: node test_insert_fetch.js (from project root)

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_URL || 'http://localhost:3031/api';
const TEST_TOKEN = 'test-token-placeholder'; // Replace with real JWT from login

// Test data matching your schema
const testFood = {
  food_name: 'Test Food Local',
  calories: 100,
  protein_g: 5,
  fat_g: 2,
  carbs_g: 15,
  data_source: 'AI Generated (Test)'
};

async function testInsert() {
  console.log('\n📤 Testing INSERT (POST /api/data)...');
  try {
    const response = await axios.post(`${API_BASE_URL}/data`, testFood, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ INSERT SUCCESS:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.data?.id; // Return the inserted ID
  } catch (error) {
    console.error('❌ INSERT FAILED:', error.response?.status || error.message);
    console.error('Error details:', error.response?.data || error.message);
    return null;
  }
}

async function testFetch() {
  console.log('\n📥 Testing FETCH (GET /api/data)...');
  try {
    const response = await axios.get(`${API_BASE_URL}/data`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      },
      params: { search: 'Test Food' }
    });
    console.log('✅ FETCH SUCCESS:', response.status);
    console.log('Found', response.data.count || 0, 'results');
    if (response.data.data && response.data.data.length > 0) {
      console.log('Sample result:', JSON.stringify(response.data.data[0], null, 2));
    }
    return response.data;
  } catch (error) {
    console.error('❌ FETCH FAILED:', error.response?.status || error.message);
    console.error('Error details:', error.response?.data || error.message);
    return null;
  }
}

async function runTests() {
  console.log('🧪 Testing Backend Insert/Fetch Endpoints');
  console.log('API URL:', API_BASE_URL);
  console.log('='.repeat(50));

  // Step 1: Test Insert
  const insertedId = await testInsert();

  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 500));

  // Step 2: Test Fetch
  await testFetch();

  console.log('\n' + '='.repeat(50));
  console.log('✅ Test completed!');
  console.log('\nNext steps:');
  console.log('1. If INSERT failed with 401/403 → Login first, copy JWT token');
  console.log('2. Replace TEST_TOKEN in this file with real JWT');
  console.log('3. If INSERT failed with 500 → Check backend logs for database error');
  console.log('4. If FETCH failed → Check backend is running and database connected');
}

runTests().catch(console.error);

