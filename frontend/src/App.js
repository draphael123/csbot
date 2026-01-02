import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import QueryInterface from './components/QueryInterface';
import ResultsDisplay from './components/ResultsDisplay';
import DarkModeToggle from './components/DarkModeToggle';
import { AnswerSkeleton, ResultsSkeleton } from './components/LoadingSkeleton';
import { useQueryHistory } from './hooks/useQueryHistory';
import { useDarkMode } from './hooks/useDarkMode';

// Use relative URL for production (Vercel), absolute for development
const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000');

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);
  const { history, addToHistory, clearHistory } = useQueryHistory();
  const { darkMode, toggleDarkMode } = useDarkMode();

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
      addToHistory(queryText);
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err.message || 'An error occurred while querying the document');
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const textarea = document.querySelector('.query-input');
        textarea?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
      
      <header className="App-header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              <span className="gradient-text">Customer Support</span>
              <br />
              Query Service
            </h1>
            <p className="subtitle">Get instant answers from our documentation</p>
            <p className="keyboard-hint">
              Press <kbd>Ctrl+K</kbd> or <kbd>Cmd+K</kbd> to focus search
            </p>
          </div>
          <div className="header-decoration">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
        </div>
      </header>
      
      <main className="App-main">
        <QueryInterface
          onQuery={handleQuery}
          loading={loading}
          history={history}
          onSelectFromHistory={handleQuery}
          onClearHistory={clearHistory}
        />
        
        {loading && (
          <div ref={resultsRef}>
            <AnswerSkeleton />
            <ResultsSkeleton />
          </div>
        )}
        
        {error && (
          <div className="error-message" role="alert">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => {
                  const lastQuery = history[0];
                  if (lastQuery) handleQuery(lastQuery);
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        <div ref={resultsRef}>
          {results && !loading && <ResultsDisplay results={results} />}
        </div>
      </main>
      
      <footer className="App-footer">
        <p>Powered by intelligent document search</p>
      </footer>
    </div>
  );
}

export default App;

