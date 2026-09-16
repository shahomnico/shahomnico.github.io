// SHAH OMNI CO. — OPTIONAL FREE BACKEND STARTER
// Deploy this as a Google Apps Script Web App and connect the URL in your front-end.
// This starter stores basic request metadata in a Google Sheet.
// DO NOT store Aadhaar/PAN scans or other sensitive documents in this basic sheet.

const SHEET_NAME = 'Requests';

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(['Timestamp','Reference','Service','Name','Mobile','Details','Status']);
}

function doPost(e) {
  setup();
  const data = JSON.parse(e.postData.contents || '{}');
  const ref = 'SOC-' + Math.floor(100000 + Math.random()*900000);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    .appendRow([new Date(),ref,data.service||'',data.name||'',data.mobile||'',data.details||'','New']);
  return ContentService.createTextOutput(JSON.stringify({ok:true,ref:ref}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  setup();
  const ref = (e.parameter.ref || '').trim().toUpperCase();
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const values = sh.getDataRange().getValues();
  for (let i=1;i<values.length;i++) {
    if (String(values[i][1]).toUpperCase() === ref) {
      return ContentService.createTextOutput(JSON.stringify({ok:true,ref:values[i][1],service:values[i][2],status:values[i][6]})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ok:false})).setMimeType(ContentService.MimeType.JSON);
}
