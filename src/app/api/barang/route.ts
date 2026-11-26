import { NextRequest, NextResponse } from "next/server";
import { createBarang, getAllBarang, saveUploadedImage } from "@/lib/store";

export async function GET(req: NextRequest) {
  if (!req.cookies.get("lab9_user")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllBarang());
}

export async function POST(req: NextRequest) {
  if (!req.cookies.get("lab9_user")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const nama = String(formData.get("nama") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "");
  const harga_jual = String(formData.get("harga_jual") ?? "");
  const harga_beli = String(formData.get("harga_beli") ?? "");
  const stok = String(formData.get("stok") ?? "");
  const file = formData.get("file_gambar");

  if (!nama) {
    const res = NextResponse.json(
      { error: "Nama barang wajib diisi." },
      { status: 400 }
    );
    res.cookies.set(
      "lab9_flash",
      JSON.stringify({
        type: "error",
        message: "Nama barang wajib diisi.",
      }),
      { path: "/" }
    );
    return res;
  }
  if (
    !Number.isFinite(Number(harga_beli)) ||
    !Number.isFinite(Number(harga_jual)) ||
    !Number.isFinite(Number(stok))
  ) {
    const res = NextResponse.json(
      { error: "Harga dan stok harus berupa angka." },
      { status: 400 }
    );
    res.cookies.set(
      "lab9_flash",
      JSON.stringify({
        type: "error",
        message: "Harga dan stok harus berupa angka.",
      }),
      { path: "/" }
    );
    return res;
  }

  let gambar: string | null = null;
  if (file instanceof File && file.size > 0 && file.name) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    gambar = saveUploadedImage(
      file.name,
      buffer,
      file.type || "application/octet-stream"
    );
  }

  const created = createBarang({
    nama,
    kategori,
    harga_jual,
    harga_beli,
    stok,
    gambar,
  });

  const accept = req.headers.get("accept") ?? "";
  const res = accept.includes("application/json")
    ? NextResponse.json(created, { status: 201 })
    : NextResponse.redirect(new URL("/index.php?page=user/list", req.url), 303);

  res.cookies.set(
    "lab9_flash",
    JSON.stringify({
      type: "success",
      message: "Data barang berhasil ditambahkan.",
    }),
    { path: "/" }
  );
  return res;
}
