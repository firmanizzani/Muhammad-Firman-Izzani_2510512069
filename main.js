import readline from 'readline';
import {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  filterLowStock,
  calculateTotalInventoryValue,
  checkAllItemsAvailability
} from './functions.js';

// Setup readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper input
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

// Menu utama
const showMenu = () => {
  console.log(`\n================================================`);
  console.log(`  SISTEM PENGELOLAAN STOK BARANG TOKO FOTOKOPI  `);
  console.log(`================================================`);
  console.log(`1. Lihat Semua Stok Barang`);
  console.log(`2. Tambah Barang Baru`);
  console.log(`3. Update Data Barang`);
  console.log(`4. Hapus Barang dari Stok`);
  console.log(`5. Cek Barang Stok Menipis`);
  console.log(`6. Hitung Total Nilai Aset Stok`);
  console.log(`7. Cek Ketersediaan Seluruh Stok`);
  console.log(`0. Keluar dari Program`);
  console.log(`================================================`);
};

// Program utama
const main = async () => {
  let isRunning = true;

  while (isRunning) {
    showMenu();
    const pilihan = await askQuestion('Pilih menu [0-7]: ');

    switch (pilihan.trim()) {
      case '1': {
        getAllItems();
        break;
      }
      case '2': {
        console.log(`\n--- TAMBAH BARANG BARU ---`);
        const nama = await askQuestion('Nama Barang     : ');
        const kategori = await askQuestion('Kategori Barang : ');
        const stok = await askQuestion('Jumlah Stok     : ');
        const harga = await askQuestion('Harga Satuan    : ');
        addItem(nama, kategori, stok, harga);
        break;
      }
      case '3': {
        console.log(`\n--- UPDATE DATA BARANG ---`);
        const index = await askQuestion('Masukkan (index) Barang yang ingin diupdate : ');
        const nama = await askQuestion('Nama Baru (kosongkan jika tidak diubah)         : ');
        const kategori = await askQuestion('Kategori Baru (kosongkan jika tidak diubah)     : ');
        const stok = await askQuestion('Stok Baru (kosongkan jika tidak diubah)         : ');
        const harga = await askQuestion('Harga Baru (kosongkan jika tidak diubah)        : ');
        updateItem(index, nama, kategori, stok, harga);
        break;
      }
      case '4': {
        console.log(`\n--- HAPUS BARANG DARI STOK ---`);
        const index = await askQuestion('Masukkan (index) Barang yang ingin dihapus : ');
        deleteItem(index);
        break;
      }
      case '5': {
        const thresholdInput = await askQuestion('Masukkan batas ambang stok : ');
        filterLowStock(thresholdInput);
        break;
      }
      case '6': {
        calculateTotalInventoryValue();
        break;
      }
      case '7': {
        checkAllItemsAvailability();
        break;
      }
      case '0': {
        console.log(`\nTerima kasih telah menggunakan Sistem Pengelolaan Stok Toko Fotokopi. Sampai jumpa!`);
        isRunning = false;
        rl.close();
        break;
      }
      default: {
        console.log(`[PERINGATAN] Menu "${pilihan}" tidak valid. Silakan pilih angka antara 0 sampai 7.`);
        break;
      }
    }
  }
};

main();
