# change-all-UI-fonts
Chrome extension that replaces all UI font to a user-given font.

https://chrome.google.com/webstore/detail/change-all-ui-fonts/loiejdbcheeiipmakhghinclmpafiiel?utm_source=chrome-ntp-icon

## Description
Transform the appearance of any website by changing all fonts to your preferred typeface. Simply enter your desired font name in the extension options and watch as all text across the web adopts your chosen style.

**Key Features:**
- Apply custom fonts to all websites instantly
- Exclude specific sites from font changes
- Sync settings across all your devices
- Built with modern Manifest V3 for reliability

**How to Use:**
1. Click the extension icon and enter your font name (e.g., "Consolas", "Arial")
2. Save your preference and refresh any webpage
3. Use the exclusion feature to keep certain sites unchanged

**Note:** This extension changes all text fonts, including icon fonts (like Font Awesome), which may display as squares. Perfect for simple websites and personal customization.

## Installation
1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your extensions list

## Usage
1. Click the extension icon in your browser toolbar
2. Enter your desired font name (e.g., "Consolas", "Arial", "Times New Roman")
3. Click "Save" to apply the changes
4. Refresh any open web pages to see the font changes
5. Use "Exclude site" to prevent font changes on specific websites

## Changelog

### Version 1.5.1 (Latest)
- **Enhanced Font Exclusion**: Added more elements to the font exclusion list
  - Added `mat-icon` and `gf-icon` to prevent font changes on Material Design icons and Google Fonts icons
  - Improved compatibility with modern web frameworks and icon libraries

### Version 1.5.0
- **Major Update**: Migrated to Manifest V3
  - Updated `manifest_version` from 2 to 3
  - Replaced `browser_action` with `action` API
  - Converted background page to service worker (`background.js`)
  - Updated deprecated `chrome.extension.*` APIs to `chrome.runtime.*`
  - Added `tabs` permission for site exclusion feature
- **New Feature**: Site Exclusion System
  - Added "Exclude site" button in options page
  - Users can exclude specific websites from font changes
  - Visual list of excluded sites with individual remove buttons
  - Exclusion based on domain (hostname) level
- **Bug Fixes**:
  - Fixed DOM element access issues when running at `document_start`
  - Improved error handling for missing `<head>` elements
  - Enhanced content script timing and reliability

### Version 1.4.2 (Previous)
- Initial release with Manifest V2
- Basic font changing functionality
- Chrome sync storage for settings
- Content script injection for font application

## Technical Details
- **Manifest Version**: 3
- **Permissions**: `storage`, `tabs`
- **Content Scripts**: Run at `document_start` for early font injection
- **Storage**: Uses Chrome sync storage for cross-device settings
- **Font Application**: CSS injection with `!important` declarations
- **Exclusions**: Excludes `span`, `i`, `.fa`, `mat-icon`, `button`, `gf-icon` elements

## Development
The extension uses:
- Service worker for background functionality
- Content scripts for DOM manipulation
- Chrome Storage API for settings persistence
- Chrome Tabs API for current tab detection

## Support
For issues or feature requests, please contact the developer or create an issue in the project repository.

**Source Code:** https://github.com/dsivasuthan/change-all-ui-fonts
