// ========== Konfigurasi ==========
const FOLDER_ID   = "1NigAVjAN-2nAzsu8KGL_WjUkkQ8LAfBu"; 
const SHEET_ID    = "1CvTPsBrUuCMDpO2ZQv_idowV0kS_F22cMX0wZO0HKeE"; 
const SHEET_NAME  = "Sheet1"; 
const TIME_ZONE   = "Asia/Makassar"; 
const TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

// ========== Handler ==========
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result = {};

    switch (data.action) {
      case "upload": result = uploadFile(data); break;
      case "list": result = listFiles(); break;
      case "update": result = updateFile(data); break;
      case "delete": result = deleteFile(data); break;
      case "addView": result = addView(data.id); break;
      default: result = { success: false, message: "Aksi tidak dikenal" };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========== Helper ==========
function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}
function now() {
  return Utilities.formatDate(new Date(), TIME_ZONE, TIME_FORMAT);
}

// ========== Fungsi Upload ==========
function uploadFile(data) {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), data.mimeType, data.fileName);
  const file = folder.createFile(blob);

  const parts = data.fileName.split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  const nameOnly = parts.join(".");

  const sheet = getSheet();
  sheet.appendRow([
    file.getId(),           // Kolom A: File ID
    nameOnly,               // Kolom B: Nama File
    ext,                    // Kolom C: Ekstensi
    data.keterangan || "",  // Kolom D: Keterangan
    now(),                  // Kolom E: Tanggal Upload
    "",                     // Kolom F: Tanggal Update
    0                       // Kolom G: Views
  ]);

  return {
    success: true,
    message: "Upload berhasil",
    file: {
      id: file.getId(),
      name: nameOnly,
      extension: ext,
      keterangan: data.keterangan || "",
      size: file.getSize(),
      url: file.getUrl(),
      uploaded: now(),
      updated: "",
      views: 0,
      thumbnailUrl: "https://drive.google.com/thumbnail?id=" + file.getId()
    }
  };
}

// ========== Fungsi List ==========
function listFiles() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();

  let files = [];
  for (let i = 1; i < rows.length; i++) {
    const [id, nameOnly, ext, ket, uploaded, updated, views] = rows[i];
    try {
      const file = DriveApp.getFileById(id);
      files.push({
        id,
        name: nameOnly,
        extension: ext,
        keterangan: ket || "",
        size: file.getSize(),
        uploaded,
        updated: updated || "",
        views: views || 0,
        url: file.getUrl(),
        thumbnailUrl: "https://drive.google.com/thumbnail?id=" + id
      });
    } catch (err) {
      // skip file yang sudah dihapus di Drive
    }
  }

  return { success: true, files };
}

// ========== Fungsi Update ==========
function updateFile(data) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      const file = DriveApp.getFileById(data.id);
      const ext = rows[i][2];

      if (data.newName) file.setName(data.newName + "." + ext);

      sheet.getRange(i + 1, 2).setValue(data.newName || rows[i][1]);   // Nama
      sheet.getRange(i + 1, 4).setValue(data.keterangan || rows[i][3]); // Keterangan
      sheet.getRange(i + 1, 6).setValue(now());                        // Tanggal Update

      return { success: true, message: "Update berhasil" };
    }
  }
  return { success: false, message: "File tidak ditemukan di log" };
}

// ========== Fungsi Delete ==========
function deleteFile(data) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      try {
        DriveApp.getFileById(data.id).setTrashed(true);
      } catch (err) {
        return { success: false, message: "Gagal hapus: " + err.message };
      }
      sheet.deleteRow(i + 1);
      return { success: true, message: "File dihapus" };
    }
  }
  return { success: false, message: "File tidak ditemukan di log" };
}

// ========== Fungsi Tambah View ==========
function addView(fileId) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === fileId) {
      const currentViews = rows[i][6] || 0;
      sheet.getRange(i + 1, 7).setValue(Number(currentViews) + 1);
      return { success: true, views: Number(currentViews) + 1 };
    }
  }
  return { success: false };
}
