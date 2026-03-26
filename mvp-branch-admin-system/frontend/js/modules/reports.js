window.renderReports = function () {
  return `
  <div class="card">
    <h3>التقارير</h3>
    <div class="grid">
      <div>
        <label>نوع التقرير (اسم الشيت)</label>
        <select id="rep-sheet">
          <option>DailyEntries</option>
          <option>Expenses</option>
          <option>Purchases</option>
          <option>BranchTransfers</option>
          <option>Orders</option>
          <option>DeliverySettlements</option>
          <option>CashboxTransactions</option>
        </select>
      </div>
    </div>
    <button class="primary" onclick="actions.loadReport()">عرض التقرير</button>
  </div>
  <div class="card" id="report-table">اختر التقرير ثم اضغط عرض</div>
  `;
};
