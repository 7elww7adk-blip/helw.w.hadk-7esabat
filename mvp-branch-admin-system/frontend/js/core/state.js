window.appState = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  currentRoute: 'login'
};
