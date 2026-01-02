# Escalation Service - Customer Support Query System

A comprehensive document query system designed to help customer support teams quickly find answers from documentation, with special focus on handling irate customers.

## Features

- **Document Query System**: Query your documentation (Word documents) to find relevant answers
- **Irate Customer Detection**: Automatically detects frustrated customers and provides empathetic responses
- **Web Interface**: Beautiful, modern web interface for querying documents
- **Chrome Extension**: Quick access to query functionality from any webpage
- **Smart Search**: Relevance-based search with keyword extraction and scoring
- **Customer Support Best Practices**: Built-in de-escalation tips and response formatting

## Project Structure

```
.
├── server/              # Backend API (Node.js/Express)
│   └── index.js        # Main server file with query logic
├── frontend/           # React web application
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.js     # Main app component
│   └── public/
├── extension/          # Chrome extension
│   ├── manifest.json  # Extension manifest
│   ├── popup.html     # Extension popup UI
│   └── popup.js       # Extension logic
└── Fountain Workflows (Updated 12_23).docx  # Source document
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**

```bash
npm run install-all
```

Or manually:
```bash
npm install
cd frontend && npm install
```

2. **Place your document:**

Ensure `Fountain Workflows (Updated 12_23).docx` is in the root directory (it should already be there).

## Usage

### Starting the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Using the Web Interface

1. Start the server (see above)
2. Open your browser and navigate to `http://localhost:3000`
3. Enter your query in the search box
4. View results with recommended responses

### Installing the Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension` folder from this project
5. The extension icon will appear in your toolbar

### Using the Chrome Extension

1. Click the extension icon in your Chrome toolbar
2. Configure the API URL (default: `http://localhost:3000`)
3. Enter your query or use quick query buttons
4. View results directly in the popup

## API Endpoints

### `GET /api/health`

Check server status and document loading status.

**Response:**
```json
{
  "status": "ok",
  "documentLoaded": true
}
```

### `POST /api/query`

Query the document for answers.

**Request:**
```json
{
  "query": "How do I get a refund?",
  "limit": 5
}
```

**Response:**
```json
{
  "query": "How do I get a refund?",
  "results": [
    {
      "text": "Document excerpt...",
      "score": 85,
      "relevance": "high"
    }
  ],
  "answer": {
    "text": "Formatted answer for customer...",
    "tone": "empathetic",
    "action": "resolve",
    "deEscalationTips": [
      "Acknowledge their frustration",
      "Provide clear, actionable information"
    ]
  },
  "suggestions": [
    "Check refund policy",
    "Review payment terms"
  ]
}
```

## Features for Irate Customers

The system automatically detects irate customers based on keywords like:
- "angry", "frustrated", "upset", "disappointed"
- "terrible", "awful", "unacceptable"
- "refund", "cancel", "complain"

When detected, the system:
- Provides empathetic responses
- Offers de-escalation tips
- Formats answers to acknowledge customer concerns
- Suggests appropriate escalation paths

## Customization

### Changing the Document

Replace `Fountain Workflows (Updated 12_23).docx` with your own document. The system will automatically load it on server start.

### Modifying Search Logic

Edit `server/index.js` to customize:
- Search scoring algorithm
- Keyword extraction
- Irate customer detection keywords
- Response formatting

### Styling

- Web interface: Edit files in `frontend/src/`
- Chrome extension: Edit `extension/popup.css`

## Development

### Frontend Development

```bash
cd frontend
npm start
```

Runs the React app in development mode on `http://localhost:3000` (if backend is on same port, you may need to configure proxy).

### Backend Development

```bash
npm run dev
```

Uses nodemon for auto-reload on file changes.

## Technologies Used

- **Backend**: Node.js, Express, Mammoth (Word doc parsing), Natural (NLP)
- **Frontend**: React
- **Extension**: Chrome Extension Manifest V3
- **Search**: Keyword-based with relevance scoring

## Future Enhancements

- Vector embeddings for semantic search
- Multiple document support
- User authentication
- Query history
- Analytics dashboard
- Integration with CRM systems

## License

MIT

## Support

For issues or questions, please check the documentation or create an issue in the repository.

