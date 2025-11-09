import React from 'react';

/**
 * Redirect Button to Health Metrics App
 * 
 * When user wants to log/track meals, redirect them to your
 * separate Health Metrics app (deployed on Vercel/Replit)
 */

function HealthMetricsRedirect({ foodData }) {
  const HEALTH_METRICS_URL = process.env.REACT_APP_HEALTH_METRICS_URL || 'https://your-health-metrics.vercel.app';

  const handleRedirect = () => {
    // Option 1: Simple redirect
    window.open(HEALTH_METRICS_URL, '_blank');

    // Option 2: Pass food data via URL params (if your health app supports it)
    /*
    const params = new URLSearchParams({
      food: foodData?.food_name,
      calories: foodData?.calories,
      gi: foodData?.glycemic_index
    });
    window.open(`${HEALTH_METRICS_URL}?${params.toString()}`, '_blank');
    */
  };

  return (
    <div className="health-metrics-box">
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ color: 'white', padding: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>📊 Want to Track This?</h3>
          <p style={{ marginBottom: '15px', opacity: 0.95 }}>
            Log your meals, track daily calories, and monitor your 90-day health program
            in your Health Metrics app!
          </p>
          
          <button 
            className="btn btn-lg" 
            style={{ 
              background: 'white', 
              color: '#667eea',
              width: '100%',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
            onClick={handleRedirect}
          >
            📈 Go to My Health Metrics App →
          </button>
          
          <p style={{ marginTop: '10px', fontSize: '12px', opacity: 0.8 }}>
            Your personal 90-day health tracking dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

export default HealthMetricsRedirect;

