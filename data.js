import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Path file JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const itemsFilePath = path.join(__dirname, 'items.json');

// Baca data awal
const rawData = fs.readFileSync(itemsFilePath, 'utf-8');
const initialItems = JSON.parse(rawData);

// Data array utama
export let items = [...initialItems];

// Update data array dan simpan ke file JSON
export const setItems = (newItems) => {
  items = newItems;
  fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2), 'utf-8');
};
