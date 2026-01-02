import React, { useState } from 'react';
import './CopyButton.css';

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button 
      className={`copy-button ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy ${label}`}
    >
      {copied ? '✓ Copied!' : '📋 Copy'}
    </button>
  );
}

export default CopyButton;

