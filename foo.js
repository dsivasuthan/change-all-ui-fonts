
var fontname;

chrome.runtime.sendMessage({localstorage: "fontname"}, function(response) {

	fontname=response.fontname;

	if (fontname) {
		// Check if current site is excluded
		chrome.storage.sync.get(['excluded_sites'], function(items) {
			var excludedSites = items.excluded_sites || [];
			var currentDomain = window.location.hostname;
			
			// Only apply font if site is not excluded
			if (!excludedSites.includes(currentDomain)) {
				// Function to inject the style
				function injectStyle() {
					var divNode = document.createElement("div");
					divNode.innerHTML = '<style>*:not(span):not(i):not(.fa):not(mat-icon):not(button):not(gf-icon){font-family:' + fontname + ',sans-serif!important;}</style>';
					
					// Try to get head element, create if it doesn't exist
					var head = document.head || document.getElementsByTagName('head')[0];
					if (!head) {
						head = document.createElement('head');
						document.documentElement.insertBefore(head, document.documentElement.firstChild);
					}
					
					head.appendChild(divNode);
				}

				// If document is already ready, inject immediately
				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', injectStyle);
				} else {
					injectStyle();
				}
			}
		});
	}
	
});
