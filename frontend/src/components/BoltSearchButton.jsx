import { useState } from 'react';
import { searchBolt } from '../utils/api';

/**
 * SIMPLE BOLT SEARCH BUTTON
 * Only activates OpenAI when clicked - NO endless loops
 */
function BoltSearchButton({ searchQuery, onResults }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBoltSearch = async () => {
    if (!searchQuery?.trim()) {
      setError('Please enter a search query first');
      return;
    }

    console.log('🚀 Bolt Search activated for:', searchQuery);
    setLoading(true);
    setError('');

    try {
      const results = await searchBolt(searchQuery);
      
      if (results.success && results.results?.length > 0) {
        onResults(results.results);
        setError('');
      } else {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      console.error('Bolt search error:', err);
      setError('AI search temporarily unavailable. Please try regular search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bolt-search-section">
      <button 
        className={`btn ${loading ? 'btn-secondary' : 'btn-primary'}`}
        onClick={handleBoltSearch}
        disabled={loading}
        style={{
          background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '10px 0'
        }}
      >
        {loading ? (
          <>
            <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span>
            AI Searching...
          </>
        ) : (
          <>
            🧠 Bolt Search
          </>
        )}
      </button>

      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '10px',
          borderRadius: '6px',
          marginTop: '10px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <p style={{ 
        fontSize: '12px', 
        color: '#666', 
        marginTop: '5px' 
      }}>
        🤖 AI-powered search across ICMR, Tara Dalal, Chinese CDN, American USDA databases
      </p>
    </div>
  );
}

export default BoltSearchButton;
