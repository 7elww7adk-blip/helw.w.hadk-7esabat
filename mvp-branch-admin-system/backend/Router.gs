/**
 * Single POST endpoint for web app.
 */
function doPost(e) {
  try {
    var body = parseJsonSafely((e && e.postData && e.postData.contents) || '{}') || {};
    var action = body.action;
    var payload = body.payload || {};
    var token = body.token || '';
    var user = AuthService.validateToken(token);

    var publicActions = ['auth.login'];
    if (publicActions.indexOf(action) === -1 && !user) {
      return asJson(fail('جلسة غير صالحة، سجل الدخول مرة أخرى', 'UNAUTHORIZED'));
    }

    var res;
    switch (action) {
      case 'auth.login':
        res = AuthService.login(payload);
        break;
      case 'dashboard.summary':
        res = ReportService.dashboardSummary();
        break;
      case 'branches.list':
        res = BranchService.list();
        break;
      case 'branches.save':
        res = BranchService.save(payload, user);
        break;
      case 'accounting.daily.list':
        res = AccountingService.listDailyEntries();
        break;
      case 'accounting.daily.save':
        res = AccountingService.saveDailyEntry(payload, user);
        break;
      case 'accounting.transfers.list':
        res = AccountingService.listTransfers();
        break;
      case 'accounting.transfers.save':
        res = AccountingService.saveTransfer(payload, user);
        break;
      case 'delivery.agents.list':
        res = DeliveryService.listAgents();
        break;
      case 'delivery.orders.list':
        res = DeliveryService.listOrders();
        break;
      case 'delivery.orders.save':
        res = DeliveryService.saveOrder(payload, user);
        break;
      case 'delivery.settlements.save':
        res = DeliveryService.saveSettlement(payload, user);
        break;
      case 'reports.list':
        res = ReportService.simpleList(payload.sheetName);
        break;
      case 'settings.list':
        res = SettingsService.list();
        break;
      case 'settings.save':
        res = SettingsService.save(payload, user);
        break;
      default:
        res = fail('Action غير معروف: ' + action, 'UNKNOWN_ACTION');
    }

    return asJson(res);
  } catch (err) {
    return asJson(fail(err.message || 'Internal error', 'INTERNAL_ERROR'));
  }
}

function doGet() {
  return asJson(success({ status: 'running' }, 'MVP API running'));
}

function asJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
