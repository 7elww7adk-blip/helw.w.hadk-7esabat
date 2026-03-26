var SettingsService = (function () {
  function list() {
    return success(SheetRepo.all(APP_CONFIG.SHEET_NAMES.SETTINGS));
  }

  function save(payload, user) {
    ensure(checkPermission(user, 'MANAGE_SETTINGS'), 'غير مصرح');
    ensure(payload.key, 'key مطلوب');

    var existing = SheetRepo.all(APP_CONFIG.SHEET_NAMES.SETTINGS).find(function (s) {
      return String(s.key) === String(payload.key);
    });

    if (existing) {
      var updated = SheetRepo.update(APP_CONFIG.SHEET_NAMES.SETTINGS, existing.id, {
        value: payload.value,
        description: payload.description || existing.description,
        updatedAt: nowIso()
      });
      return success(updated, 'تم تحديث الإعداد');
    }

    var rec = {
      id: uid('st'),
      key: payload.key,
      value: payload.value || '',
      description: payload.description || '',
      updatedAt: nowIso()
    };
    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.SETTINGS, rec);
    return success(rec, 'تم إنشاء الإعداد');
  }

  return { list: list, save: save };
})();
