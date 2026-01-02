import React, { useState } from 'react';
import './App.css';
import QueryInterface from './components/QueryInterface';
import ResultsDisplay from './components/ResultsDisplay';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async (queryText) => {
    if (!queryText.trim()) {
      setError('Please enter a query');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryText, limit: 5 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while querying the document');
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Support Query Service</h1>
        <p>Get instant answers from our documentation</p>
      </header>
      
      <main className="App-main">
        <QueryInterface
          onQuery={handleQuery}
          loading={loading}
          initialQuery={query}
        />
        
        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}
        
        {results && <ResultsDisplay results={results} />}
      </main>
    </div>
  );
}

export default App;

