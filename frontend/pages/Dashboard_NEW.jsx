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
  const [isAISearch, setIsAISearch] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSaveAIFood = async (food) => {
    if (!food) return;
    
    const foodKey = food.food_name;
    setSaveStatus(prev => ({ ...prev, [foodKey]: 'saving' }));
    setSaveMessage('');

    try {
      await saveAIFoodToDatabase(food);
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'saved' }));
      setSaveMessage(`✅ "${food.food_name}" saved successfully!`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [foodKey]: 'error' }));
      if (error.response?.data?.message?.includes('already exists')) {
        setSaveMessage(`ℹ️ "${food.food_name}" already in database!`);
      } else {
        setSaveMessage(`❌ Failed to save "${food.food_name}"`);
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

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header with CLEAR VERSION MARKER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ color: '#4CAF50', margin: 0, fontSize: '32px' }}>
            🍊 Nutribot Dashboard <strong style={{ fontSize: '18px', color: '#FF5722', marginLeft: '10px' }}>✨ NEW VERSION v4.0 ✨</strong>
          </h1>
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {searchResults.slice(0, 6).map((food, index) => (
              <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fafafa' }}>
                <h4 style={{ color: '#2196F3', margin: '0 0 10px 0', fontSize: '18px' }}>{food.food_name}</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <div><strong>🔥 Calories:</strong> {food.calories}</div>
                  <div><strong>🥩 Protein:</strong> {food.protein_g}g</div>
                  <div><strong>🍞 Carbs:</strong> {food.carbs_g}g</div>
                  <div><strong>🥑 Fat:</strong> {food.fat_g}g</div>
                </div>

                {food.diabetic_rating && food.diabetic_rating !== 'ai' && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    borderRadius: '5px',
                    backgroundColor: food.diabetic_rating === 'green' ? '#e8f5e8' : food.diabetic_rating === 'yellow' ? '#fff8e1' : '#ffebee',
                    color: food.diabetic_rating === 'green' ? '#2e7d32' : food.diabetic_rating === 'yellow' ? '#f57c00' : '#c62828'
                  }}>
                    <strong>💚 Diabetic Rating:</strong> {food.diabetic_rating.toUpperCase()}<br />
                    <strong>📈 Health Score:</strong> {food.health_score}/100
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
                      {saveStatus[food.food_name] === 'saved' ? '✅ Saved!' : saveStatus[food.food_name] === 'saving' ? '💾 Saving...' : '💾 Save to Database'}
                    </button>
                  </div>
                )}

                <div style={{ marginTop: '15px', fontSize: '12px', color: '#999', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                  <strong>Source:</strong> {food.data_source}
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

export default Dashboard;

