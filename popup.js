/**
 * Popup Script - Simplified
 */

// Update status on load
document.addEventListener('DOMContentLoaded', () => {
  updateStatus();
  // Auto-refresh every 3 seconds
  setInterval(updateStatus, 3000);
});

function updateStatus() {
  // Get current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs[0]) {
      setMonitoring('unknown', 'No Active Tab');
      return;
    }

    const tab = tabs[0];
    const url = tab.url || '';

    // Check if localhost
    const isLocalhost =
      url.startsWith('http://localhost:') ||
      url.startsWith('http://127.0.0.1:') ||
      url.includes('.ngrok.io') ||
      url.includes('.ngrok-free.app') ||
      url.includes('.loca.lt') ||
      url.includes('.trycloudflare.com');

    // Update monitoring status
    if (isLocalhost) {
      try {
        const urlObj = new URL(url);
        setMonitoring('connected', `${urlObj.hostname}:${urlObj.port}`);
        setInfo('success', `Logs forwarding to AI`);
      } catch (e) {
        setMonitoring('connected', 'Active');
        setInfo('success', 'Monitoring active');
      }
    } else {
      setMonitoring('unknown', 'Not on localhost');
      setInfo('info', 'Open a localhost page to start monitoring');
    }

    // Get native connection status
    chrome.runtime.sendMessage({ type: 'getStatus' }, (response) => {
      if (response && response.nativeConnected) {
        setNativeStatus('connected', 'Connected');
      } else {
        setNativeStatus('disconnected', 'Disconnected');
      }
    });
  });
}

function setMonitoring(state, text) {
  const el = document.getElementById('monitoringStatus');
  if (!el) return;

  const dot = state === 'connected' ? 'connected' : state === 'disconnected' ? 'disconnected' : 'unknown';
  const color = state === 'connected' ? 'text-success' : state === 'disconnected' ? 'text-error' : 'text-muted';
  el.innerHTML = `<span class="dot ${dot}"></span><span class="${color}">${text}</span>`;
}

function setNativeStatus(state, text) {
  const el = document.getElementById('nativeStatus');
  if (!el) return;

  const dot = state === 'connected' ? 'connected' : 'disconnected';
  const color = state === 'connected' ? 'text-success' : 'text-error';
  el.innerHTML = `<span class="dot ${dot}"></span><span class="${color}">${text}</span>`;
}

function setInfo(type, text) {
  const card = document.getElementById('infoCard');
  const textEl = document.getElementById('infoText');
  if (!card || !textEl) return;

  card.classList.remove('warning', 'success');
  if (type === 'success') card.classList.add('success');
  if (type === 'warning') card.classList.add('warning');

  textEl.innerHTML = `<span class="info-icon">${text}</span>`;
}

// Refresh button
document.getElementById('refreshBtn')?.addEventListener('click', updateStatus);

// Open Permissions button
document.getElementById('permissionsBtn')?.addEventListener('click', () => {
  chrome.management.getSelf((info) => {
    chrome.tabs.create({ url: `chrome://extensions/?id=${info.id}` });
  });
});

// Get MCP button
document.getElementById('mcpBtn')?.addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/Ami3466/ai-live-log-bridge' });
});
