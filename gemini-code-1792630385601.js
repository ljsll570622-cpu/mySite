/**
 * @OnlyCurrentDoc
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析前端送來的資料
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var reporterType = data.reporterType || '匿名';
    var bullyType = data.bullyType || '一般';
    var content = data.content || '';
    var contact = data.contact || '未提供';
    
    // 寫入試算表
    sheet.appendRow([timestamp, reporterType, bullyType, content, contact]);
    
    // 回傳成功結果 (設定 CORS 標頭)
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "已成功送出" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 支援跨域預檢或 GET 測試
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "message": "校園霸凌防治通報後端運行中" }))
    .setMimeType(ContentService.MimeType.JSON);
}