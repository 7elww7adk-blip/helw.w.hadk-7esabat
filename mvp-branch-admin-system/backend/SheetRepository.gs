/**
 * Generic sheet access layer.
 */
var SheetRepo = (function () {
  function getSheet(name) {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    ensure(sh, 'Sheet not found: ' + name);
    return sh;
  }

  function getHeaders(sheet) {
    return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  }

  function all(name) {
    var sh = getSheet(name);
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return [];
    var headers = getHeaders(sh);
    var rows = sh.getRange(2, 1, lastRow - 1, headers.length).getValues();
    return rows.map(function (r) {
      var obj = {};
      headers.forEach(function (h, i) { obj[h] = r[i]; });
      return obj;
    });
  }

  function findById(name, id) {
    return all(name).find(function (r) { return String(r.id) === String(id); }) || null;
  }

  function insert(name, record) {
    var sh = getSheet(name);
    var headers = getHeaders(sh);
    var row = headers.map(function (h) { return record[h] !== undefined ? record[h] : ''; });
    sh.appendRow(row);
    return record;
  }

  function update(name, id, patch) {
    var sh = getSheet(name);
    var headers = getHeaders(sh);
    var lastRow = sh.getLastRow();
    if (lastRow < 2) return null;
    var idCol = headers.indexOf('id') + 1;
    ensure(idCol > 0, 'id column missing in ' + name);

    var ids = sh.getRange(2, idCol, lastRow - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(id)) {
        var rowIndex = i + 2;
        var current = sh.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
        headers.forEach(function (h, idx) {
          if (patch[h] !== undefined) current[idx] = patch[h];
        });
        sh.getRange(rowIndex, 1, 1, headers.length).setValues([current]);
        var out = {};
        headers.forEach(function (h, idx) { out[h] = current[idx]; });
        return out;
      }
    }
    return null;
  }

  function remove(name, id) {
    var sh = getSheet(name);
    var headers = getHeaders(sh);
    var idCol = headers.indexOf('id') + 1;
    ensure(idCol > 0, 'id column missing in ' + name);
    var lastRow = sh.getLastRow();
    var ids = sh.getRange(2, idCol, Math.max(lastRow - 1, 0), 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(id)) {
        sh.deleteRow(i + 2);
        return true;
      }
    }
    return false;
  }

  return {
    all: all,
    findById: findById,
    insert: insert,
    update: update,
    remove: remove
  };
})();
