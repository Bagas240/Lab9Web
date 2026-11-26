import { NextRequest, NextResponse } from "next/server";
import {
  deleteBarang,
  getBarangById,
  saveUploadedImage,
  updateBarang,
} from "@/lib/store";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!req.cookies.get("lab9_user")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id: rawId } = await context.params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const item = getBarangById(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

async function handleUpdate(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!req.cookies.get("lab9_user")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await context.params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const formData = await req.formData();
  const nama = String(formData.get("nama") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "");
  const harga_jual = String(formData.get("harga_jual") ?? "");
  const harga_beli = String(formData.get("harga_beli") ?? "");
  const stok = String(formData.get("stok") ?? "");
  const file = formData.get("file_gambar");

  if (
    nama.trim() === "" ||
    !Number.isFinite(Number(harga_beli)) ||
    !Number.isFinite(Number(harga_jual)) ||
    !Number.isFinite(Number(stok))
  ) {
    const res = NextResponse.json(
      { error: "Data barang tidak valid." },
      { status: 400 }
    );
    res.cookies.set(
      "lab9_flash",
      JSON.stringify({
        type: "error",
        message: "Nama, harga, dan stok barang harus diisi dengan benar.",
      }),
      { path: "/" }
    );
    return res;
  }

  let gambar: string | undefined;
  if (file instanceof File && file.size > 0 && file.name) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    gambar = saveUploadedImage(
      file.name,
      buffer,
      file.type || "application/octet-stream"
    );
  }

  const updated = updateBarang(id, {
    nama,
    kategori,
    harga_jual,
    harga_beli,
    stok,
    ...(gambar !== undefined ? { gambar } : {}),
  });

  if (!updated) {
    const res = NextResponse.json({ error: "Not found" }, { status: 404 });
    res.cookies.set(
      "lab9_flash",
      JSON.stringify({
        type: "error",
        message: "Gagal memperbarui data barang.",
      }),
      { path: "/" }
    );
    return res;
  }

  const accept = req.headers.get("accept") ?? "";
  const res = accept.includes("application/json")
    ? NextResponse.json(updated)
    : NextResponse.redirect(new URL("/index.php?page=user/list", req.url), 303);

  res.cookies.set(
    "lab9_flash",
    JSON.stringify({
      type: "success",
      message: "Data barang berhasil diperbarui.",
    }),
    { path: "/" }
  );
  return res;
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, context);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!req.cookies.get("lab9_user")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id: rawId } = await context.params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const deleted = deleteBarang(id);
  const res = NextResponse.json({ deleted });
  res.cookies.set(
    "lab9_flash",
    JSON.stringify({
      type: deleted ? "success" : "error",
      message: deleted
        ? "Data barang berhasil dihapus."
        : "Gagal menghapus data barang.",
    }),
    { path: "/" }
  );
  return res;
}
