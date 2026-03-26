window.apiClient = {
  async call(action, payload = {}) {
    const body = {
      action,
      payload,
      token: window.appState.token || ''
    };

    const res = await fetch(window.APP_CONFIG.API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });

    return await res.json();
  }
};
