# DRP Ainul Arif - Daily Report Pendamping

Website **DRP Ainul Arif** adalah platform berita dan laporan harian pendamping berbasis CRUD API web. Proyek ini dibuat menggunakan **Alpine.js**, **HTML/CSS** modern, dan **Google Apps Script API** sebagai backend untuk menyimpan dan menampilkan data laporan.

## 📰 Fitur Utama

1. **Grid Card Responsif**  
   Menampilkan laporan harian dalam bentuk kartu dengan thumbnail, judul, deskripsi singkat, dan informasi views serta tanggal upload/update.

2. **Filter & Pencarian**  
   - Filter berdasarkan **Tahun** dan **Bulan**.
   - Pencarian deskripsi laporan dengan kata kunci.

3. **Modal Detail**  
   - Klik kartu untuk menampilkan detail laporan dalam modal.
   - Menampilkan thumbnail, deskripsi lengkap, dan tombol tutup.

4. **Lazy Loading Gambar**  
   Gambar dimuat hanya ketika terlihat di viewport untuk meningkatkan performa.

5. **Increment Views Otomatis**  
   Views pada setiap laporan akan bertambah saat membuka modal detail, dan diperbarui ke Google Sheet backend.

6. **Mobile Responsive**  
   - Hamburger menu untuk filter pada layar kecil.
   - Grid kartu responsif sesuai ukuran layar.

7. **Back to Top Button**  
   Tombol untuk kembali ke atas halaman saat scrolling.

8. **Footer Informasi**  
   Menampilkan informasi author, email, sosial media, dan copyright.


## 📸 Tampilan

### Grid Card
![Grid Card](https://via.placeholder.com/800x400?text=Grid+Card+Example)

### Modal Detail
![Modal Detail](https://via.placeholder.com/600x400?text=Modal+Detail+Example)

### Interaksi Filter & Pencarian (GIF)
![Filter & Search](https://via.placeholder.com/600x400?text=GIF+Filter+Search+Example)

---

> Ganti URL placeholder dengan screenshot asli dari proyek Anda sebelum upload ke GitHub.

---

> Catatan: Dalam versi awal, HTML, CSS, dan script digabung dalam `index.html`. Bisa dipisah untuk struktur lebih rapi.

---

## ⚙️ Teknologi Digunakan

- **Frontend**
  - HTML5 & CSS3
  - [Alpine.js](https://alpinejs.dev) (v3) untuk reactive UI
  - [Font Awesome](https://fontawesome.com) untuk ikon
- **Backend**
  - Google Apps Script sebagai API endpoint (`POST` request)
- **Fitur Tambahan**
  - Lazy Loading gambar
  - Responsif & mobile-friendly
  - Animasi modal & tombol

---

## 🚀 Cara Penggunaan

1. **Clone repository ini:**
```bash
git clone https://github.com/aincodelab/drptpp.git
````

2. **Buka `index.html` di browser:**

```bash
open index.html
```

3. **Pastikan URL API Google Apps Script sudah benar di script:**

```javascript
const API_URL = "https://script.google.com/macros/s/.../exec";
```

4. **Klik kartu untuk melihat detail laporan. Gunakan filter dan pencarian untuk menampilkan data spesifik.**

---

## 📌 Konfigurasi Google Apps Script

1. Endpoint menerima `POST` request dengan `action`:

   * `list` → Mengambil semua laporan.
   * `addView` → Menambah jumlah views pada laporan tertentu (dengan parameter `id`).

2. Pastikan Google Sheet sudah memiliki kolom:

```
id | name | keterangan | uploaded | updated | thumbnailUrl | views
```

3. Pastikan **CORS** diaktifkan di Apps Script:

```javascript
return ContentService.createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader("Access-Control-Allow-Origin", "*");
```

---

## 🌐 Deployment

1. Bisa dijalankan langsung di browser lokal.
2. Bisa di-deploy ke GitHub Pages:

   * Masuk ke `Settings → Pages → Branch: main / root` → Save
   * Akses via `https://username.github.io/DRP-AinulArif/`

---

## 👤 Author

* **Nama:** Ainul Arif
* **Email:** [ainoelarief@gmail.com](mailto:ainoelarief@gmail.com)
* **Website:** [DRP TPP](crud.html) (opsional link internal)

---

## 📜 Lisensi

MIT License © 2025 Ainul Arif

---

## 💡 Catatan

* Semua data laporan berasal dari **Google Apps Script API**.
* Pastikan URL API benar agar filter, search, dan modal views berjalan.
* Desain sudah mobile-friendly dan mendukung browser modern.

```
