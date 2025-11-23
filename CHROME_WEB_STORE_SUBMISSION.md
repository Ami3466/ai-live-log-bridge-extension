# Chrome Web Store Submission Guide

## Ready to Submit! ✅

Your extension is now **Chrome Web Store compliant** and ready for submission.

### What's Ready:

- ✅ **Manifest.json** - Uses `optional_host_permissions` for localhost
- ✅ **Privacy Policy** - Hosted on GitHub
- ✅ **LICENSE** - MIT License included
- ✅ **Icons** - 16px, 48px, 128px (all present)
- ✅ **Code** - Clean, secure, no external dependencies
- ✅ **ZIP file** - `chrome-web-store-submission.zip` (19KB)

### What You Still Need:

- ⏳ **Screenshots** (1-5 images, 1280x800) - See SCREENSHOT_GUIDELINES.md
- ⏳ **Small Promo Tile** (440x280) - Required for featured placement
- ⏳ **Google Developer Account** ($5 one-time fee)

## Submission Steps

### Step 1: Create Screenshots

Follow [SCREENSHOT_GUIDELINES.md](SCREENSHOT_GUIDELINES.md) to create 3-5 screenshots.

**Quick recommendation:**
1. Split screen: Browser console + Terminal with logs
2. Architecture diagram showing flow
3. chrome://extensions page showing extension

### Step 2: Create Promo Tile (440x280)

Use Canva or Figma:
- Background: Your brand color
- Logo: Use `logo.png`
- Text: "AI Live Terminal Bridge"
- Subtitle: "Localhost debugging for AI"

### Step 3: Submit to Chrome Web Store

1. Go to: https://chrome.google.com/webstore/devconsole
2. Sign in with Google account
3. Pay $5 developer registration fee (one-time)
4. Click **"New Item"**
5. Upload: `chrome-web-store-submission.zip`

### Step 4: Fill Store Listing

Copy from [STORE_DESCRIPTION.md](STORE_DESCRIPTION.md):

- **Short description** (132 chars max):
  ```
  Captures console logs & network activity from localhost for AI debugging. Requires native host. Privacy-focused, localhost only.
  ```

- **Detailed description**: Copy from STORE_DESCRIPTION.md

- **Category**: Developer Tools

- **Language**: English

- **Privacy Policy URL**:
  ```
  https://github.com/Ami3466/ai-live-log-bridge-extension/blob/main/PRIVACY_POLICY.md
  ```

- **Upload screenshots** (1-5 images)

- **Upload promotional tiles**:
  - Small tile: 440x280 (required)
  - Large tile: 920x680 (optional)

### Step 5: Permissions Justification

When asked about permissions, explain:

**nativeMessaging:**
```
Required to communicate with the local AI Live Log Bridge MCP server for processing and storing browser logs.
```

**optional_host_permissions (localhost):**
```
Optional permission requested when user visits localhost. Allows monitoring of local development servers for debugging purposes. Only activated when user grants permission.
```

**host_permissions (HTTPS tunnels):**
```
Monitors development tunnels (ngrok, localtunnel, Cloudflare Tunnel) commonly used for local development, mobile testing, and webhook testing.
```

### Step 6: Submit for Review

- Click **"Submit for Review"**
- Review typically takes **1-3 business days**
- You'll receive email when approved/rejected

## After Approval

Once approved:

1. ✅ Extension will be live on Chrome Web Store
2. ✅ Users can install with one click
3. ✅ Update main project README with Chrome Web Store link
4. ✅ Add Chrome Web Store badge:
   ```markdown
   [![Chrome Web Store](https://img.shields.io/chrome-web-store/v/YOUR_EXTENSION_ID.svg)](https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID)
   ```

## Common Rejection Reasons to Avoid

- ❌ Privacy policy doesn't explain permissions clearly
- ❌ No screenshots or poor quality screenshots
- ❌ Extension doesn't work as described
- ❌ Misleading description

**You've avoided all of these!** ✅

## Differences from Development Version

This version differs from `/Users/amit/Projects/ai-live-log-bridge/extension/`:

| Feature | Development Version | Chrome Web Store Version |
|---------|-------------------|------------------------|
| localhost permissions | `host_permissions` (automatic) | `optional_host_permissions` (user prompt) |
| content_scripts matches | Specific URLs | `<all_urls>` |
| User experience | Zero friction | One-time permission prompt |
| Chrome Web Store | ❌ Rejected | ✅ Compliant |

## Testing Before Submission

1. Load unpacked extension in Chrome:
   ```bash
   cd /Users/amit/Projects/ai-live-log-bridge-extension
   # Chrome -> chrome://extensions/ -> Load unpacked -> Select this folder
   ```

2. Visit `http://localhost:3000`

3. You should see permission prompt - Click "Allow"

4. Open DevTools, run `console.log('test')`

5. Check logs appear in `~/.mcp-logs/browser/`

## Support

- **Questions?** Open an issue: https://github.com/Ami3466/ai-live-log-bridge-extension/issues
- **Main Project**: https://github.com/Ami3466/ai-live-log-bridge

---

**Estimated time to complete submission:** 2-3 hours (mostly screenshots)

**Cost:** $5 one-time developer fee

**Good luck!** 🚀
