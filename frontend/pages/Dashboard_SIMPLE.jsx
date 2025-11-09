import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../src/utils/api';
import HealthMetricsRedirect from '../src/components/HealthMetricsRedirect';
import BoltSearchButton from '../src/components/BoltSearchButton';

/**
 * SIMPLIFIED DASHBOARD - 2 TABLES ONLY
 * 
 * Features:
 * 1. Search 3 lakh foods
 * 2. Show diabetes analysis
 * 3. Redirect to Health Metrics app for logging
 */

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
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

    try {
      // Smart search through 750 foods database
      const response = await fetch(`/api/data?search=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      setSearchResults(data.results || []);
      
      if (data.results && data.results.length > 0) {
        setSelectedFood(data.results[0]); // Show first result
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeFood = (food) => {
    const gi = food.glycemic_index || 0;
    const carbs = food.carbs || 0;

    let status = '🟢 SAFE FOR DIABETES';
    let statusColor = 'var(--success)';
    let statusBg = 'var(--success-light)';

    if (gi > 70 || carbs > 60) {
      status = '🔴 NOT SAFE FOR DIABETES';
      statusColor = 'var(--danger)';
      statusBg = 'var(--danger-light)';
    } else if (gi > 55 || carbs > 40) {
      status = '🟠 EAT WITH CAUTION';
      statusColor = 'var(--warning)';
      statusBg = 'var(--warning-light)';
    }

    return { status, statusColor, statusBg };
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>
            🍊 Nutribot
          </h1>
          <p className="text-muted">Search 3 Lakh Foods - Diabetes-Safe Analysis</p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search Card */}
      <div className="card mb-6">
        <h2 className="card-title">🔍 Search Any Food</h2>
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input
              type="text"
              className="form-input"
              placeholder="Try: chicken pizza with extra cheese, idli sambar, apple..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '18px', padding: '16px 50px 16px 16px' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? 'Searching...' : '🔍 Search & Analyze'}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger" style={{ marginTop: '15px' }}>
            {error}
          </div>
        )}

        {/* Bolt Search Button - ONLY activates OpenAI when clicked */}
        <BoltSearchButton 
          searchQuery={searchQuery}
          onResults={(results) => {
            setSearchResults(results);
            if (results.length > 0) {
              setSelectedFood(results[0]);
            }
          }}
        />
      </div>

      {/* Results */}
      {selectedFood && (
        <>
          {/* Food Analysis Card */}
          <div className="card mb-6">
            <div className="card-header">
              <h3 className="card-title">{selectedFood.food_name}</h3>
              {selectedFood.food_name_hindi && (
                <p className="text-muted">{selectedFood.food_name_hindi}</p>
              )}
            </div>

            <div className="card-body">
              {/* Diabetes Status */}
              <div 
                className="badge badge-lg" 
                style={{ 
                  background: analyzeFood(selectedFood).statusBg,
                  color: analyzeFood(selectedFood).statusColor,
                  padding: '12px 24px',
                  fontSize: '18px',
                  marginBottom: '20px'
                }}
              >
                {analyzeFood(selectedFood).status}
              </div>

              {/* Nutrition Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="stats-card">
                  <div className="stats-value">{selectedFood.calories}</div>
                  <div className="stats-label">Calories</div>
                </div>
                
                <div className="stats-card">
                  <div 
                    className="stats-value" 
                    style={{ 
                      color: selectedFood.glycemic_index > 70 ? 'var(--danger)' : 
                             selectedFood.glycemic_index > 55 ? 'var(--warning)' : 
                             'var(--success)' 
                    }}
                  >
                    {selectedFood.glycemic_index || 'N/A'}
                  </div>
                  <div className="stats-label">Glycemic Index</div>
                </div>

                <div className="stats-card">
                  <div className="stats-value">{selectedFood.carbs}g</div>
                  <div className="stats-label">Carbs</div>
                </div>

                <div className="stats-card">
                  <div className="stats-value">{selectedFood.proteins}g</div>
                  <div className="stats-label">Proteins</div>
                </div>
              </div>

              {/* Medical Notes */}
              {selectedFood.medical_notes && (
                <div className="alert alert-info">
                  <strong>💊 Medical Notes:</strong><br />
                  {selectedFood.medical_notes}
                </div>
              )}

              {/* Source Info */}
              <div style={{ marginTop: '15px', fontSize: '14px', color: 'var(--gray-500)' }}>
                <strong>Source:</strong> {selectedFood.source} | 
                <strong> Country:</strong> {selectedFood.country_context} | 
                <strong> Reliability:</strong> {selectedFood.reliability}
              </div>
            </div>
          </div>

          {/* Redirect to Health Metrics App */}
          <HealthMetricsRedirect foodData={selectedFood} />
        </>
      )}

      {/* Empty State */}
      {!selectedFood && !loading && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p>Search for any food to see nutrition analysis and diabetes safety rating</p>
        </div>
      )}

      {/* Search Results List (if multiple) */}
      {searchResults.length > 1 && (
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 className="card-title">More Results ({searchResults.length})</h3>
          <div className="flex flex-col gap-2">
            {searchResults.slice(1, 6).map((food) => (
              <div 
                key={food.id}
                className="flex items-center justify-between p-3 border rounded"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedFood(food)}
              >
                <div>
                  <strong>{food.food_name}</strong>
                  <span className="text-muted" style={{ marginLeft: '10px' }}>
                    {food.calories} cal
                  </span>
                </div>
                <span 
                  className="badge"
                  style={{
                    background: food.glycemic_index > 70 ? 'var(--danger-light)' :
                               food.glycemic_index > 55 ? 'var(--warning-light)' :
                               'var(--success-light)',
                    color: food.glycemic_index > 70 ? 'var(--danger)' :
                           food.glycemic_index > 55 ? 'var(--warning)' :
                           'var(--success)'
                  }}
                >
                  GI: {food.glycemic_index}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
