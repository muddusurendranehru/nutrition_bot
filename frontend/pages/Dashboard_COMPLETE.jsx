import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, searchBolt, searchBoltAI, saveAIFoodToDatabase, fetchRecentAIFoods } from '../src/utils/api';

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState({});
  const [saveMessage, setSaveMessage] = useState('');
  const [recentAIFoods, setRecentAIFoods] = useState([]);
  const [isAISearch, setIsAISearch] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const loadRecentAIFoods = async () => {
    try {
      const response = await fetchRecentAIFoods();
      const aiGeneratedFoods = response.data ? response.data.filter(food => 
        food.data_source?.includes('AI Generated') || food.diabetic_rating === 'ai'
      ) : [];
      setRecentAIFoods(aiGeneratedFoods.slice(0, 5));
    } catch (error) {
      console.error('Failed to load recent AI foods:', error);
    }
  };

  useEffect(() => {
    loadRecentAIFoods();
  }, []);

  const handleSaveAIFood = async (food) => {
    if (!food) return;
    
    const foodKey = food.food_name;
    setSaveStatus(prev => ({ ...prev, [foodKey]: 'saving' }));
    setSaveMessage('');

    try {
      await saveAIFoodToDatabase(food);
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'saved' }));
      setSaveMessage(`✅ "${food.food_name}" saved! Use Smart Search to find it next time.`);
      loadRecentAIFoods();
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'error' }));
      if (error.response?.data?.message?.includes('already exists')) {
        setSaveMessage(`ℹ️ "${food.food_name}" already in database!`);
      } else {
        setSaveMessage(`❌ Failed to save "${food.food_name}". Please try again.`);
      }
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSearchResults([]);
    setIsAISearch(false);

    try {
      const results = await searchBolt(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
      } else {
        setError('No results found.');
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
    setIsAISearch(true);

    try {
      const results = await searchBoltAI(searchQuery);
      if (results.success && results.results) {
        setSearchResults(results.results);
      } else {
        setError(results.error || 'AI search failed.');
      }
    } catch (err) {
      setError('AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate health indicator based on diabetic rating and health score
  const getHealthIndicator = (food) => {
    if (!food.diabetic_rating || food.diabetic_rating === 'ai') return null;
    
    const healthScore = food.health_score || 50;
    const rating = food.diabetic_rating.toLowerCase();
    
    let color, bgColor, ringColor, label, percentage;
    
    if (rating === 'green') {
      color = '#16a34a';
      bgColor = '#dcfce7';
      ringColor = '#22c55e';
      label = '🟢 SAFE FOR DIABETES';
      percentage = Math.min(healthScore, 100);
    } else if (rating === 'yellow') {
      color = '#ea580c';
      bgColor = '#fed7aa';
      ringColor = '#f97316';
      label = '🟡 CAUTION';
      percentage = Math.min(healthScore, 75);
    } else {
      color = '#dc2626';
      bgColor = '#fee2e2';
      ringColor = '#ef4444';
      label = '🔴 NOT SAFE FOR DIABETES';
      percentage = Math.min(healthScore, 50);
    }
    
    return { color, bgColor, ringColor, label, percentage, healthScore };
  };

  // Speedometer/Ring Component
  const HealthRing = ({ food }) => {
    const indicator = getHealthIndicator(food);
    if (!indicator) return null;

    const { ringColor, percentage, healthScore, label } = indicator;
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ marginTop: '15px', padding: '15px', borderRadius: '10px', backgroundColor: indicator.bgColor, textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 15px' }}>
          <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          {/* Center text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: indicator.color }}>
              {healthScore}
            </div>
            <div style={{ fontSize: '10px', color: '#666' }}>Health</div>
          </div>
        </div>
        <div style={{
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: 'white',
          fontWeight: 'bold',
          color: indicator.color,
          fontSize: '14px'
        }}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: '75%' }}>
          <h1 style={{ color: '#2e7d32', margin: 0, fontSize: '30px', lineHeight: 1.3 }}>
            🍊 NutriBot · Dr. Muddu Surendra Nehru, M.D.
            <span style={{ display: 'block', fontSize: '16px', color: '#6a1b9a', fontWeight: 'bold' }}>Physician · Professor of Medicine · Free Nutri App</span>
          </h1>
          <p style={{ color: '#444', margin: '10px 0 0 0', fontWeight: 600 }}>
            Developed, Designed & Executed Solely · Call/WhatsApp: +91 99637 21999
          </p>
          <p style={{ color: '#666', margin: '6px 0 0 0' }}>
            Search 3 Lakh Foods · AI Nutrition Insights · Visual Health Indicators · Donate to keep the service 24/7/365
          </p>
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
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any food... (e.g., pizza, biryani, pasta)"
              style={{ flex: 1, padding: '15px', fontSize: '16px', border: '2px solid #ddd', borderRadius: '8px', outline: 'none' }}
            />
            <button type="submit" disabled={loading} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '15px 25px', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: loading ? 0.7 : 1 }}>
              {loading ? '🔄 Searching...' : '🔍 Smart Search'}
            </button>
          </div>
        </form>

        <button 
          onClick={handleAISearch}
          disabled={loading || !searchQuery.trim()}
          style={{ backgroundColor: '#9C27B0', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: (loading || !searchQuery.trim()) ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: (loading || !searchQuery.trim()) ? 0.7 : 1 }}
        >
          {loading ? '🔄 AI Thinking...' : '🧠 AI Search'}
        </button>

        {error && (
          <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #ffcdd2' }}>
            ⚠️ {error}
          </div>
        )}

        {saveMessage && (
          <div style={{
            backgroundColor: saveMessage.includes('✅') ? '#e8f5e8' : saveMessage.includes('❌') ? '#ffebee' : '#e3f2fd',
            color: saveMessage.includes('✅') ? '#2e7d32' : saveMessage.includes('❌') ? '#c62828' : '#1565c0',
            padding: '15px',
            borderRadius: '5px',
            marginTop: '15px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333', marginTop: 0 }}>📊 Found {searchResults.length} Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {searchResults.slice(0, 6).map((food, index) => {
              const indicator = getHealthIndicator(food);
              return (
                <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fafafa' }}>
                  <h4 style={{ color: '#2196F3', margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>{food.food_name}</h4>
                  
                  {/* Health Ring/Speedometer - VISUAL INDICATOR */}
                  {indicator && <HealthRing food={food} />}
                  
                  {/* Nutrition Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <div><strong>🔥 Calories:</strong> {food.calories}</div>
                    <div><strong>🥩 Protein:</strong> {food.protein_g}g</div>
                    <div><strong>🍞 Carbs:</strong> {food.carbs_g}g</div>
                    <div><strong>🥑 Fat:</strong> {food.fat_g}g</div>
                  </div>

                  {/* AI Response */}
                  {food.ai_response && (
                    <div style={{ marginTop: '15px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3e5f5', color: '#4a148c', border: '1px solid #ce93d8' }}>
                      <strong>🤖 AI Analysis:</strong>
                      <div style={{ marginTop: '8px', fontSize: '14px', lineHeight: '1.5' }}>{food.ai_response}</div>
                    </div>
                  )}

                  {/* Save button for AI results */}
                  {(isAISearch || food.ai_response || (food.data_source || '').toLowerCase().includes('ai')) && (
                    <div style={{ marginTop: '15px', padding: '15px', borderRadius: '8px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50', textAlign: 'center' }}>
                      <button
                        onClick={() => handleSaveAIFood(food)}
                        disabled={saveStatus[food.food_name] === 'saving' || saveStatus[food.food_name] === 'saved'}
                        style={{
                          backgroundColor: saveStatus[food.food_name] === 'saved' ? '#4caf50' : saveStatus[food.food_name] === 'saving' ? '#ff9800' : '#2196f3',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          cursor: saveStatus[food.food_name] === 'saved' || saveStatus[food.food_name] === 'saving' ? 'not-allowed' : 'pointer',
                          opacity: saveStatus[food.food_name] === 'saved' || saveStatus[food.food_name] === 'saving' ? 0.7 : 1,
                          width: '100%'
                        }}
                      >
                        {saveStatus[food.food_name] === 'saved' ? '✅ Saved to Database!' : saveStatus[food.food_name] === 'saving' ? '💾 Saving...' : '💾 Save to Database'}
                      </button>
                    </div>
                  )}

                  <div style={{ marginTop: '15px', fontSize: '12px', color: '#999', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                    <strong>Source:</strong> {food.data_source} | <strong>Country:</strong> {food.country}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent AI Foods */}
      {!loading && searchResults.length === 0 && recentAIFoods.length > 0 && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h3 style={{ color: '#4a148c', marginBottom: '20px', fontSize: '20px' }}>
            🧠💾 Your AI Food Collection ({recentAIFoods.length} foods saved)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {recentAIFoods.map((food, index) => (
              <div key={index} style={{ border: '1px solid #e1bee7', borderRadius: '8px', padding: '15px', backgroundColor: '#fce4ec', cursor: 'pointer' }}
                onClick={async () => { setSearchQuery(food.food_name); await handleSearch({ preventDefault: () => {} }); }}>
                <div style={{ fontWeight: 'bold', color: '#4a148c', marginBottom: '8px' }}>{food.food_name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>🔥 {food.calories} cal | 🥩 {food.protein_g}g</div>
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
          <p style={{ color: '#999' }}>Try "pizza", "biryani", or any food you're curious about.</p>
        </div>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '40px', padding: '24px', backgroundColor: '#1b5e20', color: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.18)', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>NutriBot · Dr. Muddu Surendra Nehru, M.D.</div>
        <div style={{ marginTop: '8px', fontSize: '14px' }}>
          Serving India with evidence-based nutrition intelligence · 3 Lakh foods · AI-powered insights · Always free.
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          Donate / Collaborate: +91 99637 21999 · homa-foods-nutrition.onrender.com
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', letterSpacing: '0.03em', opacity: 0.85 }}>
          © {new Date().getFullYear()} Dr. Muddu Surendra Nehru · All Rights Reserved · Designed & Deployed on Render + Neon PostgreSQL + React
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;

