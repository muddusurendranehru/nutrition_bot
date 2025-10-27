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
const searchFoods = async (query) => {
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
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
              Email *
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
              Password *
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
              Confirm Password *
            </label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
              Name (Universal - any format)
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Lakshmi, Lakshmi Galla, lakshmi_galla - any format"
              style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
              Phone (Universal - any format)
            </label>
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
// DASHBOARD COMPONENT
// ============================================
function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const results = await searchFoods(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
      } else {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const results = await searchWithAI(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
      } else {
        setError(results.error || 'AI search failed. Try regular search.');
      }
    } catch (err) {
      setError('AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createSpeedometer = (value, min, max) => {
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    const angle = (percentage / 100) * 180;
    
    let color = '#4CAF50';
    if (percentage > 33) color = '#FF9800';
    if (percentage > 66) color = '#f44336';
    
    return (
      <div style={{ textAlign: 'center' }}>
        <svg width="80" height="50" viewBox="0 0 80 50">
          <path d="M 10 40 A 30 30 0 0 1 70 40" stroke="#e9ecef" strokeWidth="8" fill="none"/>
          <path d="M 10 40 A 30 30 0 0 1 70 40" 
                stroke={color} strokeWidth="8" fill="none"
                strokeDasharray={`${(angle/180) * 94.2} 94.2`} strokeDashoffset="0"/>
          <line x1="40" y1="40" 
                x2={40 + 25 * Math.cos((angle - 90) * Math.PI / 180)} 
                y2={40 - 25 * Math.sin((angle - 90) * Math.PI / 180)} 
                stroke="#333" strokeWidth="2"/>
          <circle cx="40" cy="40" r="3" fill="#333"/>
        </svg>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color, marginTop: '5px' }}>
          {value.toFixed(1)}
        </div>
      </div>
    );
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
    <div style={{ padding: '10px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ color: '#4CAF50', margin: 0, fontSize: '32px' }}>🍊 Nutribot Dashboard</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Search 750+ Foods - Get Nutrition Analysis</p>
        </div>
        <button onClick={handleLogout} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Logout
        </button>
      </div>

      {/* Search Section */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h2 style={{ color: '#333', marginTop: 0 }}>🔍 Search Foods</h2>
        
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any food... (e.g., pizza, biryani, pasta)"
              style={{ flex: 1, padding: '15px', fontSize: '16px', border: '2px solid #ddd', borderRadius: '8px', outline: 'none' }} />
            <button type="submit" disabled={loading}
              style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
              {loading ? '🔄 Searching...' : '🔍 Smart Search'}
            </button>
          </div>
        </form>

        <button onClick={handleAISearch} disabled={loading || !searchQuery.trim()}
          style={{ backgroundColor: '#9C27B0', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: (loading || !searchQuery.trim()) ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: (loading || !searchQuery.trim()) ? 0.7 : 1, marginRight: '10px' }}>
          {loading ? '🔄 AI Thinking...' : '🧠 AI Search'}
        </button>

        {error && (
          <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #ffcdd2' }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>📊 Found {searchResults.length} Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {searchResults.slice(0, 6).map((food, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fafafa' }}>
                <h4 style={{ color: '#2196F3', margin: '0 0 10px 0', fontSize: '18px' }}>{food.food_name}</h4>
                
                {food.regional_names && food.regional_names.length > 0 && (
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0', fontStyle: 'italic' }}>
                    Regional: {food.regional_names.join(', ')}
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div><strong>🔥 Calories:</strong> {food.calories}</div>
                  <div><strong>🥩 Protein:</strong> {food.protein_g}g</div>
                  <div><strong>🍞 Carbs:</strong> {food.carbs_g}g</div>
                  <div><strong>🥑 Fat:</strong> {food.fat_g}g</div>
                </div>

                {food.diabetic_rating && food.diabetic_rating !== 'ai' && (
                  <div style={{ marginTop: '15px', padding: '10px', borderRadius: '5px', backgroundColor: getHealthColor(food.diabetic_rating) === '#4CAF50' ? '#e8f5e8' : getHealthColor(food.diabetic_rating) === '#FF9800' ? '#fff8e1' : '#ffebee', color: getHealthColor(food.diabetic_rating) === '#4CAF50' ? '#2e7d32' : getHealthColor(food.diabetic_rating) === '#FF9800' ? '#f57c00' : '#c62828' }}>
                    <strong>💚 Diabetic Rating:</strong> {food.diabetic_rating.toUpperCase()}<br />
                    <strong>📈 Health Score:</strong> {food.health_score}/100
                  </div>
                )}

                {food.diabetic_rating === 'ai' && food.ai_response && (
                  <div style={{ marginTop: '15px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3e5f5', color: '#4a148c', border: '1px solid #ce93d8' }}>
                    <strong>🤖 AI Nutrition Analysis:</strong>
                    <div style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                      {food.ai_response}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '15px', fontSize: '12px', color: '#999', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <strong>Source:</strong> {food.data_source} | <strong>Country:</strong> {food.country} | <strong>Cuisine:</strong> {food.cuisine_type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && searchResults.length === 0 && !error && (
        <div style={{ backgroundColor: 'white', padding: '60px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: '#666' }}>Search for any food to get started!</h3>
          <p style={{ color: '#999' }}>Try searching for "pizza", "biryani", "pasta", or any food you're curious about.</p>
        </div>
      )}
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
