export interface Barang {
  id_barang: number;
  kategori: string;
  nama: string;
  gambar: string | null;
  harga_beli: string;
  harga_jual: string;
  stok: string;
}

export interface UploadedImage {
  buffer: Buffer;
  contentType: string;
}

interface GlobalStore {
  items: Map<number, Barang>;
  nextId: number;
  images: Map<string, UploadedImage>;
}

const globalForStore = globalThis as unknown as {
  __lab8Store?: GlobalStore;
};

function createInitialStore(): GlobalStore {
  const items = new Map<number, Barang>();
  const seed: Barang[] = [
    {
      id_barang: 1,
      kategori: "Elektronik",
      nama: "HP Samsung Android",
      gambar: "hp_samsung.jpg",
      harga_beli: "2000000",
      harga_jual: "2400000",
      stok: "5",
    },
    {
      id_barang: 2,
      kategori: "Elektronik",
      nama: "HP Xiaomi Android",
      gambar: "hp_xiaomi.jpg",
      harga_beli: "1000000",
      harga_jual: "1400000",
      stok: "5",
    },
    {
      id_barang: 3,
      kategori: "Elektronik",
      nama: "HP OPPO Android",
      gambar: "hp_oppo.jpg",
      harga_beli: "1800000",
      harga_jual: "2300000",
      stok: "5",
    },
  ];
  for (const row of seed) {
    items.set(row.id_barang, row);
  }
  return {
    items,
    nextId: 4,
    images: new Map<string, UploadedImage>(),
  };
}

function getStore(): GlobalStore {
  if (!globalForStore.__lab8Store) {
    globalForStore.__lab8Store = createInitialStore();
  }
  return globalForStore.__lab8Store;
}

export function getAllBarang(): Barang[] {
  return Array.from(getStore().items.values());
}

export function getBarangById(id: number): Barang | null {
  return getStore().items.get(id) ?? null;
}

export function createBarang(input: Omit<Barang, "id_barang">): Barang {
  const store = getStore();
  const id_barang = store.nextId++;
  const created: Barang = { id_barang, ...input };
  store.items.set(id_barang, created);
  return created;
}

export function updateBarang(
  id: number,
  input: Partial<Omit<Barang, "id_barang">>
): Barang | null {
  const store = getStore();
  const existing = store.items.get(id);
  if (!existing) return null;
  const updated: Barang = {
    ...existing,
    ...input,
    id_barang: id,
  };
  store.items.set(id, updated);
  return updated;
}

export function deleteBarang(id: number): boolean {
  return getStore().items.delete(id);
}

export function saveUploadedImage(
  originalName: string,
  buffer: Buffer,
  contentType: string
): string {
  const safeName = originalName.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
  const filename = safeName || `upload_${Date.now()}`;
  getStore().images.set(filename, { buffer, contentType });
  return `gambar/${filename}`;
}

export function getUploadedImage(filename: string): UploadedImage | null {
  return getStore().images.get(filename) ?? null;
}
