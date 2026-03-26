window.router = {
  routes: {
    login: window.renderLogin,
    dashboard: window.renderDashboard,
    branches: window.renderBranches,
    daily: window.renderDailyAccounting,
    transfers: window.renderTransfers,
    delivery: window.renderDelivery,
    reports: window.renderReports,
    settings: window.renderSettings
  },
  go(route) {
    window.appState.currentRoute = route;
    window.renderApp();
  }
};
