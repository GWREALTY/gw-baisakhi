// ════════════════════════════════════════════════════════
//  G&W Realty — Baisakhi Lead Capture — Google Apps Script
//  Paste this entire file into Google Apps Script editor
//  then deploy as a Web App (anyone can access)
// ════════════════════════════════════════════════════════

const SHEET_NAME = "Baisakhi Leads 2026";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Phone",
        "Email",
        "Looking For",
        "Free Home Evaluation",
        "Marketing Consent",
        "Source"
      ]);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#C8973A");
      headerRange.setFontColor("#000000");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);

      // Set column widths
      sheet.setColumnWidth(1, 160); // Timestamp
      sheet.setColumnWidth(2, 160); // Name
      sheet.setColumnWidth(3, 140); // Phone
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 180); // Looking For
      sheet.setColumnWidth(6, 180); // Free Home Evaluation
      sheet.setColumnWidth(7, 180); // Marketing Consent
      sheet.setColumnWidth(8, 180); // Source
    }

    // Parse incoming JSON from the form
    const data = JSON.parse(e.postData.contents);

    // Append the new lead row
    sheet.appendRow([
      new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" }),
      data.Name           || "",
      data.Phone          || "",
      data.Email          || "",
      data.Looking_For    || "",
      data.Free_Home_Evaluation || "No",
      data.Marketing_Consent    || "",
      data.Source         || "Baisakhi Event Form 2026"
    ]);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler — lets you test the script is live by visiting the URL
function doGet() {
  return ContentService
    .createTextOutput("G&W Realty Baisakhi Lead Sheet is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
