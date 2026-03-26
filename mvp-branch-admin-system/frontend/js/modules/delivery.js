window.renderDelivery = function () {
  return `
  <div class="card">
    <h3>إدارة الدليفري</h3>
    <div class="grid">
      <div><label>الفرع</label><input id="ord-branch" placeholder="br_main" /></div>
      <div><label>المندوب</label><input id="ord-agent" placeholder="ag_1" /></div>
      <div><label>اسم العميل</label><input id="ord-customer" /></div>
      <div><label>العنوان</label><input id="ord-address" /></div>
      <div><label>قيمة الأوردر</label><input id="ord-value" type="number" value="0" /></div>
      <div><label>رسوم التوصيل</label><input id="ord-fee" type="number" value="0" /></div>
    </div>
    <button class="primary" onclick="actions.saveOrder()">حفظ أوردر</button>
  </div>
  <div class="card" id="orders-table">جاري التحميل...</div>
  `;
};

window.loadOrders = async function () {
  const res = await apiClient.call('delivery.orders.list');
  const box = document.getElementById('orders-table');
  if (!res.ok) { box.innerHTML = res.message; return; }
  box.innerHTML = ui.table(['العميل','الفرع','المندوب','إجمالي التحصيل','الحالة'], res.data.map(x => `<tr><td>${x.customerName}</td><td>${x.branchId}</td><td>${x.agentId}</td><td>${x.totalCollect}</td><td>${x.status}</td></tr>`));
};
