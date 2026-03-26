/** Utility helpers used by all services. */
function nowIso() {
  return new Date().toISOString();
}

function uid(prefix) {
  prefix = prefix || 'id';
  return prefix + '_' + Utilities.getUuid();
}

function hashPassword(password) {
  return Utilities.base64Encode(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password)
  );
}

function success(data, message) {
  return { ok: true, message: message || 'OK', data: data || null };
}

function fail(message, code) {
  return { ok: false, message: message || 'Error', code: code || 'ERROR' };
}

function ensure(value, message) {
  if (!value) {
    throw new Error(message || 'Validation error');
  }
}

function parseJsonSafely(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

function userCanAccessBranch(user, branchId) {
  if (!user || !branchId) return false;
  if (user.role === APP_CONFIG.ROLES.OWNER) return true;
  var branches = (user.allowedBranchIds || '').split(',').map(function (x) { return x.trim(); });
  return branches.indexOf(branchId) > -1;
}

function checkPermission(user, action) {
  var role = user && user.role;
  var map = {
    VIEW_DASHBOARD: ['OWNER', 'BRANCH_MANAGER', 'ACCOUNTANT', 'VIEWER'],
    MANAGE_BRANCHES: ['OWNER'],
    WRITE_ACCOUNTING: ['OWNER', 'BRANCH_MANAGER', 'ACCOUNTANT'],
    WRITE_TRANSFERS: ['OWNER', 'ACCOUNTANT'],
    MANAGE_DELIVERY: ['OWNER', 'BRANCH_MANAGER', 'ACCOUNTANT'],
    VIEW_REPORTS: ['OWNER', 'BRANCH_MANAGER', 'ACCOUNTANT', 'VIEWER'],
    MANAGE_SETTINGS: ['OWNER']
  };
  return !!map[action] && map[action].indexOf(role) > -1;
}
