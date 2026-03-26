window.renderTransfers = function () {
  return `
  <div class="card">
    <h3>التحويلات الداخلية بين الفروع</h3>
    <p class="muted">لا تسجل كمبيعات أو مصروفات.</p>
    <div class="grid">
      <div><label>من فرع</label><input id="tr-from" placeholder="br_main" /></div>
      <div><label>إلى فرع</label><input id="tr-to" placeholder="br_new" /></div>
      <div>
        <label>نوع التحويل</label>
        <select id="tr-type">
          <option value="GOODS">تحويل بضاعة</option>
          <option value="CASH">تحويل أموال</option>
          <option value="CAPITAL_SUPPORT">دعم رأس مال</option>
          <option value="ADJUSTMENT">تسوية داخلية</option>
        </select>
      </div>
      <div><label>المبلغ/القيمة</label><input id="tr-amount" type="number" value="0" /></div>
    </div>
    <button class="primary" onclick="actions.saveTransfer()">تسجيل التحويل</button>
  </div>
  <div class="card" id="transfers-table">جاري التحميل...</div>
  `;
};

window.loadTransfers = async function () {
  const res = await apiClient.call('accounting.transfers.list');
  const box = document.getElementById('transfers-table');
  if (!res.ok) { box.innerHTML = res.message; return; }
  box.innerHTML = ui.table(['التاريخ','من','إلى','النوع','القيمة'], res.data.map(x => `<tr><td>${x.date}</td><td>${x.fromBranchId}</td><td>${x.toBranchId}</td><td>${x.transferType}</td><td>${x.amount}</td></tr>`));
};
