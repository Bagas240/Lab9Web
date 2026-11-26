"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm("Yakin ingin menghapus data ini?")) {
      return;
    }
    const res = await fetch(`/api/barang/${id}`, {
      method: "DELETE",
    });
    if (res.status === 401) {
      router.push("/index.php?page=auth/login&notice=auth_required");
      return;
    }
    router.refresh();
  }

  return (
    <button type="button" onClick={handleDelete}>
      Hapus
    </button>
  );
}
