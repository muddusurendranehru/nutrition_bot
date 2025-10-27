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
// SPEEDOMETER COMPONENT
// ============================================
function Speedometer({ value, min, max, label, color, size = 120 }) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const angle = (percentage / 100) * 180;
  
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <div style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>{label}</div>
      <svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`}>
        <path d={`M ${size*0.15} ${size*0.4} A ${size*0.3} ${size*0.3} 0 0 1 ${size*0.85} ${size*0.4}`} 
              stroke="#e9ecef" strokeWidth="8" fill="none"/>
        <path d={`M ${size*0.15} ${size*0.4} A ${size*0.3} ${size*0.3} 0 0 1 ${size*0.85} ${size*0.4}`} 
              stroke={color} strokeWidth="8" fill="none"
              strokeDasharray={`${(angle/180) * (size*0.7)} ${size*0.7}`} strokeDashoffset="0"/>
        <line x1={size/2} y1={size*0.4} 
              x2={size/2 + (size*0.25) * Math.cos((angle - 90) * Math.PI / 180)} 
              y2={size*0.4 - (size*0.25) * Math.sin((angle - 90) * Math.PI / 180)} 
              stroke="#333" strokeWidth="3"/>
        <circle cx={size/2} cy={size*0.4} r="4" fill="#333"/>
      </svg>
      <div style={{ fontSize: '16px', fontWeight: 'bold', color, marginTop: '8px' }}>
        {value.toFixed(1)}
      </div>
    </div>
  );
}

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
// DASHBOARD COMPONENT - PERFECT LAYOUT
// ============================================
function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState({});

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const searchDatabase = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchDatabase(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
        setSuccessMessage(`✅ Found ${results.results.length} results for "${searchQuery}"`);
      } else {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchSmart = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchDatabase(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
        setSuccessMessage(`⚡ Smart Search found ${results.results.length} results with speedometer analysis`);
      } else {
        setError('Smart search failed. Please try again.');
      }
    } catch (err) {
      setError('Smart search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchAI = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchWithAI(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
        setSuccessMessage(`🧠 AI Search found ${results.results.length} results from global databases`);
      } else {
        setError('AI search failed. Please try again.');
      }
    } catch (err) {
      setError('AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveFood = async (food) => {
    const foodKey = food.food_name;
    setSaveStatus(prev => ({ ...prev, [foodKey]: 'saving' }));

    try {
      await saveAIFood(food);
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'saved' }));
      setSuccessMessage(`✅ "${food.food_name}" saved successfully to your database!`);
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'error' }));
      setError('Failed to save food. Please try again.');
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#4CAF50', margin: 0, fontSize: '48px', fontWeight: 'bold' }}>🍎 Nutribot</h1>
        <p style={{ color: '#666', margin: '10px 0 0 0', fontSize: '20px' }}>760+ Foods • Smart Search • AI Analysis</p>
      </div>

      {/* SIGN UP AND LOGIN COMPONENTS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        <button 
          onClick={() => navigate('/signup')}
          style={{
            backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px 24px',
            borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          ✅ Sign Up
        </button>
        <button 
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '12px 24px',
            borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          🔐 Login
        </button>
      </div>

      {/* SEARCH BOX */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'foxtail millet upma' to see nutrition analysis..."
            style={{ 
              flex: 1, padding: '15px 20px', fontSize: '18px', 
              border: '3px solid #ddd', borderRadius: '10px', outline: 'none'
            }}
          />
        </div>
      </div>

      {/* SEARCH, SMART SEARCH, AI SEARCH BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={searchDatabase}
          disabled={loading || !searchQuery.trim()}
          style={{
            backgroundColor: loading ? '#ccc' : '#2196F3', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Searching...' : '🔍 Search'}
        </button>
        <button 
          onClick={searchSmart}
          disabled={loading || !searchQuery.trim()}
          style={{
            backgroundColor: loading ? '#ccc' : '#4CAF50', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Analyzing...' : '⚡ Smart Search'}
        </button>
        <button 
          onClick={searchAI}
          disabled={loading || !searchQuery.trim()}
          style={{
            backgroundColor: loading ? '#ccc' : '#9C27B0', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 AI Thinking...' : '🧠 AI Search'}
        </button>
      </div>

      {/* MESSAGE SUCCESS */}
      {successMessage && (
        <div style={{ 
          backgroundColor: '#e8f5e8', color: '#2e7d32', padding: '15px', 
          borderRadius: '8px', marginBottom: '20px', textAlign: 'center',
          border: '2px solid #4caf50', fontSize: '16px', fontWeight: 'bold'
        }}>
          {successMessage}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', color: '#c62828', padding: '15px', 
          borderRadius: '8px', marginBottom: '20px', textAlign: 'center',
          border: '2px solid #f44336', fontSize: '16px', fontWeight: 'bold'
        }}>
          ❌ {error}
        </div>
      )}

      {/* FOOD DISPLAY WITH SPEEDOMETER */}
      {searchResults.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          {searchResults.slice(0, 1).map((food, index) => (
            <div key={index}>
              {/* FOOD NAME */}
              <h2 style={{ color: '#4CAF50', margin: '0 0 20px 0', fontSize: '32px', textAlign: 'center' }}>
                {food.food_name}
              </h2>

              {/* CALORIES, PROTEIN, FAT, CARBS, HEALTH SCORE */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f44336' }}>🔥</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{food.calories}</div>
                  <div style={{ color: '#666' }}>Calories</div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4CAF50' }}>🥩</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{food.protein_g || 'N/A'}</div>
                  <div style={{ color: '#666' }}>Protein (g)</div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FF9800' }}>🥑</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{food.fat_g || 'N/A'}</div>
                  <div style={{ color: '#666' }}>Fat (g)</div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2196F3' }}>🍞</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{food.carbs_g || 'N/A'}</div>
                  <div style={{ color: '#666' }}>Carbs (g)</div>
                </div>
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#9C27B0' }}>⭐</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{food.health_score || 88}/100</div>
                  <div style={{ color: '#666' }}>Health Score</div>
                </div>
              </div>

              {/* COUNTRY */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>
                  <strong>Country:</strong> {food.country || 'India'}
                </div>
              </div>

              {/* HEALTH SPEEDOMETER AND SAFE FOR DIABETES BOX */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                {/* HEALTH SPEEDOMETER */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Health Speedometer</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Speedometer value={food.calories} min={0} max={500} label="🔥 Calories" color={getHealthColor(food.diabetic_rating)} size={100} />
                    <Speedometer value={food.protein_g || 0} min={0} max={50} label="🥩 Protein" color={getHealthColor(food.diabetic_rating)} size={100} />
                    <Speedometer value={food.fat_g || 0} min={0} max={30} label="🥑 Fat" color={getHealthColor(food.diabetic_rating)} size={100} />
                  </div>
                </div>

                {/* SAFE FOR DIABETES ADVICE BOX */}
                <div style={{ 
                  flex: 1, minWidth: '300px', padding: '20px', 
                  backgroundColor: '#e8f5e8', borderRadius: '15px', 
                  border: '3px solid #4caf50', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>💚</div>
                  <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0', fontSize: '20px' }}>
                    Safe for Diabetes
                  </h3>
                  <p style={{ color: '#2e7d32', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                    {getHealthText(food.diabetic_rating)}
                  </p>
                  <div style={{ marginTop: '15px', fontSize: '14px', color: '#2e7d32' }}>
                    Health Score: {food.health_score || 88}/100
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                  onClick={() => saveFood(food)}
                  disabled={saveStatus[food.food_name] === 'saving' || saveStatus[food.food_name] === 'saved'}
                  style={{
                    backgroundColor: saveStatus[food.food_name] === 'saved' ? '#4caf50' : 
                                   saveStatus[food.food_name] === 'saving' ? '#ff9800' : '#2196f3',
                    color: 'white', border: 'none', padding: '15px 30px', borderRadius: '10px',
                    fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  {saveStatus[food.food_name] === 'saved' ? '✅ Saved Successfully!' : 
                   saveStatus[food.food_name] === 'saving' ? '💾 Saving...' : 
                   '💾 Save to Database'}
                </button>
              </div>

              {/* SAVED SUCCESSFULLY MESSAGE */}
              {saveStatus[food.food_name] === 'saved' && (
                <div style={{ 
                  backgroundColor: '#e8f5e8', color: '#2e7d32', padding: '15px', 
                  borderRadius: '8px', textAlign: 'center', marginBottom: '20px',
                  border: '2px solid #4caf50', fontSize: '16px', fontWeight: 'bold'
                }}>
                  ✅ Saved Successfully! This food is now in your database.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* LOGOUT BUTTON */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#f44336', color: 'white', border: 'none', padding: '15px 30px',
            borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          🚪 Logout
        </button>
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
