var DeliveryService = (function () {
  function listAgents() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.DELIVERY_AGENTS));
  }

  function listOrders() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.ORDERS));
  }

  function saveOrder(payload, user) {
    ensure(checkPermission(user, 'MANAGE_DELIVERY'), 'غير مصرح');
    ensure(payload.branchId, 'الفرع مطلوب');
    ensure(payload.customerName, 'اسم العميل مطلوب');

    var orderValue = Number(payload.orderValue || 0);
    var deliveryFee = Number(payload.deliveryFee || 0);

    var rec = {
      id: uid('ord'),
      date: payload.date || Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd'),
      branchId: payload.branchId,
      agentId: payload.agentId || '',
      customerName: payload.customerName,
      customerAddress: payload.customerAddress || '',
      orderValue: orderValue,
      deliveryFee: deliveryFee,
      totalCollect: orderValue + deliveryFee,
      status: payload.status || 'جديد',
      notes: payload.notes || '',
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.ORDERS, rec);
    return success(rec, 'تم حفظ الأوردر');
  }

  function saveSettlement(payload, user) {
    ensure(checkPermission(user, 'MANAGE_DELIVERY'), 'غير مصرح');
    var expectedAmount = Number(payload.expectedAmount || 0);
    var returnedAmount = Number(payload.returnedAmount || 0);
    var shortageOverage = returnedAmount - expectedAmount;

    var rec = {
      id: uid('ds'),
      date: payload.date || Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd'),
      branchId: payload.branchId,
      agentId: payload.agentId,
      tripId: payload.tripId || '',
      expectedAmount: expectedAmount,
      returnedAmount: returnedAmount,
      shortageOverage: shortageOverage,
      agentDue: Number(payload.agentDue || 0),
      notes: payload.notes || '',
      createdBy: user.id,
      createdAt: nowIso()
    };

    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.DELIVERY_SETTLEMENTS, rec);
    return success(rec, 'تم حفظ تسوية المندوب');
  }

  return {
    listAgents: listAgents,
    listOrders: listOrders,
    saveOrder: saveOrder,
    saveSettlement: saveSettlement
  };
})();
