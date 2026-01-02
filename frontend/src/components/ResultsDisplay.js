import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results }) {
  if (!results) return null;

  const { answer, results: searchResults, suggestions, query } = results;
  const isIrate = answer?.tone === 'empathetic';

  return (
    <div className="results-display">
      <div className="results-header">
        <h2>Results for: "{query}"</h2>
        {isIrate && (
          <div className="irate-indicator">
            <span className="irate-badge">⚠️ Customer Support Mode</span>
          </div>
        )}
      </div>

      <div className="answer-section">
        <div className={`answer-card ${isIrate ? 'irate-customer' : ''}`}>
          <div className="answer-header">
            <h3>{isIrate ? 'Recommended Response' : 'Answer'}</h3>
            <span className="tone-badge">{answer?.tone || 'professional'}</span>
          </div>
          
          <div className="answer-text">
            {answer?.text}
          </div>

          {answer?.deEscalationTips && (
            <div className="de-escalation-tips">
              <h4>De-escalation Tips:</h4>
              <ul>
                {answer.deEscalationTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {answer?.additionalResults && answer.additionalResults.length > 0 && (
            <div className="additional-results">
              <h4>Additional Information:</h4>
              {answer.additionalResults.map((result, index) => (
                <p key={index} className="additional-result-text">
                  {result}...
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {searchResults && searchResults.length > 0 && (
        <div className="search-results-section">
          <h3>Document References</h3>
          <div className="results-list">
            {searchResults.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-header">
                  <span className="result-number">#{index + 1}</span>
                  <span className={`relevance-badge ${result.relevance}`}>
                    {result.relevance} relevance
                  </span>
                </div>
                <p className="result-text">{result.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="suggestions-section">
          <h3>Suggestions</h3>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <span key={index} className="suggestion-tag">
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;

