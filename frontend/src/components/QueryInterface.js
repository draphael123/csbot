import React, { useState } from 'react';
import './QueryInterface.css';

function QueryInterface({ onQuery, loading, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onQuery(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQueries = [
    'Refund policy',
    'Processing time',
    'How to escalate',
    'Contact information',
    'Account issues'
  ];

  return (
    <div className="query-interface">
      <form onSubmit={handleSubmit} className="query-form">
        <div className="input-container">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your question or search query... (e.g., 'How do I get a refund?' or 'I'm frustrated with the service')"
            className="query-input"
            rows="3"
            disabled={loading}
          />
          <button
            type="submit"
            className="query-button"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="quick-queries">
        <p className="quick-queries-label">Quick queries:</p>
        <div className="quick-query-buttons">
          {quickQueries.map((quickQuery, index) => (
            <button
              key={index}
              className="quick-query-button"
              onClick={() => {
                setQuery(quickQuery);
                onQuery(quickQuery);
              }}
              disabled={loading}
            >
              {quickQuery}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QueryInterface;

