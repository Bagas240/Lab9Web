import Link from "next/link";

export function LogoutView() {
  return (
    <section>
      <h2>Logout</h2>
      <p>Anda telah keluar dari sesi.</p>
      <Link href="/index.php?page=auth/login">Kembali ke halaman login</Link>
    </section>
  );
}
