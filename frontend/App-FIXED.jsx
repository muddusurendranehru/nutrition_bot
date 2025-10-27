import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// ============================================
// CONFIGURATION - YOUR LIVE BACKEND
// ============================================
const API_BASE_URL = 'https://homa-foods-nutrition.onrender.com/api';

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

// Search functions - CORRECT ENDPOINTS
const searchDatabase = async (query) => {
  try {
    const response = await api.post('/search/foods', { query });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

const searchSmart = async (query) => {
  try {
    const response = await api.post('/smart-search', { 
      foodName: query, 
      cuisineType: detectCuisineType(query) 
    });
    return response.data;
  } catch (error) {
    console.error('Smart search error:', error);
    throw error;
  }
};

const searchWithAI = async (query) => {
  try {
    const response = await api.post('/search/ai-search', { query });
    return response.data;
  } catch (error) {
    console.error('AI search error:', error);
    throw error;
  }
};

const detectCuisineType = (foodName) => {
  const name = foodName.toLowerCase();
  if (name.includes('biryani') || name.includes('curry') || name.includes('dal') || name.includes('idli') || name.includes('dosa')) return 'indian';
  if (name.includes('chicken 65') || name.includes('fried rice') || name.includes('noodles')) return 'chinese';
  if (name.includes('pizza') || name.includes('pasta') || name.includes('risotto')) return 'italian';
  if (name.includes('burger') || name.includes('sandwich') || name.includes('hot dog')) return 'american';
  if (name.includes('sushi') || name.includes('ramen') || name.includes('tempura')) return 'japanese';
  return 'indian'; // Default
};

// ============================================
// SIGNUP COMPONENT
// ============================================
function Signup() {
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
        formData.email, 
        formData.password, 
        formData.confirmPassword, 
        formData.name, 
        formData.phone
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
      minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
        padding: '40px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        width: '100%', maxWidth: '500px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '30px', fontSize: '2.5em' }}>
          🍎 Nutribot
        </h1>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Name (Optional)</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Phone (Optional)</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
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
// DASHBOARD COMPONENT - MAIN APP
// ============================================
function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState({ database: false, smart: false, ai: false });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Three separate result sets
  const [databaseResults, setDatabaseResults] = useState([]);
  const [smartResults, setSmartResults] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  
  const [saveStatus, setSaveStatus] = useState({});

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Search Database (760 foods) - Shows apple, apple juice, apple pie
  const searchDatabaseLocal = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, database: true }));
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchDatabase(searchQuery);
      if (results.success && results.results) {
        setDatabaseResults(results.results);
        setSuccessMessage(`✅ Found ${results.results.length} results for "${searchQuery}"`);
      } else {
        setDatabaseResults([]);
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      setError('Database search failed. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, database: false }));
    }
  };

  // Smart Search (Your growing database) - With speedometer
  const searchSmartLocal = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, smart: true }));
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchSmart(searchQuery);
      if (results.success && results.food) {
        setSmartResults([results.food]);
        setSuccessMessage(`⚡ Smart Search found "${results.food.food_name}" with speedometer analysis`);
      } else {
        setSmartResults([]);
        setError('Smart search failed. Please try again.');
      }
    } catch (err) {
      setError('Smart search failed. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, smart: false }));
    }
  };

  // AI Search (ICMR, FDA, Europe, Chinese CDN, Asian, African, Australian, Wikipedia)
  const searchAILocal = async () => {
    if (!searchQuery.trim()) return;
    setLoading(prev => ({ ...prev, ai: true }));
    setError('');
    setSuccessMessage('');

    try {
      const results = await searchWithAI(searchQuery);
      if (results.success && results.results) {
        setAiResults(results.results);
        setSuccessMessage(`🤖 AI Search found ${results.results.length} results from international sources`);
      } else {
        setAiResults([]);
        setError('AI search failed. Please try again.');
      }
    } catch (err) {
      setError('AI search failed. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, ai: false }));
    }
  };

  // Save AI result to database
  const saveAIFood = async (food) => {
    const foodKey = `${food.food_name}_${food.data_source}`;
    setSaveStatus(prev => ({ ...prev, [foodKey]: 'saving' }));

    try {
      const response = await api.post('/search/save-ai-result', {
        foodData: {
          food_name: food.food_name,
          calories: food.calories || 0,
          protein_g: food.protein_g || 0,
          fat_g: food.fat_g || 0,
          carbs_g: food.carbs_g || 0,
          diabetic_rating: food.diabetic_rating || 'yellow',
          health_score: food.health_score || 50,
          country: food.country || 'Unknown',
          data_source: food.data_source || 'AI Generated'
        }
      });

      if (response.data.success) {
        setSaveStatus(prev => ({ ...prev, [foodKey]: 'saved' }));
        setSuccessMessage(`✅ "${food.food_name}" saved successfully to your database!`);
      } else {
        throw new Error(response.data.error);
      }
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
    <div style={{ 
      padding: '10px', 
      maxWidth: '100%', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* TITLE */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          color: '#e74c3c', 
          margin: 0, 
          fontSize: window.innerWidth < 768 ? '32px' : '56px', 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          fontFamily: 'Arial, sans-serif'
        }}>
          HOMA FOODS
        </h1>
        <h2 style={{ 
          color: '#2c3e50', 
          margin: '5px 0 0 0', 
          fontSize: window.innerWidth < 768 ? '16px' : '24px', 
          fontWeight: '600',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          Dr. Nehru's Nutrition Database
        </h2>
        <p style={{ 
          color: '#666', 
          margin: '10px 0 0 0', 
          fontSize: window.innerWidth < 768 ? '14px' : '18px',
          padding: '0 10px'
        }}>
          760+ Foods • Smart Search • AI Analysis • Cross-verified Data
        </p>
      </div>

      {/* LOGOUT BUTTON - Only show when logged in */}
      {isLoggedIn && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336', color: 'white', border: 'none', padding: '12px 24px',
              borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            🚪 Logout
          </button>
        </div>
      )}

      {/* SEARCH BOX */}
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)',
        padding: window.innerWidth < 768 ? '15px' : '30px', 
        borderRadius: '15px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', 
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.2)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '15px', 
          marginBottom: '20px',
          width: '100%'
        }}>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type 'chicken biryani' to see nutrition analysis..."
            style={{ 
              flex: 1, 
              padding: window.innerWidth < 768 ? '12px 15px' : '15px 20px', 
              fontSize: window.innerWidth < 768 ? '16px' : '18px', 
              border: '3px solid #ddd', 
              borderRadius: '10px', 
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
      </div>

      {/* SEARCH, SMART SEARCH, AI SEARCH BUTTONS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={searchDatabaseLocal}
          disabled={loading.database || !searchQuery.trim()}
          style={{
            backgroundColor: loading.database ? '#ccc' : '#2196F3', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading.database || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading.database ? '🔄 Searching...' : '🔍 Search'}
        </button>
        <button 
          onClick={searchSmartLocal}
          disabled={loading.smart || !searchQuery.trim()}
          style={{
            backgroundColor: loading.smart ? '#ccc' : '#4CAF50', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading.smart || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading.smart ? '🔄 Analyzing...' : '⚡ Smart Search'}
        </button>
        <button 
          onClick={searchAILocal}
          disabled={loading.ai || !searchQuery.trim()}
          style={{
            backgroundColor: loading.ai ? '#ccc' : '#9C27B0', color: 'white', border: 'none',
            padding: '15px 30px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold',
            cursor: (loading.ai || !searchQuery.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading.ai ? '🔄 AI Searching...' : '🤖 AI Search'}
        </button>
      </div>

      {/* MESSAGES */}
      {successMessage && (
        <div style={{ 
          background: '#e8f5e8', color: '#2e7d32', padding: '15px', borderRadius: '8px', 
          marginBottom: '20px', border: '1px solid #4caf50', textAlign: 'center', fontSize: '16px'
        }}>
          {successMessage}
        </div>
      )}

      {error && (
        <div style={{ 
          background: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '8px', 
          marginBottom: '20px', border: '1px solid #f44336', textAlign: 'center', fontSize: '16px'
        }}>
          ❌ {error}
        </div>
      )}

      {/* THREE SEARCH RESULT BOXES */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px',
        width: '100%'
      }}>
        
        {/* SEARCH RESULTS */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(10px)',
          padding: '20px', 
          borderRadius: '15px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ color: '#2196F3', marginBottom: '15px', textAlign: 'center' }}>🔍 Search Results</h3>
          {databaseResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {databaseResults.map((food, index) => (
                <div key={index} style={{ 
                  padding: window.innerWidth < 768 ? '20px' : '15px', 
                  marginBottom: '15px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px', 
                  border: '2px solid #e9ecef',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <h4 style={{ 
                    margin: '0 0 15px 0', 
                    color: '#333',
                    fontSize: window.innerWidth < 768 ? '18px' : '16px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {food.food_name}
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
                    gap: '10px', 
                    fontSize: window.innerWidth < 768 ? '16px' : '14px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#fff3cd',
                      borderRadius: '8px',
                      border: '1px solid #ffeaa7'
                    }}>
                      🔥 <span style={{ fontWeight: 'bold', color: '#856404' }}>{food.calories} calories</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#d1ecf1',
                      borderRadius: '8px',
                      border: '1px solid #bee5eb'
                    }}>
                      💪 <span style={{ fontWeight: 'bold', color: '#0c5460' }}>{food.protein_g}g protein</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#f8d7da',
                      borderRadius: '8px',
                      border: '1px solid #f5c6cb'
                    }}>
                      🧈 <span style={{ fontWeight: 'bold', color: '#721c24' }}>{food.fat_g}g fat</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#d4edda',
                      borderRadius: '8px',
                      border: '1px solid #c3e6cb'
                    }}>
                      🍞 <span style={{ fontWeight: 'bold', color: '#155724' }}>{food.carbs_g}g carbs</span>
                    </div>
                  </div>
                  <div style={{ 
                    marginTop: '15px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      color: getHealthColor(food.diabetic_rating), 
                      fontWeight: 'bold', 
                      fontSize: window.innerWidth < 768 ? '14px' : '12px',
                      textAlign: 'center'
                    }}>
                      {getHealthText(food.diabetic_rating)}
                    </span>
                    <span style={{ 
                      fontSize: window.innerWidth < 768 ? '14px' : '12px', 
                      color: '#666',
                      textAlign: 'center'
                    }}>
                      {food.country}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              {loading.database ? 'Searching...' : 'No results yet. Try searching!'}
            </p>
          )}
        </div>

        {/* SMART SEARCH RESULTS */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(10px)',
          padding: '20px', 
          borderRadius: '15px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '15px', textAlign: 'center' }}>⚡ Smart Search</h3>
          {smartResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {smartResults.map((food, index) => (
                <div key={index} style={{ 
                  padding: '15px', marginBottom: '10px', backgroundColor: '#f8f9fa', 
                  borderRadius: '8px', border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ 
                    margin: '0 0 15px 0', 
                    color: '#333',
                    fontSize: window.innerWidth < 768 ? '18px' : '16px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {food.food_name}
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', 
                    gap: '10px', 
                    fontSize: window.innerWidth < 768 ? '16px' : '14px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#fff3cd',
                      borderRadius: '8px',
                      border: '1px solid #ffeaa7'
                    }}>
                      🔥 <span style={{ fontWeight: 'bold', color: '#856404' }}>{food.calories} calories</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#d1ecf1',
                      borderRadius: '8px',
                      border: '1px solid #bee5eb'
                    }}>
                      💪 <span style={{ fontWeight: 'bold', color: '#0c5460' }}>{food.protein_g}g protein</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#f8d7da',
                      borderRadius: '8px',
                      border: '1px solid #f5c6cb'
                    }}>
                      🧈 <span style={{ fontWeight: 'bold', color: '#721c24' }}>{food.fat_g}g fat</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '10px',
                      backgroundColor: '#d4edda',
                      borderRadius: '8px',
                      border: '1px solid #c3e6cb'
                    }}>
                      🍞 <span style={{ fontWeight: 'bold', color: '#155724' }}>{food.carbs_g}g carbs</span>
                    </div>
                  </div>
                  
                  {/* SPEEDOMETER */}
                  <div style={{ margin: '15px 0', textAlign: 'center' }}>
                    <div style={{ 
                      width: '100%', 
                      height: window.innerWidth < 768 ? '25px' : '20px', 
                      backgroundColor: '#e0e0e0', 
                      borderRadius: '10px', 
                      overflow: 'hidden', 
                      position: 'relative',
                      border: '2px solid #ddd'
                    }}>
                      <div style={{
                        width: `${food.health_score || 50}%`, 
                        height: '100%', 
                        backgroundColor: getHealthColor(food.diabetic_rating),
                        transition: 'width 0.3s ease',
                        borderRadius: '8px'
                      }}></div>
                    </div>
                    <div style={{ 
                      marginTop: '8px', 
                      fontSize: window.innerWidth < 768 ? '14px' : '12px', 
                      color: '#333',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      Health Score: {food.health_score || 50}/100
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      color: getHealthColor(food.diabetic_rating), 
                      fontWeight: 'bold', 
                      fontSize: '12px' 
                    }}>
                      {getHealthText(food.diabetic_rating)}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>{food.country}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              {loading.smart ? 'Analyzing...' : 'No smart results yet. Try smart search!'}
            </p>
          )}
        </div>

        {/* AI SEARCH RESULTS */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(10px)',
          padding: '20px', 
          borderRadius: '15px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ color: '#9C27B0', marginBottom: '15px', textAlign: 'center' }}>🤖 AI Search</h3>
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '15px',
            border: '2px solid #4CAF50',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>
              💾 SAVE AI RESULTS TO YOUR DATABASE - Click "Save" to add foods permanently!
            </p>
          </div>
          {aiResults.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {aiResults.map((food, index) => {
                const foodKey = `${food.food_name}_${food.data_source}`;
                return (
                  <div key={index} style={{ 
                    padding: '15px', marginBottom: '10px', backgroundColor: '#f8f9fa', 
                    borderRadius: '8px', border: '1px solid #e9ecef'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{food.food_name}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                      <div>🔥 {food.calories} cal</div>
                      <div>🥩 {food.protein_g}g protein</div>
                      <div>🧈 {food.fat_g}g fat</div>
                      <div>🍞 {food.carbs_g}g carbs</div>
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>{food.data_source}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          saveAIFood(food);
                        }}
                        disabled={saveStatus[foodKey] === 'saving' || saveStatus[foodKey] === 'saved'}
                        style={{
                          padding: window.innerWidth < 768 ? '10px 12px' : '8px 16px', 
                          fontSize: window.innerWidth < 768 ? '12px' : '14px', 
                          border: 'none', 
                          borderRadius: '6px',
                          backgroundColor: saveStatus[foodKey] === 'saved' ? '#4CAF50' : 
                                         saveStatus[foodKey] === 'saving' ? '#ccc' : '#e74c3c',
                          color: 'white', 
                          cursor: saveStatus[foodKey] === 'saving' ? 'not-allowed' : 'pointer',
                          fontWeight: 'bold', 
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          border: saveStatus[foodKey] === 'saved' ? '2px solid #2e7d32' : '2px solid #c62828',
                          width: '100%',
                          maxWidth: '200px',
                          margin: '0 auto',
                          display: 'block'
                        }}
                      >
                        {saveStatus[foodKey] === 'saved' ? '✅ SAVED' : 
                         saveStatus[foodKey] === 'saving' ? '🔄 SAVING...' : '💾 SAVE TO DB'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              {loading.ai ? 'AI Searching...' : 'No AI results yet. Try AI search!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
