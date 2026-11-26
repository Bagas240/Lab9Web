export interface FlashData {
  type: "success" | "error";
  message: string;
}

export function formatRupiah(angka: number): string {
  const rounded = Math.round(angka);
  const formatted = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${formatted}`;
}

export function e(nilai: string): string {
  return nilai;
}

export function hitungDiskon(harga: number, persen = 10): number {
  return harga * (persen / 100);
}

export function validasiEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ringkasTeks(teks: string, batas = 100): string {
  if (teks.length <= batas) {
    return teks;
  }
  return `${teks.slice(0, batas)}...`;
}

export function konversiCelciusKeFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function tentukanStatusNilai(nilai: number): string {
  if (nilai >= 85) return "Sangat Baik";
  if (nilai >= 70) return "Baik";
  if (nilai >= 55) return "Cukup";
  return "Kurang";
}

export function hitungTotal(harga: number, jumlah: number): number {
  return harga * jumlah;
}

export function isActiveMenu(currentPage: string, targetPage: string): string {
  return currentPage === targetPage ? "active" : "";
}
