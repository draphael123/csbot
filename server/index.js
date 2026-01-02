const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const mammoth = require('mammoth');
const natural = require('natural');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// In-memory document store (in production, use a proper database)
let documentContent = '';
let documentChunks = [];

// Initialize document processing
async function initializeDocument() {
  try {
    const docPath = path.join(__dirname, '../Fountain Workflows (Updated 12_23).docx');
    
    if (!fs.existsSync(docPath)) {
      console.warn('Document not found, using empty content');
      return;
    }

    const result = await mammoth.extractRawText({ path: docPath });
    documentContent = result.value;
    
    // Split document into chunks for better search
    documentChunks = documentContent
      .split(/\n\n+/)
      .filter(chunk => chunk.trim().length > 20)
      .map((chunk, index) => ({
        id: index,
        text: chunk.trim(),
        keywords: extractKeywords(chunk)
      }));
    
    console.log(`Document loaded: ${documentChunks.length} chunks`);
  } catch (error) {
    console.error('Error loading document:', error);
  }
}

// Extract keywords from text
function extractKeywords(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const stopwords = natural.stopwords;
  
  return tokens
    .filter(token => token.length > 3 && !stopwords.includes(token))
    .slice(0, 10);
}

// Search function with relevance scoring
function searchDocument(query, limit = 5) {
  if (!documentContent) {
    return { results: [], message: 'Document not loaded' };
  }

  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  // Score each chunk
  const scoredChunks = documentChunks.map(chunk => {
    const chunkLower = chunk.text.toLowerCase();
    let score = 0;
    
    // Exact phrase match (highest score)
    if (chunkLower.includes(queryLower)) {
      score += 100;
    }
    
    // Word matches
    queryWords.forEach(word => {
      const wordCount = (chunkLower.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length;
      score += wordCount * 10;
    });
    
    // Keyword matches
    queryWords.forEach(word => {
      if (chunk.keywords.some(kw => kw.includes(word))) {
        score += 5;
      }
    });
    
    return { ...chunk, score };
  });
  
  // Sort by score and return top results
  const results = scoredChunks
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(chunk => ({
      text: chunk.text,
      score: chunk.score,
      relevance: chunk.score > 50 ? 'high' : chunk.score > 20 ? 'medium' : 'low'
    }));
  
  return { results, query, totalChunks: documentChunks.length };
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', documentLoaded: documentContent.length > 0 });
});

app.post('/api/query', async (req, res) => {
  try {
    const { query, limit = 5 } = req.body;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const searchResults = searchDocument(query.trim(), limit);
    
    // Format response for customer support context
    const response = {
      query: searchResults.query,
      results: searchResults.results,
      answer: formatAnswerForCustomer(searchResults.results, query),
      suggestions: generateSuggestions(query)
    };
    
    res.json(response);
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Format answer specifically for customer support
function formatAnswerForCustomer(results, query) {
  if (results.length === 0) {
    return {
      text: "I apologize, but I couldn't find specific information about that in our documentation. Let me connect you with a specialist who can assist you further.",
      tone: 'apologetic',
      action: 'escalate'
    };
  }
  
  const topResult = results[0];
  const isIrate = detectIrateCustomer(query);
  
  // Customize response based on customer tone
  if (isIrate) {
    return {
      text: `I understand your frustration, and I want to help resolve this for you. Based on our documentation: ${topResult.text.substring(0, 500)}...`,
      tone: 'empathetic',
      action: 'resolve',
      deEscalationTips: [
        'Acknowledge their frustration',
        'Provide clear, actionable information',
        'Offer to escalate if needed'
      ]
    };
  }
  
  return {
    text: topResult.text,
    tone: 'professional',
    action: 'inform',
    additionalResults: results.slice(1, 3).map(r => r.text.substring(0, 200))
  };
}

// Detect if customer query indicates frustration
function detectIrateCustomer(query) {
  const irateKeywords = [
    'angry', 'furious', 'frustrated', 'upset', 'disappointed',
    'terrible', 'awful', 'horrible', 'worst', 'unacceptable',
    'refund', 'cancel', 'complain', 'sue', 'lawyer'
  ];
  
  const queryLower = query.toLowerCase();
  return irateKeywords.some(keyword => queryLower.includes(keyword));
}

// Generate helpful suggestions
function generateSuggestions(query) {
  const suggestions = [];
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('refund') || queryLower.includes('money')) {
    suggestions.push('Check refund policy');
    suggestions.push('Review payment terms');
  }
  
  if (queryLower.includes('time') || queryLower.includes('when')) {
    suggestions.push('Check processing times');
    suggestions.push('Review timeline expectations');
  }
  
  if (queryLower.includes('how') || queryLower.includes('process')) {
    suggestions.push('Review step-by-step procedures');
    suggestions.push('Check workflow documentation');
  }
  
  return suggestions.length > 0 ? suggestions : ['Try rephrasing your question', 'Check related documentation'];
}

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Initialize and start server
initializeDocument().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API endpoints:');
    console.log('  GET  /api/health');
    console.log('  POST /api/query');
  });
});

