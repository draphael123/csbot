import { useState, useEffect } from 'react';

const STORAGE_KEY = 'escalation_service_query_history';
const MAX_HISTORY = 10;

export function useQueryHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load query history:', err);
    }
  }, []);

  const addToHistory = (query) => {
    if (!query || !query.trim()) return;
    
    setHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      const newHistory = [query, ...filtered].slice(0, MAX_HISTORY);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (err) {
        console.error('Failed to save query history:', err);
      }
      
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear query history:', err);
    }
  };

  return { history, addToHistory, clearHistory };
}

