window.renderSettings = function () {
  return `
  <div class="card">
    <h3>الإعدادات</h3>
    <div class="grid">
      <div><label>Key</label><input id="st-key" placeholder="defaultDeliveryFee" /></div>
      <div><label>Value</label><input id="st-value" placeholder="20" /></div>
      <div><label>الوصف</label><input id="st-desc" placeholder="رسوم توصيل افتراضية" /></div>
    </div>
    <button class="primary" onclick="actions.saveSetting()">حفظ الإعداد</button>
  </div>
  <div class="card" id="settings-table">جاري التحميل...</div>
  `;
};

window.loadSettings = async function () {
  const res = await apiClient.call('settings.list');
  const box = document.getElementById('settings-table');
  if (!res.ok) { box.innerHTML = res.message; return; }
  box.innerHTML = ui.table(['Key','Value','Description'], res.data.map(x => `<tr><td>${x.key}</td><td>${x.value}</td><td>${x.description}</td></tr>`));
};
