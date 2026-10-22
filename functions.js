import { items, setItems } from './data.js';

// CREATE
export const addItem = (nama, kategori, stok, harga) => {
  // Validasi input
  if (!nama || !kategori || stok === undefined || harga === undefined) {
    console.log(`[GAGAL] Semua field (nama, kategori, stok, harga) wajib diisi!`);
    return false;
  }

  const parsedStok = Number(stok);
  const parsedHarga = Number(harga);

  if (isNaN(parsedStok) || isNaN(parsedHarga) || parsedStok < 0 || parsedHarga < 0) {
    console.log(`[GAGAL] Stok dan harga harus berupa angka positif!`);
    return false;
  }

  // Cek duplikasi (.some)
  const isDuplicate = items.some((item) => item.nama.toLowerCase() === nama.trim().toLowerCase());
  if (isDuplicate) {
    console.log(`[GAGAL] Barang dengan nama "${nama}" sudah terdaftar dalam stok!`);
    return false;
  }

  const newItem = {
    nama: nama.trim(),
    kategori: kategori.trim(),
    stok: parsedStok,
    harga: parsedHarga
  };

  // Spread operator
  const updatedItems = [...items, newItem];
  setItems(updatedItems);

  const newIndex = updatedItems.length - 1;
  console.log(`[BERHASIL] Barang "${newItem.nama}" berhasil ditambahkan pada index ke-${newIndex}.`);
  return true;
};

// READ
export const getAllItems = () => {
  if (items.length === 0) {
    console.log(`[INFO] Stok toko kosong. Belum ada barang yang tersimpan.`);
    return;
  }

  console.log(`\nDaftar Stok Barang Toko Fotokopi (${items.length} item terdaftar):`);

  // Format string untuk tampilan tabel
  const displayItems = items.map((item) => ({
    nama: item.nama,
    kategori: item.kategori,
    stok: `${item.stok} pcs`,
    harga: `Rp ${item.harga.toLocaleString('id-ID')}`
  }));

  console.table(displayItems);
};

// UPDATE
export const updateItem = (index, newNama, newKategori, newStok, newHarga) => {
  const targetIndex = Number(index);

  // Validasi index
  if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= items.length) {
    console.log(`[GAGAL] Index ${index} tidak valid atau berada di luar jangkauan (0 - ${items.length - 1})!`);
    return false;
  }

  // Update dengan spread operator
  const updatedItems = items.map((item, idx) => {
    if (idx === targetIndex) {
      return {
        ...item,
        nama: newNama !== undefined && newNama.trim() !== '' ? newNama.trim() : item.nama,
        kategori: newKategori !== undefined && newKategori.trim() !== '' ? newKategori.trim() : item.kategori,
        stok: newStok !== undefined && newStok.trim() !== '' && !isNaN(Number(newStok)) ? Number(newStok) : item.stok,
        harga: newHarga !== undefined && newHarga.trim() !== '' && !isNaN(Number(newHarga)) ? Number(newHarga) : item.harga
      };
    }
    return item;
  });

  setItems(updatedItems);
  console.log(`[BERHASIL] Data barang pada index ke-${targetIndex} berhasil diperbarui.`);
  return true;
};

// DELETE
export const deleteItem = (index) => {
  const targetIndex = Number(index);

  // Validasi index
  if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= items.length) {
    console.log(`[GAGAL] Barang pada index ${index} tidak ditemukan, penghapusan dibatalkan.`);
    return false;
  }

  // Destructuring
  const { nama: namaBarangDihapus } = items[targetIndex];

  // Hapus data (.filter)
  const filteredItems = items.filter((_, idx) => idx !== targetIndex);
  setItems(filteredItems);

  console.log(`[BERHASIL] Barang "${namaBarangDihapus}" pada index ke-${targetIndex} berhasil dihapus dari stok.`);
  return true;
};

// Filter stok menipis (.filter)
export const filterLowStock = (threshold) => {
  const parsedThreshold = Number(threshold);

  if (threshold === undefined || threshold === '' || isNaN(parsedThreshold) || parsedThreshold < 0) {
    console.log(`[GAGAL] Batas ambang stok harus berupa angka valid (>= 0)!`);
    return;
  }

  const lowStockItems = items.filter((item) => item.stok <= parsedThreshold);

  console.log(`\n=================== DAFTAR BARANG STOK MENIPIS (<= ${parsedThreshold}) ===================`);
  if (lowStockItems.length === 0) {
    console.log(`[STATUS AMAN] Tidak ada barang yang berada di bawah ambang batas stok (${parsedThreshold}).`);
    return;
  }

  const displayLowStock = lowStockItems.map((item) => ({
    nama: item.nama,
    kategori: item.kategori,
    stok: `${item.stok} pcs`,
    harga: `Rp ${item.harga.toLocaleString('id-ID')}`
  }));

  console.table(displayLowStock);
};

// Total nilai aset (.reduce)
export const calculateTotalInventoryValue = () => {
  if (items.length === 0) {
    console.log(`[INFO] Stok toko kosong. Tidak ada data inventaris untuk dihitung.`);
    return;
  }

  const totalValue = items.reduce((accumulator, currentItem) => {
    return accumulator + (currentItem.stok * currentItem.harga);
  }, 0);

  const totalStockCount = items.reduce((total, item) => total + item.stok, 0);

  console.log(`\n==================== RINGKASAN VALUASI INVENTARIS TOKO ====================`);
  console.table([
    {
      'Metrik Inventaris': 'Jumlah Jenis Barang',
      'Nilai / Jumlah': `${items.length} item`
    },
    {
      'Metrik Inventaris': 'Total Kuantitas Fisik Barang',
      'Nilai / Jumlah': `${totalStockCount} pcs`
    },
    {
      'Metrik Inventaris': 'Total Estimasi Nilai Aset',
      'Nilai / Jumlah': `Rp ${totalValue.toLocaleString('id-ID')}`
    }
  ]);
};

// Cek ketersediaan stok (.every)
export const checkAllItemsAvailability = () => {
  if (items.length === 0) {
    console.log(`[INFO] Stok toko kosong. Belum ada barang untuk diperiksa.`);
    return;
  }

  const isAllAvailable = items.every((item) => item.stok > 0);

  const statusAudit = items.map((item) => {
    const { nama, stok } = item;
    return {
      'Nama Barang': nama,
      'Sisa Stok': `${stok} pcs`,
      'Status': stok > 0 ? 'Tersedia' : 'HABIS (Perlu Restock)'
    };
  });

  console.log(`\n=================== AUDIT KETERSEDIAAN STOK BARANG ===================`);
  console.table(statusAudit);

  if (isAllAvailable) {
    console.log(`[HASIL AUDIT: AMAN] Seluruh barang (${items.length} item) memiliki stok tersedia (> 0).`);
  } else {
    console.log(`[HASIL AUDIT: PERINGATAN] Terdapat barang yang stoknya habis! Segera lakukan pengadaan.`);
  }
  console.log(`======================================================================\n`);
};
