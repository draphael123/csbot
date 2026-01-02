const API_URL_KEY = 'escalation_service_api_url';
const DEFAULT_API_URL = 'http://localhost:3000';

// DOM elements
const apiUrlInput = document.getElementById('api-url');
const saveConfigBtn = document.getElementById('save-config');
const queryInput = document.getElementById('query-input');
const queryButton = document.getElementById('query-button');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsDiv = document.getElementById('results');
const answerText = document.getElementById('answer-text');
const toneBadge = document.getElementById('tone-badge');
const deEscalationTips = document.getElementById('de-escalation-tips');
const additionalResults = document.getElementById('additional-results');
const documentResults = document.getElementById('document-results');
const resultsList = document.getElementById('results-list');
const suggestions = document.getElementById('suggestions');
const suggestionsList = document.getElementById('suggestions-list');
const quickButtons = document.querySelectorAll('.quick-btn');

// Load saved API URL
chrome.storage.sync.get([API_URL_KEY], (result) => {
  if (result[API_URL_KEY]) {
    apiUrlInput.value = result[API_URL_KEY];
  }
});

// Save API URL
saveConfigBtn.addEventListener('click', () => {
  const url = apiUrlInput.value.trim();
  if (url) {
    chrome.storage.sync.set({ [API_URL_KEY]: url }, () => {
      showMessage('Configuration saved!', 'success');
    });
  }
});

// Query function
async function performQuery(query) {
  if (!query.trim()) {
    showError('Please enter a query');
    return;
  }

  // Get API URL
  const apiUrl = apiUrlInput.value.trim() || DEFAULT_API_URL;

  // Show loading, hide results and error
  loadingDiv.classList.remove('hidden');
  errorDiv.classList.add('hidden');
  resultsDiv.classList.add('hidden');
  queryButton.disabled = true;

  try {
    const response = await fetch(`${apiUrl}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query.trim(), limit: 5 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error('Query error:', error);
    showError(`Failed to query: ${error.message}. Make sure the server is running at ${apiUrl}`);
  } finally {
    loadingDiv.classList.add('hidden');
    queryButton.disabled = false;
  }
}

// Display results
function displayResults(data) {
  const { answer, results: searchResults, suggestions: suggestionsData } = data;

  // Display answer
  if (answer) {
    answerText.textContent = answer.text;
    toneBadge.textContent = answer.tone || 'professional';
    
    const answerSection = answerText.closest('.answer-section');
    if (answer.tone === 'empathetic') {
      answerSection.classList.add('irate');
    } else {
      answerSection.classList.remove('irate');
    }

    // Display de-escalation tips
    if (answer.deEscalationTips && answer.deEscalationTips.length > 0) {
      deEscalationTips.classList.remove('hidden');
      const tipsList = deEscalationTips.querySelector('ul') || document.createElement('ul');
      tipsList.innerHTML = '';
      answer.deEscalationTips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
      });
      if (!deEscalationTips.querySelector('ul')) {
        deEscalationTips.appendChild(tipsList);
      }
    } else {
      deEscalationTips.classList.add('hidden');
    }

    // Display additional results
    if (answer.additionalResults && answer.additionalResults.length > 0) {
      additionalResults.classList.remove('hidden');
      additionalResults.innerHTML = '<h4>Additional Information:</h4>';
      answer.additionalResults.forEach(result => {
        const p = document.createElement('p');
        p.className = 'additional-result-text';
        p.textContent = result + '...';
        additionalResults.appendChild(p);
      });
    } else {
      additionalResults.classList.add('hidden');
    }
  }

  // Display document results
  if (searchResults && searchResults.length > 0) {
    documentResults.classList.remove('hidden');
    resultsList.innerHTML = '';
    searchResults.forEach((result, index) => {
      const div = document.createElement('div');
      div.className = 'result-item';
      div.innerHTML = `
        <div class="result-header">
          <span>#${index + 1}</span>
          <span class="relevance-badge ${result.relevance}">${result.relevance} relevance</span>
        </div>
        <p class="result-text">${result.text}</p>
      `;
      resultsList.appendChild(div);
    });
  } else {
    documentResults.classList.add('hidden');
  }

  // Display suggestions
  if (suggestionsData && suggestionsData.length > 0) {
    suggestions.classList.remove('hidden');
    suggestionsList.innerHTML = '';
    suggestionsData.forEach(suggestion => {
      const span = document.createElement('span');
      span.className = 'suggestion-tag';
      span.textContent = suggestion;
      suggestionsList.appendChild(span);
    });
  } else {
    suggestions.classList.add('hidden');
  }

  resultsDiv.classList.remove('hidden');
}

// Show error
function showError(message) {
  errorDiv.textContent = `⚠️ ${message}`;
  errorDiv.classList.remove('hidden');
  resultsDiv.classList.add('hidden');
}

// Show success message
function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 0.75rem 1rem;
    background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
    color: ${type === 'success' ? '#155724' : '#721c24'};
    border-radius: 4px;
    z-index: 1000;
    font-size: 0.85rem;
  `;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  setTimeout(() => messageDiv.remove(), 3000);
}

// Query button click
queryButton.addEventListener('click', () => {
  performQuery(queryInput.value);
});

// Enter key in query input
queryInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    performQuery(queryInput.value);
  }
});

// Quick query buttons
quickButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const query = btn.getAttribute('data-query');
    queryInput.value = query;
    performQuery(query);
  });
});

