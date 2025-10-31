import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3031/api';

// Log at load
if (typeof window !== 'undefined') {
  console.log('🌐 API Base URL:', API_BASE_URL);
}

export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

const api = axios.create({ baseURL: API_BASE_URL });
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const login = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return res.data;
};
export const logout = async () => { try { await api.post('/auth/logout'); } finally { removeToken(); } };

// Save AI result -> backend inserts into food_nutrition
export const saveAIFoodToDatabase = async (food) => {
  const payload = {
    food_name: food.food_name,
    calories: food.calories ?? 0,
    protein_g: food.protein_g ?? null,
    fat_g: food.fat_g ?? null,
    carbs_g: food.carbs_g ?? null,
    data_source: food.data_source || 'AI Generated (OpenAI)',
    ai_response: food.ai_response || ''
  };
  const res = await api.post('/data', payload);
  return res.data;
};

// Optional helpers used on Dashboard
export const searchBolt = async (q) => (await api.post('/search/foods', { query: q })).data;
export const searchBoltAI = async (q) => (await api.post('/search/ai-search', { query: q })).data;
export const fetchRecentAIFoods = async () => (await api.get('/data?search=AI Generated')).data;

export default api;
