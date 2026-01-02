import React, { useState } from 'react';
import './ExportButton.css';

function ExportButton({ results }) {
  const [showMenu, setShowMenu] = useState(false);

  const exportAsText = () => {
    if (!results) return;
    
    const { query, answer, results: searchResults } = results;
    let text = `Query: ${query}\n\n`;
    text += `Answer:\n${answer?.text || 'N/A'}\n\n`;
    
    if (searchResults && searchResults.length > 0) {
      text += `Document References:\n`;
      searchResults.forEach((result, index) => {
        text += `\n${index + 1}. [${result.relevance} relevance]\n${result.text}\n`;
      });
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query-results-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const copyAsMarkdown = () => {
    if (!results) return;
    
    const { query, answer, results: searchResults } = results;
    let markdown = `# Query Results\n\n`;
    markdown += `**Query:** ${query}\n\n`;
    markdown += `## Answer\n\n${answer?.text || 'N/A'}\n\n`;
    
    if (searchResults && searchResults.length > 0) {
      markdown += `## Document References\n\n`;
      searchResults.forEach((result, index) => {
        markdown += `### ${index + 1}. [${result.relevance} relevance]\n\n${result.text}\n\n`;
      });
    }
    
    navigator.clipboard.writeText(markdown);
    setShowMenu(false);
    
    // Show feedback
    const button = document.querySelector('.export-button');
    const originalText = button.textContent;
    button.textContent = '✓ Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  };

  if (!results) return null;

  return (
    <div className="export-container">
      <button
        className="export-button"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Export options"
      >
        📥 Export
      </button>
      {showMenu && (
        <div className="export-menu">
          <button onClick={exportAsText} className="export-option">
            📄 Export as Text
          </button>
          <button onClick={copyAsMarkdown} className="export-option">
            📋 Copy as Markdown
          </button>
        </div>
      )}
    </div>
  );
}

export default ExportButton;

