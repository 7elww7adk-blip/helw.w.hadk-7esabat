var AuthService = (function () {
  function login(payload) {
    ensure(payload.username, 'اسم المستخدم مطلوب');
    ensure(payload.password, 'كلمة المرور مطلوبة');

    var users = SheetRepo.all(APP_CONFIG.SHEET_NAMES.USERS);
    var user = users.find(function (u) {
      return String(u.username) === String(payload.username) && String(u.isActive) === 'TRUE';
    });

    if (!user) return fail('بيانات الدخول غير صحيحة', 'INVALID_LOGIN');

    var incomingHash = hashPassword(payload.password);
    if (String(user.passwordHash) !== String(incomingHash)) {
      return fail('بيانات الدخول غير صحيحة', 'INVALID_LOGIN');
    }

    var token = uid('tok');
    var expiresAt = new Date(Date.now() + APP_CONFIG.SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString();
    SheetRepo.insert(APP_CONFIG.SHEET_NAMES.SESSIONS, {
      id: uid('ses'),
      userId: user.id,
      token: token,
      expiresAt: expiresAt,
      isActive: true,
      createdAt: nowIso()
    });

    return success({
      token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
        allowedBranchIds: user.allowedBranchIds
      }
    }, 'تم تسجيل الدخول بنجاح');
  }

  function validateToken(token) {
    if (!token) return null;
    var sessions = SheetRepo.all(APP_CONFIG.SHEET_NAMES.SESSIONS);
    var session = sessions.find(function (s) {
      return String(s.token) === String(token) && String(s.isActive) === 'TRUE';
    });
    if (!session) return null;
    if (new Date(session.expiresAt).getTime() < Date.now()) return null;

    var user = SheetRepo.findById(APP_CONFIG.SHEET_NAMES.USERS, session.userId);
    if (!user || String(user.isActive) !== 'TRUE') return null;
    return user;
  }

  return { login: login, validateToken: validateToken };
})();
