/**
 * Popup Script
 * Shows connection status for Native Host and MCP Server
 */

// Get status from background script
function updateStatus() {
  chrome.runtime.sendMessage({ type: 'getStatus' }, (response) => {
    if (!response) {
      showDisconnected();
      return;
    }

    const { nativeConnected, mcpConnected, activeTab } = response;

    // Update Native Host status
    updateNativeStatus(nativeConnected);

    // Update MCP Server status
    updateMCPStatus(mcpConnected);

    // Update Monitoring status
    updateMonitoringStatus(activeTab);

    // Update info text and card styling
    updateInfoCard(nativeConnected, mcpConnected, activeTab);
  });
}

function updateNativeStatus(connected) {
  const el = document.getElementById('nativeStatus');
  if (connected) {
    el.innerHTML = '<span class="dot connected"></span><span class="text-success">Connected</span>';
  } else {
    el.innerHTML = '<span class="dot disconnected"></span><span class="text-error">Disconnected</span>';
  }
}

function updateMCPStatus(connected) {
  const el = document.getElementById('mcpStatus');
  if (connected === true) {
    el.innerHTML = '<span class="dot connected"></span><span class="text-success">Connected</span>';
  } else if (connected === false) {
    el.innerHTML = '<span class="dot disconnected"></span><span class="text-error">Not Running</span>';
  } else {
    el.innerHTML = '<span class="dot unknown"></span><span class="text-muted">Unknown</span>';
  }
}

function updateMonitoringStatus(activeTab) {
  const el = document.getElementById('monitoringStatus');

  if (!activeTab) {
    el.innerHTML = '<span class="dot unknown"></span><span class="text-muted">No Active Tab</span>';
    return;
  }

  const isLocalhost = activeTab.url && (
    activeTab.url.startsWith('http://localhost:') ||
    activeTab.url.startsWith('http://127.0.0.1:') ||
    activeTab.url.includes('.ngrok.io') ||
    activeTab.url.includes('.ngrok-free.app') ||
    activeTab.url.includes('.loca.lt') ||
    activeTab.url.includes('.trycloudflare.com')
  );

  if (isLocalhost) {
    el.innerHTML = '<span class="dot connected"></span><span class="text-success">Active</span>';
  } else {
    el.innerHTML = '<span class="dot unknown"></span><span class="text-muted">Not on localhost</span>';
  }
}

function updateInfoCard(nativeConnected, mcpConnected, activeTab) {
  const card = document.getElementById('infoCard');
  const text = document.getElementById('infoText');

  // Remove existing classes
  card.classList.remove('warning', 'success');

  // Check if monitoring a localhost page
  const isLocalhost = activeTab && activeTab.url && (
    activeTab.url.startsWith('http://localhost:') ||
    activeTab.url.startsWith('http://127.0.0.1:')
  );

  if (isLocalhost) {
    const url = new URL(activeTab.url);
    if (nativeConnected) {
      card.classList.add('success');
      text.innerHTML = `<span class="info-icon">✅</span>Monitoring ${url.hostname}:${url.port} • Logs forwarding to AI`;
    } else {
      text.innerHTML = `<span class="info-icon">👁️</span>Monitoring ${url.hostname}:${url.port}`;
    }
  } else {
    text.innerHTML = '<span class="info-icon">ℹ️</span>Open a localhost page to start monitoring';
  }
}

function showDisconnected() {
  const card = document.getElementById('infoCard');
  const text = document.getElementById('infoText');

  document.getElementById('nativeStatus').innerHTML =
    '<span class="dot disconnected"></span><span class="text-error">Disconnected</span>';
  document.getElementById('mcpStatus').innerHTML =
    '<span class="dot unknown"></span><span class="text-muted">Unknown</span>';
  document.getElementById('monitoringStatus').innerHTML =
    '<span class="dot unknown"></span><span class="text-muted">Inactive</span>';

  card.classList.add('warning');
  text.innerHTML = '<span class="info-icon">⚠️</span>Could not communicate with background script. Try reloading the extension.';
}

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', () => {
  updateStatus();
});

// View logs button - opens service worker console
document.getElementById('logsBtn').addEventListener('click', () => {
  chrome.management.getSelf((info) => {
    const url = `chrome://extensions/?id=${info.id}`;
    chrome.tabs.create({ url });
  });
});

// Get MCP button - opens GitHub
document.getElementById('mcpBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://github.com/Ami3466/ai-live-log-bridge' });
});

// Initial load
updateStatus();

// Auto-refresh every 3 seconds
setInterval(updateStatus, 3000);
