var ReportService = (function () {
  function dashboardSummary() {
    var branches = SheetRepo.all(APP_CONFIG.SHEET_NAMES.BRANCHES).filter(function (b) { return String(b.isActive) === 'TRUE'; });
    var daily = SheetRepo.all(APP_CONFIG.SHEET_NAMES.DAILY_ENTRIES);
    var orders = SheetRepo.all(APP_CONFIG.SHEET_NAMES.ORDERS);

    var totalSales = daily.reduce(function (a, x) { return a + Number(x.sales || 0); }, 0);
    var totalExpenses = daily.reduce(function (a, x) { return a + Number(x.expenses || 0); }, 0);
    var cashBalance = daily.reduce(function (a, x) { return a + Number(x.actualCash || 0); }, 0);

    var byBranch = branches.map(function (b) {
      var rows = daily.filter(function (d) { return String(d.branchId) === String(b.id); });
      return {
        branchId: b.id,
        branchName: b.name,
        sales: rows.reduce(function (a, x) { return a + Number(x.sales || 0); }, 0),
        expenses: rows.reduce(function (a, x) { return a + Number(x.expenses || 0); }, 0),
        profitLoss: rows.reduce(function (a, x) { return a + Number(x.profitLoss || 0); }, 0)
      };
    });

    return success({
      kpi: {
        branches: branches.length,
        totalSales: totalSales,
        totalExpenses: totalExpenses,
        cashBalance: cashBalance,
        openOrders: orders.filter(function (o) { return String(o.status) !== 'تم التسليم'; }).length
      },
      byBranch: byBranch
    });
  }

  function simpleList(sheetName) {
    return success(SheetRepo.all(sheetName));
  }

  return { dashboardSummary: dashboardSummary, simpleList: simpleList };
})();
