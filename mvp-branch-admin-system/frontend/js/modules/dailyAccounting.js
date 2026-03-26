window.renderDailyAccounting = function () {
  return `
  <div class="card">
    <h3>اليومية المحاسبية</h3>
    <div class="grid">
      <div><label>التاريخ</label><input id="daily-date" type="date" /></div>
      <div><label>الفرع</label><input id="daily-branch" placeholder="br_main" /></div>
      <div><label>المبيعات</label><input id="daily-sales" type="number" value="0" /></div>
      <div><label>المرتجعات</label><input id="daily-returns" type="number" value="0" /></div>
      <div><label>المشتريات</label><input id="daily-purchases" type="number" value="0" /></div>
      <div><label>المصروفات</label><input id="daily-expenses" type="number" value="0" /></div>
      <div><label>المسحوبات</label><input id="daily-withdrawals" type="number" value="0" /></div>
      <div><label>الإيداعات</label><input id="daily-deposits" type="number" value="0" /></div>
      <div><label>رصيد فعلي بالخزنة</label><input id="daily-actual-cash" type="number" value="0" /></div>
    </div>
    <button class="primary" onclick="actions.saveDailyEntry()">حفظ اليومية</button>
  </div>
  <div class="card" id="daily-table">جاري التحميل...</div>
  `;
};

window.loadDailyEntries = async function () {
  const res = await apiClient.call('accounting.daily.list');
  const box = document.getElementById('daily-table');
  if (!res.ok) { box.innerHTML = res.message; return; }
  box.innerHTML = ui.table(['التاريخ','الفرع','المبيعات','المصروفات','ربح/خسارة'], res.data.map(x => `<tr><td>${x.date}</td><td>${x.branchId}</td><td>${x.sales}</td><td>${x.expenses}</td><td>${x.profitLoss}</td></tr>`));
};
