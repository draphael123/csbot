// Background service worker for the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Escalation Service extension installed');
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'query') {
    // Handle query requests if needed
    sendResponse({ status: 'received' });
  }
  return true;
});

