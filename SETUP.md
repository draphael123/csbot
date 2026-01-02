# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3000`

3. **Access the Web Interface**
   - Open your browser to `http://localhost:3000`
   - The document will be automatically loaded from `Fountain Workflows (Updated 12_23).docx`

## Chrome Extension Setup

1. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Or: Menu → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `extension` folder from this project
   - The extension should now appear in your extensions list

4. **Configure the Extension**
   - Click the extension icon in your toolbar
   - Set the API URL (default: `http://localhost:3000`)
   - Click "Save"
   - You're ready to use it!

## Extension Icons (Optional)

The extension will work without custom icons, but if you want to add them:

1. Create three icon files:
   - `extension/icons/icon16.png` (16x16 pixels)
   - `extension/icons/icon48.png` (48x48 pixels)
   - `extension/icons/icon128.png` (128x128 pixels)

2. You can use any image editor or online icon generator
3. The icons will automatically be used once placed in the `extension/icons/` folder

## Troubleshooting

### Server won't start
- Make sure Node.js is installed (v14+)
- Check that port 3000 is not in use
- Verify all dependencies are installed: `npm install`

### Document not loading
- Ensure `Fountain Workflows (Updated 12_23).docx` is in the root directory
- Check the server console for error messages
- The document path is relative to the `server/` folder

### Extension not working
- Make sure the server is running
- Check that the API URL in the extension matches your server URL
- Open Chrome DevTools (F12) and check the Console for errors
- Verify the extension has the correct permissions

### Query returns no results
- Try different query terms
- Check that the document was loaded successfully (visit `/api/health`)
- Some queries may not match if the terminology is very different

## Development Mode

### Backend Development
```bash
npm run dev
```
Uses nodemon for auto-reload on file changes.

### Frontend Development
```bash
cd frontend
npm start
```
Runs React development server (may need to configure proxy if backend is on different port).

## Testing the System

1. **Test Basic Query**
   - Enter: "refund policy"
   - Should return relevant document sections

2. **Test Irate Customer Detection**
   - Enter: "I'm frustrated with the service"
   - Should show empathetic response with de-escalation tips

3. **Test Quick Queries**
   - Use the quick query buttons
   - Should instantly populate and search

## Next Steps

- Customize the document by replacing `Fountain Workflows (Updated 12_23).docx`
- Modify search logic in `server/index.js`
- Customize UI styling in `frontend/src/` and `extension/popup.css`
- Add more documents or enhance search capabilities

