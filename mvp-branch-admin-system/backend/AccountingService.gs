var AccountingService = (function () {
  function saveDailyEntry(payload, user) {
    ensure(checkPermission(user, 'WRITE_ACCOUNTING'), 'غير مصرح');
    ensure(payload.branchId, 'الفرع مطلوب');
    ensure(userCanAccessBranch(user, payload.branchId), 'لا تملك صلاحية على هذا الفرع');

    var sales = Number(payload.sales || 0);
    var returnsValue = Number(payload.returns || 0);
    var purchases = Number(payload.purchases || 0);
    var expenses = Number(payload.expenses || 0);
    var withdrawals = Number(payload.withdrawals || 0);
    var deposits = Number(payload.deposits || 0);
    var openingCapital = Number(payload.openingCapital || 0);
    var openingInventory = Number(payload.openingInventory || 0);
    var actualCash = Number(payload.actualCash || 0);
    var inventoryCountValue = Number(payload.inventoryCountValue || 0);

    var expectedCash = openingCapital + sales - returnsValue - purchases - expenses - withdrawals + deposits;
    var profitLoss = sales - returnsValue - expenses;

    var rec = {
      id: uid('de'),
      date: payload.date || Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd'),
      branchId: payload.branchId,
      openingCapital: openingCapital,
      openingInventory: openingInventory,
      sales: sales,
      returns: returnsValue,
      purchases: purchases,
      expenses: expenses,
      withdrawals: withdrawals,
      deposits: deposits,
      expectedCash: expectedCash,
      actualCash: actualCash,
      inventoryCountValue: inventoryCountValue,
      profitLoss: profitLoss,
      notes: payload.notes || '',
      createdBy: user.id,
      createdAt: nowIso()
    };
    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.DAILY_ENTRIES, rec);
    return success(rec, 'تم حفظ اليومية بنجاح');
  }

  function saveTransfer(payload, user) {
    ensure(checkPermission(user, 'WRITE_TRANSFERS'), 'غير مصرح');
    ensure(payload.fromBranchId, 'من فرع مطلوب');
    ensure(payload.toBranchId, 'إلى فرع مطلوب');
    ensure(payload.transferType, 'نوع التحويل مطلوب');

    var rec = {
      id: uid('tr'),
      date: payload.date || Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd'),
      fromBranchId: payload.fromBranchId,
      toBranchId: payload.toBranchId,
      transferType: payload.transferType,
      amount: Number(payload.amount || 0),
      notes: payload.notes || '',
      createdBy: user.id,
      createdAt: nowIso()
    };

    // محاسبيًا: نسجل التحويلات داخليًا فقط ولا نضيفها لمبيعات/مصروفات.
    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.BRANCH_TRANSFERS, rec);
    return success(rec, 'تم تسجيل التحويل الداخلي');
  }

  function listDailyEntries() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.DAILY_ENTRIES));
  }

  function listTransfers() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.BRANCH_TRANSFERS));
  }

  return {
    saveDailyEntry: saveDailyEntry,
    saveTransfer: saveTransfer,
    listDailyEntries: listDailyEntries,
    listTransfers: listTransfers
  };
})();
