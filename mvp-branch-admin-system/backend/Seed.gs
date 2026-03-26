/**
 * Helper seed function run manually from Apps Script editor.
 */
function seedMvpData() {
  var users = [
    {
      id: 'usr_owner',
      fullName: 'صاحب المحل',
      username: 'owner',
      passwordHash: hashPassword('123456'),
      role: 'OWNER',
      allowedBranchIds: 'br_main,br_new',
      isActive: true,
      createdAt: nowIso(),
      updatedAt: nowIso()
    },
    {
      id: 'usr_acc',
      fullName: 'المحاسب',
      username: 'accountant',
      passwordHash: hashPassword('123456'),
      role: 'ACCOUNTANT',
      allowedBranchIds: 'br_main,br_new',
      isActive: true,
      createdAt: nowIso(),
      updatedAt: nowIso()
    }
  ];

  users.forEach(function (u) { SheetRepo.insert(APP_CONFIG.SHEET_NAMES.USERS, u); });
}
