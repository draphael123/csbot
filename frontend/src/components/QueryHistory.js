import React from 'react';
import './QueryHistory.css';

function QueryHistory({ history, onSelectQuery, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="query-history">
      <div className="query-history-header">
        <h4>Recent Searches</h4>
        <button 
          className="clear-history-btn"
          onClick={onClear}
          aria-label="Clear search history"
        >
          Clear
        </button>
      </div>
      <div className="history-items">
        {history.map((query, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => onSelectQuery(query)}
            aria-label={`Search for: ${query}`}
          >
            <span className="history-icon">🕐</span>
            <span className="history-text">{query}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QueryHistory;

