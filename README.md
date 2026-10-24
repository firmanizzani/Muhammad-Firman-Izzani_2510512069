# SISTEM PENGELOLAAN STOK BARANG TOKO FOTOKOPI

Program ini memungkinkan pengguna untuk mengelola stok barang toko fotokopi secara interaktif melalui terminal (CLI) dengan fitur CRUD (Create, Read, Update, Delete) serta beberapa fitur tambahan seperti validasi input, pencegahan data duplikat, filter stok menipis, perhitungan total nilai aset inventaris, dan pemeriksaan ketersediaan stok barang.`

## Fitur

- Menampilkan semua data stok barang dalam bentuk tabel.
- Menambahkan barang baru dengan validasi otomatis dan pengecekan nama duplikat.
- Memperbarui data barang tertentu berdasarkan nomor index.
- Menghapus barang dari stok berdasarkan nomor index.
- Menampilkan daftar barang dengan stok menipis berdasarkan batas ambang tertentu.
- Menghitung total kuantitas unit barang dan total estimasi nilai aset toko.
- Memvalidasi ketersediaan stok seluruh barang untuk memastikan tidak ada stok yang habis.
- Memuat data stok awal dari file items.json saat program dijalankan.

## Cara Menjalankan

- Pastikan Node.js sudah terinstal.
- Buka terminal dan arahkan ke folder proyek.
- Pastikan package.json menggunakan `"type": "module"`.
- Jalankan program dengan: `node main.js` (atau `npm start`).

## Format Data Barang

Setiap data barang disimpan dalam bentuk object di dalam array.

```json
{
  "nama": "Pulpen Pilot Hitam",
  "kategori": "Alat Tulis",
  "stok": 50,
  "harga": 3500
}
```

## Struktur Project

- `data.js`         -> Berisi array data barang awal dan pembaruan data
- `functions.js`    -> Berisi function-function CRUD dan fitur tambahan
- `main.js`         -> Program utama interaktif (CLI)
- `package.json`    -> Konfigurasi Node.js project
- `items.json`      -> File penyimpanan data barang
- `README.md`       -> Penjelasan proyek

## Penggunaan

1. Pilih menu 0-7 sesuai operasi yang diinginkan
2. Ikuti instruksi yang muncul di layar
3. Pilih 0 untuk keluar dari program

## Requirements

- Node.js v24.16.0
- Terminal/Command Prompt

## Author

- Nama: Muhammad Firman Izzani (2510512069)
- Tema Proyek: Sistem Pengelolaan Stok Barang Toko Fotokopi
- Kelas: Trial Study Club Backend Basic KSM Veterantech UPNVJ 2026
- Mentor: Nadia Jasmine
