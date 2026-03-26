window.actions = {
  async submitLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if (!username || !password) return showToast('من فضلك أدخل البيانات', true);
    const res = await auth.login(username, password);
    if (!res.ok) return showToast(res.message, true);
    showToast('مرحباً ' + res.data.user.fullName);
    router.go('dashboard');
  },

  async saveBranch() {
    const payload = {
      name: document.getElementById('branch-name').value.trim(),
      code: document.getElementById('branch-code').value.trim(),
      address: document.getElementById('branch-address').value.trim(),
      phone: document.getElementById('branch-phone').value.trim()
    };
    if (!payload.name) return showToast('اسم الفرع مطلوب', true);
    const res = await apiClient.call('branches.save', payload);
    showToast(res.message, !res.ok);
    if (res.ok) loadBranches();
  },

  async saveDailyEntry() {
    const payload = {
      date: document.getElementById('daily-date').value,
      branchId: document.getElementById('daily-branch').value.trim(),
      sales: Number(document.getElementById('daily-sales').value || 0),
      returns: Number(document.getElementById('daily-returns').value || 0),
      purchases: Number(document.getElementById('daily-purchases').value || 0),
      expenses: Number(document.getElementById('daily-expenses').value || 0),
      withdrawals: Number(document.getElementById('daily-withdrawals').value || 0),
      deposits: Number(document.getElementById('daily-deposits').value || 0),
      actualCash: Number(document.getElementById('daily-actual-cash').value || 0)
    };
    if (!payload.branchId) return showToast('الفرع مطلوب', true);
    const res = await apiClient.call('accounting.daily.save', payload);
    showToast(res.message, !res.ok);
    if (res.ok) loadDailyEntries();
  },

  async saveTransfer() {
    const payload = {
      fromBranchId: document.getElementById('tr-from').value.trim(),
      toBranchId: document.getElementById('tr-to').value.trim(),
      transferType: document.getElementById('tr-type').value,
      amount: Number(document.getElementById('tr-amount').value || 0)
    };
    const res = await apiClient.call('accounting.transfers.save', payload);
    showToast(res.message, !res.ok);
    if (res.ok) loadTransfers();
  },

  async saveOrder() {
    const payload = {
      branchId: document.getElementById('ord-branch').value.trim(),
      agentId: document.getElementById('ord-agent').value.trim(),
      customerName: document.getElementById('ord-customer').value.trim(),
      customerAddress: document.getElementById('ord-address').value.trim(),
      orderValue: Number(document.getElementById('ord-value').value || 0),
      deliveryFee: Number(document.getElementById('ord-fee').value || 0)
    };
    if (!payload.customerName) return showToast('اسم العميل مطلوب', true);
    const res = await apiClient.call('delivery.orders.save', payload);
    showToast(res.message, !res.ok);
    if (res.ok) loadOrders();
  },

  async loadReport() {
    const sheetName = document.getElementById('rep-sheet').value;
    const res = await apiClient.call('reports.list', { sheetName });
    const box = document.getElementById('report-table');
    if (!res.ok) {
      box.innerHTML = res.message;
      return;
    }
    if (!res.data.length) {
      box.innerHTML = 'لا توجد بيانات';
      return;
    }
    const keys = Object.keys(res.data[0]);
    const rows = res.data.map(row => `<tr>${keys.map(k => `<td>${row[k]}</td>`).join('')}</tr>`);
    box.innerHTML = ui.table(keys, rows);
  },

  async saveSetting() {
    const payload = {
      key: document.getElementById('st-key').value.trim(),
      value: document.getElementById('st-value').value.trim(),
      description: document.getElementById('st-desc').value.trim()
    };
    if (!payload.key) return showToast('Key مطلوب', true);
    const res = await apiClient.call('settings.save', payload);
    showToast(res.message, !res.ok);
    if (res.ok) loadSettings();
  }
};

window.renderApp = function () {
  ui.renderUserInfo();
  ui.renderSidebar();
  const content = document.getElementById('content');

  if (!window.appState.user && window.appState.currentRoute !== 'login') {
    window.appState.currentRoute = 'login';
  }

  const fn = router.routes[window.appState.currentRoute] || window.renderLogin;
  content.innerHTML = fn();

  switch (window.appState.currentRoute) {
    case 'dashboard': loadDashboard(); break;
    case 'branches': loadBranches(); break;
    case 'daily': loadDailyEntries(); break;
    case 'transfers': loadTransfers(); break;
    case 'delivery': loadOrders(); break;
    case 'settings': loadSettings(); break;
    default: break;
  }
};

(function boot() {
  if (window.appState.user) {
    window.appState.currentRoute = 'dashboard';
  }
  renderApp();
})();
