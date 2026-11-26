import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username === "admin" && password === "admin123") {
    const res = NextResponse.json({ ok: true, user: username });
    res.cookies.set("lab9_user", username, { path: "/" });
    res.cookies.set(
      "lab9_flash",
      JSON.stringify({
        type: "success",
        message: `Login berhasil. Selamat datang, ${username}!`,
      }),
      { path: "/" }
    );
    return res;
  }

  const res = NextResponse.json(
    { ok: false, error: "Username atau password salah." },
    { status: 401 }
  );
  res.cookies.set(
    "lab9_flash",
    JSON.stringify({
      type: "error",
      message: "Username atau password salah.",
    }),
    { path: "/" }
  );
  return res;
}
