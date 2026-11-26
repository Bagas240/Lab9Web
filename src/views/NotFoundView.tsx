import Link from "next/link";

export function NotFoundView() {
  return (
    <section>
      <h2>404 - Halaman tidak ditemukan</h2>
      <p>Halaman yang diminta tidak tersedia.</p>
      <Link href="/index.php">Kembali ke dashboard</Link>
    </section>
  );
}
