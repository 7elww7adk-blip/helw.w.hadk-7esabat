window.auth = {
  async login(username, password) {
    const response = await apiClient.call('auth.login', { username, password });
    if (!response.ok) return response;

    window.appState.token = response.data.token;
    window.appState.user = response.data.user;
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response;
  },
  logout() {
    window.appState.token = '';
    window.appState.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.router.go('login');
  },
  hasRole(roles) {
    if (!window.appState.user) return false;
    return roles.includes(window.appState.user.role);
  }
};
