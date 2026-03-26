window.ui = {
  renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!window.appState.user) {
      sidebar.innerHTML = '';
      return;
    }

    const menu = [
      ['dashboard', 'لوحة التحكم'],
      ['branches', 'الفروع'],
      ['daily', 'اليومية المحاسبية'],
      ['transfers', 'التحويلات'],
      ['delivery', 'الدليفري'],
      ['reports', 'التقارير'],
      ['settings', 'الإعدادات']
    ];

    sidebar.innerHTML = menu.map(([key, title]) =>
      `<button class="${window.appState.currentRoute === key ? 'active' : ''}" onclick="router.go('${key}')">${title}</button>`
    ).join('') + '<button onclick="auth.logout()">تسجيل الخروج</button>';
  },

  renderUserInfo() {
    const box = document.getElementById('user-info');
    if (!window.appState.user) {
      box.innerHTML = '<span class="muted">غير مسجل</span>';
      return;
    }
    box.innerHTML = `${window.appState.user.fullName} | ${window.appState.user.role}`;
  },

  table(headers, rows) {
    return `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
  }
};
