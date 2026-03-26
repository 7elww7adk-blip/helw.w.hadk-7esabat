var BranchService = (function () {
  function list() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.BRANCHES));
  }

  function save(payload, user) {
    ensure(checkPermission(user, 'MANAGE_BRANCHES'), 'غير مصرح');
    ensure(payload.name, 'اسم الفرع مطلوب');

    if (payload.id) {
      var updated = SheetRepo.update(APP_CONFIG.SHEET_NAMES.BRANCHES, payload.id, {
        name: payload.name,
        code: payload.code || '',
        address: payload.address || '',
        phone: payload.phone || '',
        isActive: payload.isActive !== false,
        openingCapital: payload.openingCapital || 0,
        updatedAt: nowIso()
      });
      return success(updated, 'تم تحديث الفرع');
    }

    var created = {
      id: uid('br'),
      name: payload.name,
      code: payload.code || '',
      address: payload.address || '',
      phone: payload.phone || '',
      isActive: payload.isActive !== false,
      openingCapital: payload.openingCapital || 0,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.BRANCHES, created);
    return success(created, 'تم إضافة الفرع');
  }

  return { list: list, save: save };
})();
