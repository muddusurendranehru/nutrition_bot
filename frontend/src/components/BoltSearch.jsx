import { useState } from 'react';
import { 
  searchBolt, 
  searchBoltAI,
  searchICMR, 
  searchTaraDalal, 
  searchChinese, 
  searchAmerican 
} from '../utils/api';

function BoltSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDatabase, setActiveDatabase] = useState('smart');
  const [error, setError] = useState('');

  const searchDatabases = {
    smart: { 
      name: 'Smart Search', 
      icon: '🔍', 
      func: searchBolt,
      description: 'Search your 750+ food database'
    },
    ai: { 
      name: 'AI Search', 
      icon: '🧠', 
      func: searchBoltAI,
      description: 'AI-powered nutrition analysis (OpenAI)'
    },
    icmr: { 
      name: 'ICMR Indian', 
      icon: '🇮🇳', 
      func: searchICMR,
      description: 'Indian foods from your database'
    },
    tara_dalal: { 
      name: 'Tara Dalal', 
      icon: '👩‍🍳', 
      func: searchTaraDalal,
      description: 'Indian recipes and nutrition'
    },
    chinese: { 
      name: 'Chinese CDN', 
      icon: '🇨🇳', 
      func: searchChinese,
      description: 'Chinese food database'
    },
    american: { 
      name: 'American USDA', 
      icon: '🇺🇸', 
      func: searchAmerican,
      description: 'American foods and fast food'
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const searchFunc = searchDatabases[activeDatabase].func;
      const results = await searchFunc(query);
      
      if (results.success) {
        setSearchResults(results.results || []);
        if (results.results?.length === 0) {
          setError('No foods found. Try a different search term.');
        }
      } else {
        setError(results.error || 'Search failed');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDatabaseSwitch = (database) => {
    setActiveDatabase(database);
    setSearchResults([]);
    setError('');
  };

  return (
    <div className="bolt-search">
      {/* Search Header */}
      <div className="search-header">
        <h2>🔍 International Food Search</h2>
        <p>Search across ICMR, Tara Dalal, Chinese CDN, American USDA databases</p>
      </div>

      {/* Database Selector */}
      <div className="database-selector">
        {Object.keys(searchDatabases).map((key) => (
          <button
            key={key}
            className={`database-btn ${activeDatabase === key ? 'active' : ''}`}
            onClick={() => handleDatabaseSwitch(key)}
            title={searchDatabases[key].description}
          >
            <span className="db-icon">{searchDatabases[key].icon}</span>
            <span className="db-name">{searchDatabases[key].name}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${searchDatabases[activeDatabase].name} database...`}
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-btn"
            disabled={loading || !query.trim()}
          >
            {loading ? '🔄' : '🔍'}
          </button>
        </div>
      </form>

      {/* Active Database Info */}
      <div className="active-database-info">
        <span className="active-db-icon">{searchDatabases[activeDatabase].icon}</span>
        <span className="active-db-text">
          Searching <strong>{searchDatabases[activeDatabase].name}</strong>: {searchDatabases[activeDatabase].description}
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="search-loading">
          <div className="loading-spinner">🔄</div>
          <p>Searching {searchDatabases[activeDatabase].name} database...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="search-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h3>Found {searchResults.length} foods</h3>
            <span className="results-source">from {searchDatabases[activeDatabase].name}</span>
          </div>
          
          <div className="results-grid">
            {searchResults.map((food, index) => (
              <div key={index} className="food-card">
                <div className="food-header">
                  <h4 className="food-name">{food.food_name}</h4>
                  {food.local_name && (
                    <p className="local-name">{food.local_name}</p>
                  )}
                </div>

                <div className="nutrition-info">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories</span>
                    <span className="nutrition-value">{food.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Protein</span>
                    <span className="nutrition-value">{food.protein_g}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbs</span>
                    <span className="nutrition-value">{food.carbs_g}g</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fats</span>
                    <span className="nutrition-value">{food.fat_g}g</span>
                  </div>
                </div>

                {food.diabetic_rating && (
                  <div className="diabetic-info">
                    <span className="diabetic-label">Diabetic Rating:</span>
                    <span className={`diabetic-value ${food.diabetic_rating}`}>
                      {food.diabetic_rating.toUpperCase()}
                    </span>
                    <span className="health-score">Health Score: {food.health_score}/100</span>
                  </div>
                )}

                {food.regional_names && food.regional_names.length > 0 && (
                  <div className="regional-names">
                    <span className="regional-label">Regional Names: </span>
                    <span className="regional-text">{food.regional_names.join(', ')}</span>
                  </div>
                )}

                <div className="food-footer">
                  <span className="data-source">Source: {food.data_source}</span>
                  <span className="country-info">Country: {food.country}</span>
                  <span className="cuisine-type">Cuisine: {food.cuisine_type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoltSearch;

