// Background service worker for Manifest V3
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.localstorage === "fontname") {
      chrome.storage.sync.get(['fontname'], function(items) {
        sendResponse({fontname: items.fontname});
      });
      return true; // Keep the message channel open for async response
    }
  }
); 