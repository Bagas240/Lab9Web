import Link from "next/link";
import { getAllBarang } from "@/lib/store";
import { formatRupiah, hitungDiskon, ringkasTeks } from "@/helpers/functions";
import { DeleteButton } from "@/modules/user/DeleteButton";

export function ListView() {
  const rows = getAllBarang();

  return (
    <section>
      <h2>Data Barang</h2>
      <p>
        <Link href="/index.php?page=user/add">Tambah Barang</Link>
      </p>
      <table border={1} cellPadding={6} cellSpacing={0}>
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama Barang</th>
            <th>Kategori</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
            <th>Diskon (10%)</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row) => {
              const gambar = (row.gambar ?? "").trim();
              let src = gambar;
              if (
                src !== "" &&
                !src.startsWith("gambar/") &&
                !src.startsWith("/gambar/")
              ) {
                src = `/gambar/${src}`;
              } else if (src.startsWith("gambar/")) {
                src = `/${src}`;
              }
              const hargaJual = Number(row.harga_jual) || 0;

              return (
                <tr key={row.id_barang}>
                  <td>
                    {src !== "" ? (
                      <img src={src} alt={row.nama} width={60} />
                    ) : null}
                  </td>
                  <td>{ringkasTeks(row.nama, 30)}</td>
                  <td>{row.kategori}</td>
                  <td>{formatRupiah(Number(row.harga_beli) || 0)}</td>
                  <td>{formatRupiah(hargaJual)}</td>
                  <td>{formatRupiah(hitungDiskon(hargaJual))}</td>
                  <td>{row.stok}</td>
                  <td>
                    <Link href={`/index.php?page=user/edit&id=${row.id_barang}`}>
                      Ubah
                    </Link>
                    {" | "}
                    <DeleteButton id={row.id_barang} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>Belum ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
