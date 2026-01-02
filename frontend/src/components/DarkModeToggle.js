import React from 'react';
import './DarkModeToggle.css';

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`}
      onClick={onToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Light mode' : 'Dark mode'}
    >
      <span className="toggle-icon">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}

export default DarkModeToggle;

