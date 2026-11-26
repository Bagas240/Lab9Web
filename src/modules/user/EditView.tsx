"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Barang } from "@/lib/store";

export function EditView({ data }: { data: Barang }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch(`/api/barang/${data.id_barang}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (res.status === 401) {
        router.push("/index.php?page=auth/login&notice=auth_required");
        return;
      }
      if (res.ok) {
        router.push("/index.php?page=user/list");
        router.refresh();
      } else {
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h2>Ubah Barang</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Nama Barang</label>
          <br />
          <input type="text" name="nama" defaultValue={data.nama} required />
        </div>
        <div>
          <label>Kategori</label>
          <br />
          <select name="kategori" defaultValue={data.kategori}>
            <option value="Komputer">Komputer</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Hand Phone">Hand Phone</option>
          </select>
        </div>
        <div>
          <label>Harga Jual</label>
          <br />
          <input
            type="text"
            name="harga_jual"
            defaultValue={data.harga_jual}
            required
          />
        </div>
        <div>
          <label>Harga Beli</label>
          <br />
          <input
            type="text"
            name="harga_beli"
            defaultValue={data.harga_beli}
            required
          />
        </div>
        <div>
          <label>Stok</label>
          <br />
          <input type="text" name="stok" defaultValue={data.stok} required />
        </div>
        <div>
          <label>File Gambar</label>
          <br />
          <input type="file" name="file_gambar" />
        </div>
        <div>
          <input type="hidden" name="id" value={data.id_barang} />
          <button type="submit" disabled={submitting}>
            Simpan
          </button>
        </div>
      </form>
    </section>
  );
}
