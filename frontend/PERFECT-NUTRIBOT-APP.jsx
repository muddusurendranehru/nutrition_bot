import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ============================================
// CONFIGURATION - YOUR LIVE BACKEND
// ============================================
const API_BASE_URL = 'https://nutrition-bot-d3qabts9c44c73cjq0ug.onrender.com/api';

// ============================================
// API FUNCTIONS
// ============================================
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth functions
const signup = async (email, password, confirmPassword, name = '', phone = '') => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email, password, confirmPassword, name, phone
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email, password
  });
  return response.data;
};

const logout = async () => {
  localStorage.removeItem('token');
};

// Search functions
const searchDatabase = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    // Fallback to public search
    const response = await axios.get(`${API_BASE_URL}/search/test/${encodeURIComponent(query)}`);
    return response.data;
  }
};

const searchWithAI = async (query) => {
  const response = await api.post('/search/ai-search', { query });
  return response.data;
};

const saveAIFood = async (foodData) => {
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

// ============================================
// SIGNUP COMPONENT
// ============================================
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await signup(
        formData.email, formData.password, formData.confirmPassword,
        formData.name, formData.phone
      );

      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
        padding: '40px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        width: '100%', maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '30px', fontSize: '2.5em' }}>
          🍎 Nutribot
        </h1>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Password *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Confirm Password *</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Name (Universal)</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Lakshmi, Lakshmi Galla, lakshmi_galla - any format"
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Phone (Universal)</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="+91, +1, 996, any format, any length"
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          {error && (
            <div style={{ background: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffcdd2' }}>
              ❌ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '15px', background: loading ? '#ccc' : '#4CAF50', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>
            {loading ? '🔄 Creating Account...' : '✅ Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline' }}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================
// LOGIN COMPONENT
// ============================================
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData.email, formData.password);
      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/dashboard');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
        padding: '40px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        width: '100%', maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '30px', fontSize: '2.5em' }}>
          🍎 Nutribot
        </h1>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          {error && (
            <div style={{ background: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffcdd2' }}>
              ❌ {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '15px', background: loading ? '#ccc' : '#4CAF50', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>
            {loading ? '🔄 Logging in...' : '🔐 Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline' }}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}

// ============================================
// SPEEDOMETER COMPONENT
// ============================================
function Speedometer({ value, min, max, label, color }) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const angle = (percentage / 100) * 180;
  
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <div style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>{label}</div>
      <svg width="100" height="60" viewBox="0 0 100 60">
        <path d="M 15 45 A 35 35 0 0 1 85 45" stroke="#e9ecef" strokeWidth="8" fill="none"/>
        <path d="M 15 45 A 35 35 0 0 1 85 45" 
              stroke={color} strokeWidth="8" fill="none"
              strokeDasharray={`${(angle/180) * 110} 110`} strokeDashoffset="0"/>
        <line x1="50" y1="45" 
              x2={50 + 30 * Math.cos((angle - 90) * Math.PI / 180)} 
              y2={45 - 30 * Math.sin((angle - 90) * Math.PI / 180)} 
              stroke="#333" strokeWidth="3"/>
        <circle cx="50" cy="45" r="4" fill="#333"/>
      </svg>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color, marginTop: '5px' }}>
        {value.toFixed(1)}
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD COMPONENT - YOUR EXACT VISION
// ============================================
function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [databaseResults, setDatabaseResults] = useState([]);
  const [smartResults, setSmartResults] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  const [loading, setLoading] = useState({ database: false, smart: false, ai: false });
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState({});

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Search Database (760 foods) - Shows apple, apple juice, apple pie
  const searchDatabase = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, database: true }));
    setError('');

    try {
      const results = await searchDatabase(searchQuery);
      if (results.success && results.results) {
        setDatabaseResults(results.results);
      } else {
        setDatabaseResults([]);
      }
    } catch (err) {
      setError('Database search failed');
    } finally {
      setLoading(prev => ({ ...prev, database: false }));
    }
  };

  // Smart Search (Your growing database) - With speedometer
  const searchSmart = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, smart: true }));
    setError('');

    try {
      const results = await searchDatabase(searchQuery);
      if (results.success && results.results) {
        setSmartResults(results.results);
      } else {
        setSmartResults([]);
      }
    } catch (err) {
      setError('Smart search failed');
    } finally {
      setLoading(prev => ({ ...prev, smart: false }));
    }
  };

  // AI Search (ICMR, FDA, Europe, Chinese CDN, Asian, African, Australian, Wikipedia)
  const searchAI = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, ai: true }));
    setError('');

    try {
      const results = await searchWithAI(searchQuery);
      if (results.success && results.results) {
        setAiResults(results.results);
      } else {
        setAiResults([]);
      }
    } catch (err) {
      setError('AI search failed');
    } finally {
      setLoading(prev => ({ ...prev, ai: false }));
    }
  };

  // Save AI result to database
  const saveAIFood = async (food) => {
    if (!food || food.diabetic_rating !== 'ai') return;
    
    const foodKey = food.food_name;
    setSaveStatus(prev => ({ ...prev, [foodKey]: 'saving' }));

    try {
      await saveAIFood(food);
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'saved' }));
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'error' }));
    }
  };

  const getHealthColor = (rating) => {
    switch(rating) {
      case 'green': return '#4CAF50';
      case 'yellow': return '#FF9800';
      case 'red': return '#f44336';
      case 'ai': return '#9C27B0';
      default: return '#6c757d';
    }
  };

  const getHealthText = (rating) => {
    switch(rating) {
      case 'green': return 'Safe for Diabetics';
      case 'yellow': return 'Moderate - Small Portions';
      case 'red': return 'High Risk - Avoid';
      case 'ai': return 'AI Analysis';
      default: return 'Unknown';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ color: '#4CAF50', margin: 0, fontSize: '36px' }}>🍎 Nutribot</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '18px' }}>760+ Foods • Smart Search • AI Analysis</p>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>

      {/* SINGLE SEARCH BOX */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ color: '#333', marginTop: 0, marginBottom: '20px', fontSize: '24px' }}>🔍 Search Foods</h2>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'apple' to see apple, apple juice, apple pie..."
            style={{ 
              flex: 1, minWidth: '300px', padding: '15px 20px', fontSize: '18px', 
              border: '3px solid #ddd', borderRadius: '10px', outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {error && (
          <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffcdd2' }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* 3 COMPONENTS/BOXES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* BOX 1: DATABASE SEARCH - Shows apple, apple juice, apple pie */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#2196F3', margin: 0, fontSize: '20px' }}>📚 Database Search</h3>
            <button 
              onClick={searchDatabase}
              disabled={loading.database || !searchQuery.trim()}
              style={{
                backgroundColor: loading.database ? '#ccc' : '#2196F3',
                color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px',
                cursor: (loading.database || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: 'bold'
              }}
            >
              {loading.database ? '🔄 Searching...' : '🔍 Search 760 Foods'}
            </button>
          </div>
          
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            Searches your 760+ food database. Type "apple" to see apple, apple juice, apple pie, etc.
          </p>

          {databaseResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {databaseResults.slice(0, 5).map((food, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', 
                  marginBottom: '10px', backgroundColor: '#fafafa'
                }}>
                  <h4 style={{ color: '#2196F3', margin: '0 0 8px 0', fontSize: '16px' }}>{food.food_name}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
                    <div><strong>🔥 Calories:</strong> {food.calories}</div>
                    <div><strong>🥩 Protein:</strong> {food.protein_g}g</div>
                    <div><strong>🍞 Carbs:</strong> {food.carbs_g}g</div>
                    <div><strong>🥑 Fat:</strong> {food.fat_g}g</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                    {food.country} • {food.cuisine_type}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
              <p>Search your 760+ food database</p>
            </div>
          )}
        </div>

        {/* BOX 2: SMART SEARCH - Your growing database with speedometer */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#4CAF50', margin: 0, fontSize: '20px' }}>⚡ Smart Search</h3>
            <button 
              onClick={searchSmart}
              disabled={loading.smart || !searchQuery.trim()}
              style={{
                backgroundColor: loading.smart ? '#ccc' : '#4CAF50',
                color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px',
                cursor: (loading.smart || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: 'bold'
              }}
            >
              {loading.smart ? '🔄 Analyzing...' : '⚡ Smart Search'}
            </button>
          </div>
          
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            Your growing database with speedometer analysis. Shows carbs, protein, fat with green/yellow/red advice.
          </p>

          {smartResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {smartResults.slice(0, 3).map((food, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', 
                  marginBottom: '15px', backgroundColor: '#fafafa'
                }}>
                  <h4 style={{ color: '#4CAF50', margin: '0 0 10px 0', fontSize: '16px' }}>{food.food_name}</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', marginBottom: '15px' }}>
                    <div><strong>🔥 Calories:</strong> {food.calories}</div>
                    <div><strong>🥩 Protein:</strong> {food.protein_g}g</div>
                    <div><strong>🍞 Carbs:</strong> {food.carbs_g}g</div>
                    <div><strong>🥑 Fat:</strong> {food.fat_g}g</div>
                  </div>

                  {food.diabetic_rating && food.diabetic_rating !== 'ai' && (
                    <div style={{
                      marginBottom: '15px', padding: '10px', borderRadius: '8px',
                      backgroundColor: getHealthColor(food.diabetic_rating) === '#4CAF50' ? '#e8f5e8' : 
                                     getHealthColor(food.diabetic_rating) === '#FF9800' ? '#fff8e1' : '#ffebee',
                      color: getHealthColor(food.diabetic_rating) === '#4CAF50' ? '#2e7d32' : 
                             getHealthColor(food.diabetic_rating) === '#FF9800' ? '#f57c00' : '#c62828',
                      textAlign: 'center', fontWeight: 'bold'
                    }}>
                      💚 {getHealthText(food.diabetic_rating)} • Health Score: {food.health_score}/100
                    </div>
                  )}

                  {/* Speedometer */}
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                    <Speedometer value={food.calories} min={0} max={500} label="🔥 Calories" color={getHealthColor(food.diabetic_rating)} />
                    <Speedometer value={food.protein_g || 0} min={0} max={50} label="🥩 Protein" color={getHealthColor(food.diabetic_rating)} />
                    <Speedometer value={food.fat_g || 0} min={0} max={30} label="🥑 Fat" color={getHealthColor(food.diabetic_rating)} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚡</div>
              <p>Smart search with speedometer analysis</p>
            </div>
          )}
        </div>

        {/* BOX 3: AI SEARCH - ICMR, FDA, Europe, Chinese CDN, Asian, African, Australian, Wikipedia */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#9C27B0', margin: 0, fontSize: '20px' }}>🧠 AI Search</h3>
            <button 
              onClick={searchAI}
              disabled={loading.ai || !searchQuery.trim()}
              style={{
                backgroundColor: loading.ai ? '#ccc' : '#9C27B0',
                color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px',
                cursor: (loading.ai || !searchQuery.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: 'bold'
              }}
            >
              {loading.ai ? '🔄 AI Thinking...' : '🧠 AI Search'}
            </button>
          </div>
          
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            Searches ICMR, FDA, Europe, Chinese CDN, Asian, African, Australian, Wikipedia. Click Save to add to your database.
          </p>

          {aiResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {aiResults.map((food, index) => (
                <div key={index} style={{ 
                  border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', 
                  marginBottom: '15px', backgroundColor: '#fafafa'
                }}>
                  <h4 style={{ color: '#9C27B0', margin: '0 0 10px 0', fontSize: '16px' }}>{food.food_name}</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', marginBottom: '15px' }}>
                    <div><strong>🔥 Calories:</strong> {food.calories}</div>
                    <div><strong>🥩 Protein:</strong> {food.protein_g}</div>
                    <div><strong>🍞 Carbs:</strong> {food.carbs_g}</div>
                    <div><strong>🥑 Fat:</strong> {food.fat_g}</div>
                  </div>

                  {food.ai_response && (
                    <div style={{
                      marginBottom: '15px', padding: '12px', borderRadius: '8px',
                      backgroundColor: '#f3e5f5', color: '#4a148c', border: '1px solid #ce93d8',
                      fontSize: '13px', lineHeight: '1.4'
                    }}>
                      <strong>🤖 AI Analysis:</strong><br />
                      {food.ai_response.substring(0, 200)}...
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={() => saveAIFood(food)}
                    disabled={saveStatus[food.food_name] === 'saving' || saveStatus[food.food_name] === 'saved'}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '6px', border: 'none',
                      backgroundColor: saveStatus[food.food_name] === 'saved' ? '#4caf50' : 
                                     saveStatus[food.food_name] === 'saving' ? '#ff9800' : '#9C27B0',
                      color: 'white', fontSize: '14px', fontWeight: 'bold',
                      cursor: saveStatus[food.food_name] === 'saved' || saveStatus[food.food_name] === 'saving' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {saveStatus[food.food_name] === 'saved' ? '✅ Saved to Database!' : 
                     saveStatus[food.food_name] === 'saving' ? '💾 Saving...' : 
                     '💾 Save to Database (Grow Your Collection!)'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>🧠</div>
              <p>AI search across global databases</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// PRIVATE ROUTE COMPONENT
// ============================================
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
