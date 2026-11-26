import Link from "next/link";
import {
  formatRupiah,
  hitungDiskon,
  validasiEmail,
  ringkasTeks,
} from "@/helpers/functions";

export function DashboardView() {
  return (
    <section className="content">
      <h2>Halaman Dashboard</h2>
      <p>Ini adalah konten khusus halaman beranda.</p>
      <p>Contoh formatRupiah: {formatRupiah(150000)}</p>
      <p>Contoh hitungDiskon (10%): {formatRupiah(hitungDiskon(200000))}</p>
      <p>
        Contoh validasiEmail:{" "}
        {validasiEmail("admin@contoh.com") ? "Valid" : "Tidak valid"}
      </p>
      <p>
        Contoh ringkasTeks:{" "}
        {ringkasTeks(
          "Aplikasi PHP modular memisahkan template, helper, konfigurasi, dan modul fitur.",
          45
        )}
      </p>
      <p>
        <Link href="/index.php?page=user/list">Lihat Data Barang</Link>
      </p>
    </section>
  );
}
