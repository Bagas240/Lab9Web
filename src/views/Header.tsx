import Link from "next/link";
import { isActiveMenu } from "@/helpers/functions";

export function Header({
  currentPage,
  currentUser,
}: {
  currentPage: string;
  currentUser: string | null;
}) {
  return (
    <>
      <header>
        <h1>Aplikasi PHP Modular</h1>
        <p>Contoh pemisahan template dan konten</p>
      </header>
      <nav>
        <Link
          href="/index.php?page=dashboard"
          className={isActiveMenu(currentPage, "dashboard")}
        >
          Dashboard
        </Link>
        <Link
          href="/index.php?page=user/list"
          className={isActiveMenu(currentPage, "user/list")}
        >
          Data Barang
        </Link>
        <Link
          href="/index.php?page=user/add"
          className={isActiveMenu(currentPage, "user/add")}
        >
          Tambah Barang
        </Link>
        {currentUser ? (
          <Link
            href="/index.php?page=auth/logout"
            prefetch={false}
            className={isActiveMenu(currentPage, "auth/logout")}
          >
            Logout ({currentUser})
          </Link>
        ) : (
          <Link
            href="/index.php?page=auth/login"
            className={isActiveMenu(currentPage, "auth/login")}
          >
            Login
          </Link>
        )}
      </nav>
    </>
  );
}
