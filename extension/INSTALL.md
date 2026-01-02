# Chrome Extension Installation Guide

## Step-by-Step Installation

### 1. Prepare the Extension
- Make sure you're in the project root directory
- The `extension` folder should contain all necessary files

### 2. Open Chrome Extensions Page
- Open Google Chrome
- Type `chrome://extensions/` in the address bar
- Or go to: Menu (⋮) → Extensions → Manage Extensions

### 3. Enable Developer Mode
- Look for the "Developer mode" toggle in the top-right corner
- Turn it ON (toggle should be blue/active)

### 4. Load the Extension
- Click the "Load unpacked" button (top-left)
- Navigate to your project folder
- Select the `extension` folder
- Click "Select Folder" (or "Open" on Windows)

### 5. Verify Installation
- You should see "Escalation Service - Customer Support Query" in your extensions list
- The extension icon should appear in your Chrome toolbar
- If you don't see it, click the puzzle piece icon (🧩) in the toolbar to find it

### 6. Configure the Extension
- Click the extension icon in your toolbar
- In the "API URL" field, enter your server URL (default: `http://localhost:3000`)
- Click "Save"
- Make sure your backend server is running

### 7. Test the Extension
- Enter a test query like "refund policy"
- Click "Search"
- You should see results appear

## Troubleshooting

### Extension doesn't appear
- Make sure Developer mode is enabled
- Check that you selected the `extension` folder (not the parent folder)
- Look for error messages in the extensions page

### "Service worker" errors
- This is normal on first load
- Refresh the extension or reload the page

### Can't connect to API
- Make sure the backend server is running (`npm start`)
- Verify the API URL is correct (check for typos)
- Try `http://localhost:3000/api/health` in your browser to test the server

### No results returned
- Check that the document is loaded on the server
- Verify the server console for any errors
- Try different query terms

## Updating the Extension

After making changes to extension files:
1. Go to `chrome://extensions/`
2. Find "Escalation Service"
3. Click the refresh icon (🔄) next to it
4. The extension will reload with your changes

## Removing the Extension

1. Go to `chrome://extensions/`
2. Find "Escalation Service"
3. Click "Remove"
4. Confirm removal

## Permissions Explained

The extension requests these permissions:
- **storage**: To save your API URL preference
- **activeTab**: To interact with web pages (for future features)
- **host_permissions**: To communicate with your API server

These are minimal and necessary for the extension to function.

