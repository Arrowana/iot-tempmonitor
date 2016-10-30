var config = {'spreadsheetId': ''}

function doGet(e) {
  var data = getFromSheet();
  Logger.log(JSON.stringify(data));
  var result = {'data': data};
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getFromSheet() {
  var sheet = SpreadsheetApp.openById(config.spreadsheetId)
    .getSheetByName('Device 1');
  var range = sheet.getDataRange();
  var m = range.getNumRows();
  var temp = range.getCell(m, 2).getValue();
  var hum = range.getCell(m, 3).getValue();
  
  return {'temperature': temp, 'humidity': hum};
}

function testGetFromSheet() {
  Logger.log(JSON.stringify(getFromSheet()));
}

function doPost(e) {
  Logger.log(JSON.stringify(e))
  var temperature = e.parameter.temperature;
  var humidity = e.parameter.humidity;
  
  writeTemperatureAndHumidity(temperature, humidity);
  Logger.log('== End of post ==');
}

function writeTemperatureAndHumidity(temperature, humidity) {
  var sheet = SpreadsheetApp.openById(config.spreasheetId)
    .getSheetByName('Device 1');
  
  sheet.appendRow([new Date(), temperature, humidity]);
}

function testWrite() {
  writeTemperatureAndHumidity(1, 2);
}

function testPOST() {
  var url = 'https://script.google.com/macros/s/...';
  
  var payload =
      {
        "name" : "labnol"
      };
  
  var options =
      {
        "method"  : "POST",
        "payload" : payload,   
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch(url, options);
  Logger.log(result.getContentText());
  Logger.log(result.getResponseCode());
}
