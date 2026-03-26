window.renderDashboard = function () {
  return `<div class="card">جاري تحميل لوحة التحكم...</div>`;
};

window.loadDashboard = async function () {
  const content = document.getElementById('content');
  const res = await apiClient.call('dashboard.summary');
  if (!res.ok) {
    content.innerHTML = `<div class="card">${res.message}</div>`;
    return;
  }

  const k = res.data.kpi;
  content.innerHTML = `
    <div class="grid">
      <div class="card"><div class="muted">عدد الفروع</div><div class="kpi">${k.branches}</div></div>
      <div class="card"><div class="muted">إجمالي المبيعات</div><div class="kpi">${k.totalSales}</div></div>
      <div class="card"><div class="muted">إجمالي المصروفات</div><div class="kpi">${k.totalExpenses}</div></div>
      <div class="card"><div class="muted">رصيد الخزنة</div><div class="kpi">${k.cashBalance}</div></div>
      <div class="card"><div class="muted">أوردرات مفتوحة</div><div class="kpi">${k.openOrders}</div></div>
    </div>
    <div class="card">
      <h3>مقارنة الفروع</h3>
      ${ui.table(['الفرع','مبيعات','مصروفات','ربح/خسارة'], res.data.byBranch.map(x => `<tr><td>${x.branchName}</td><td>${x.sales}</td><td>${x.expenses}</td><td>${x.profitLoss}</td></tr>`))}
    </div>
  `;
};
