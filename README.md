# SECOND CHARGE — Product Catalog Template

Template website katalog produk berbasis **HTML, CSS, dan JavaScript murni (vanilla)** tanpa framework.

Dirancang sebagai **fondasi scalable** untuk katalog produk, marketplace kecil, atau toko online sederhana, dengan fokus pada:

* UI/UX modern dan rapi
* Arsitektur frontend yang bersih
* Data eksternal (spreadsheet / JSON)
* Tanpa backend dan tanpa Node.js

> Studi kasus: toko HP second bernama **SECOND CHARGE** (plesetan dari *second chance*).

---

## ✨ Fitur Utama

* ✅ Katalog produk (card-based, responsive)
* 🔍 Pencarian produk (client-side)
* 🎚️ Filter kondisi & sort harga
* 📄 Halaman detail produk
* 🔗 URL state (search, filter, sort, pagination)
* 📑 Pagination client-side
* ⏳ Loading state (async-ready)
* ♿ Accessibility & keyboard-friendly (WCAG basic)
* 📊 Data dari spreadsheet (via JSON)

---

## 🧱 Teknologi

* HTML5 (semantic)
* CSS3 (grayscale / netral)
* JavaScript ES Modules
* Live Server (VS Code)

❌ Tidak menggunakan:

* Framework (React, Vue, dll)
* Node.js
* Build tools
* Backend

---

## 📁 Struktur Folder

```
second-charge/
├── index.html
├── product.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── pages/
│   │   │   ├── catalog.js
│   │   │   └── detail.js
│   │   ├── services/
│   │   │   └── productService.js
│   │   └── utils/
│   │       └── formatter.js
│   ├── data/
│   │   └── products.json
│   └── images/
└── README.md
```

---

## 🚀 Cara Menjalankan

1. Buka folder project di **VS Code**
2. Install ekstensi **Live Server**
3. Klik kanan `index.html` → **Open with Live Server**

⚠️ Jangan buka file langsung via `file://` karena `fetch()` tidak akan berjalan.

---

## 📊 Sumber Data (Spreadsheet)

Data produk berasal dari spreadsheet yang diekspor ke JSON.

### Data Contract (Final)

| Field       | Tipe           | Wajib |
| ----------- | -------------- | ----- |
| id          | number         | ✅     |
| name        | string         | ✅     |
| brand       | string         | ✅     |
| price       | number         | ✅     |
| condition   | number (0–100) | ✅     |
| image       | string         | ✅     |
| whatsapp    | string         | ✅     |
| description | string         | ❌     |
| created_at  | string (ISO)   | ❌     |

Spreadsheet harus memiliki header **persis sama** dengan field di atas.

---

## 🔄 Alur Data

```
Spreadsheet
   ↓ export
products.json
   ↓ fetch()
productService.js
   ↓
UI (catalog & detail)
```

UI **tidak mengetahui** apakah data berasal dari JSON, API, atau backend.

---

## 🧠 Arsitektur Frontend

* **Single Source of Truth:** URL (query params)
* Tidak ada state ganda
* Semua filter/search/sort/pagination sinkron dengan URL
* Siap dipindahkan ke backend tanpa refactor besar

---

## ♿ Accessibility

Template ini mendukung:

* Navigasi keyboard penuh
* Focus state jelas
* Label & ARIA untuk screen reader
* Struktur semantic HTML

Standar: WCAG 2.1 (basic)

---

## 🧩 Pengembangan Selanjutnya (Opsional)

* Integrasi Google Sheets API (live)
* Backend API (Express, Laravel, dll)
* Admin panel sederhana
* Wishlist / favorite
* SSR atau static generation

---

## 📌 Catatan

Template ini dibuat untuk:

* Template pribadi
* Portfolio frontend
* Project klien skala kecil

Tanpa framework bukan berarti tanpa struktur.

---

## © Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.

— SECOND CHARGE
