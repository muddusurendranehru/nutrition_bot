import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3031/api';

// Token management
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const signup = async (email, password, confirmPassword, name = '', phone = '') => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email,
    password,
    confirmPassword,
    name,
    phone,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    removeToken();
  }
};

// Data API - ALIGNED WITH NUTRITION_DATABASE SCHEMA
export const insertFruitEntry = async (data) => {
  const response = await api.post('/data', data);
  return response.data;
};

// Save AI result to database for future Smart Search
export const saveAIFoodToDatabase = async (foodData) => {
  const response = await api.post('/data', {
    food_name: foodData.food_name,
    calories: foodData.calories,
    protein_g: foodData.protein_g,
    fat_g: foodData.fat_g,
    carbs_g: foodData.carbs_g,
    data_source: 'AI Generated (OpenAI)',
    ai_response: foodData.ai_response
  });
  return response.data;
};

export const fetchFruitEntries = async () => {
  const response = await api.get('/data');
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get('/data/users');
  return response.data;
};

// Fetch recent AI-generated foods
export const fetchRecentAIFoods = async () => {
  const response = await api.get('/data?search=AI Generated');
  return response.data;
};

// ============================================
// FOOD SEARCH API (Updated for dual search)
// ============================================

// SMART SEARCH - searches your 750 food items in Neon database
export const searchFoods = async (query) => {
  const response = await api.post('/search/foods', { query });
  return response.data;
};

// AI SEARCH - uses OpenAI (only when AI button clicked)
export const searchWithAI = async (query) => {
  const response = await api.post('/search/ai-search', { query });
  return response.data;
};

// Smart Search (Neon database) - for regular search
export const searchBolt = async (query, options = {}) => {
  try {
    // Try authenticated search first
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    // If auth fails, use public test endpoint
    console.log('Using public search (no auth)');
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

// AI Search (OpenAI) - for AI button
export const searchBoltAI = async (query, options = {}) => {
  try {
    const response = await api.post('/search/ai-search', { query });
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: 'AI Search requires login. Please login first or use Smart Search.',
      message: 'Authentication required for AI features'
    };
  }
};

// ICMR Indian Foods Search (using your database)
export const searchICMR = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    console.log('Using public search for ICMR');
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

// Tara Dalal Recipe Search (using your database)
export const searchTaraDalal = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    console.log('Using public search for Tara Dalal');
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

// Chinese Food Database Search (using your database)
export const searchChinese = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    console.log('Using public search for Chinese');
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

// American Food Database Search (using your database)
export const searchAmerican = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    console.log('Using public search for American');
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

// Get Food Categories
export const getFoodCategories = async () => {
  const response = await api.get('/search/categories');
  return response.data;
};

// Get Low Glycemic Foods (Diabetes-friendly)
export const getLowGIFoods = async () => {
  const response = await api.get('/search/low-gi');
  return response.data;
};

// Get Search Suggestions
export const getSearchSuggestions = async (query) => {
  const response = await api.get(`/search/suggestions/${query}`);
  return response.data;
};

// Get Search History
export const getSearchHistory = async () => {
  const response = await api.get('/search/history');
  return response.data;
};

export default api;
