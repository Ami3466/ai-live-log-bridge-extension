# AI Live Terminal Bridge - Browser Monitor

**Privacy-focused browser monitoring for localhost development**

This Chrome extension captures console logs and network activity from your localhost pages, designed to work with the [AI Live Log Bridge](https://github.com/Ami3466/ai-live-log-bridge) MCP server for seamless AI debugging.

## Features

- ✅ Captures all console logs (log, info, warn, error, debug)
- ✅ Monitors network requests (fetch, XMLHttpRequest)
- ✅ Captures JavaScript errors and stack traces
- ✅ Tracks performance metrics
- ✅ **Privacy-focused**: Only monitors localhost:* and 127.0.0.1:* pages
- ✅ **No external connections**: All data stays on your machine
- ✅ **Automatic secret redaction**: Cookies, tokens, and API keys are automatically redacted
- ✅ **Status popup**: See connection status at a glance

## Installation

### From Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store listing](#) (link coming soon)
2. Click "Add to Chrome"
3. Grant the requested permissions
4. Done! The extension will start monitoring localhost pages automatically

### For Developers (Load Unpacked)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select this directory
6. The extension will appear in your extensions list

## How It Works

### Standalone Mode (Default)

The extension works immediately after installation:

1. Open any localhost page (e.g., `http://localhost:3000`)
2. The extension automatically captures console logs and network activity
3. Logs appear in your browser's DevTools Console (F12)
4. Click the extension icon to see monitoring status

### Full Integration Mode (Advanced)

For AI debugging with the MCP server:

1. Install the complete system: `npm install -g ai-live-log-bridge`
2. Follow the [setup guide](https://github.com/Ami3466/ai-live-log-bridge)
3. The extension will connect to the native host automatically
4. AI can now read your browser logs directly

## Status Popup

Click the extension icon to see:

- **Native Host** - Connection status (optional, for MCP integration)
- **MCP Server** - Whether the server is running (optional)
- **Monitoring** - Whether the current tab is being monitored

The popup auto-refreshes every 3 seconds.

## Privacy & Security

- **Localhost only**: Only monitors `localhost:*` and `127.0.0.1:*` by default
- **No tracking**: We don't collect any usage data or analytics
- **No external connections**: All data stays on your local machine
- **Automatic secret redaction**: Sensitive data is redacted before logging
- **Open source**: Full source code available on GitHub

## Optional Permissions

The extension requests optional permissions for tunneling services:
- `https://*.ngrok.io/*` - Ngrok tunnels
- `https://*.ngrok-free.app/*` - Ngrok free tier
- `https://*.loca.lt/*` - Localtunnel
- `https://*.trycloudflare.com/*` - Cloudflare Tunnel

These are **optional** and only needed if you want to monitor tunneled localhost connections.

## Permissions Explained

- **nativeMessaging**: Enables optional connection to the MCP server via native host
- **tabs**: Required to identify which tab logs are coming from
- **activeTab**: Required to show current tab status in the popup

## Troubleshooting

### "Native Host Disconnected" in popup

This is **normal** for most users! The native host is optional and only needed for full MCP integration.

To enable (optional):
1. Install: `npm install -g ai-live-log-bridge`
2. Follow the [setup guide](https://github.com/Ami3466/ai-live-log-bridge)

### No logs appearing

- Ensure you're on a **localhost** page (not a regular website)
- Check the extension is enabled at `chrome://extensions/`
- Open DevTools (F12) to see captured logs in the Console

### How to view logs

Logs are visible in:
1. Browser DevTools Console (F12) - always available
2. Extension service worker console (`chrome://extensions/` → Service Worker)
3. MCP server (if native host is installed)

## Development

### Project Structure

```
.
├── manifest.json       # Extension manifest (Manifest V3)
├── background.js       # Background service worker
├── content.js          # Content script (message relay)
├── injected.js         # Page context script (captures logs)
├── popup.html          # Status popup UI
├── popup.js            # Popup logic
├── icon*.png           # Extension icons
└── README.md           # This file
```

### No Build Required

This extension uses vanilla JavaScript - no build step needed!

## Links

- **Main Project**: [AI Live Log Bridge](https://github.com/Ami3466/ai-live-log-bridge)
- **Report Issues**: [GitHub Issues](https://github.com/Ami3466/ai-live-log-bridge-extension/issues)
- **Privacy Policy**: [PRIVACY_POLICY.md](PRIVACY_POLICY.md)

## License

MIT License - See [LICENSE](LICENSE) file for details

---

**Made for developers who want AI to see what they see** 🤖👀
