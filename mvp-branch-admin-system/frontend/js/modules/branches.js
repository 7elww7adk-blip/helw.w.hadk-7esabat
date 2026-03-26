window.renderBranches = function () {
  return `
  <div class="card">
    <h3>إدارة الفروع</h3>
    <div class="grid">
      <div><label>اسم الفرع</label><input id="branch-name" /></div>
      <div><label>الكود</label><input id="branch-code" /></div>
      <div><label>العنوان</label><input id="branch-address" /></div>
      <div><label>الهاتف</label><input id="branch-phone" /></div>
    </div>
    <button class="primary" onclick="actions.saveBranch()">حفظ الفرع</button>
  </div>
  <div class="card" id="branches-table">جاري التحميل...</div>
  `;
};

window.loadBranches = async function () {
  const res = await apiClient.call('branches.list');
  const box = document.getElementById('branches-table');
  if (!res.ok) { box.innerHTML = res.message; return; }
  box.innerHTML = ui.table(['الاسم','الكود','نشط'], res.data.map(b => `<tr><td>${b.name}</td><td>${b.code}</td><td>${b.isActive}</td></tr>`));
};
