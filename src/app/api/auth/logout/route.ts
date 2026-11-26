import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const res = NextResponse.redirect(
    new URL("/index.php?page=auth/login", req.url),
    303
  );
  res.cookies.set("lab9_user", "", { path: "/", maxAge: 0 });
  res.cookies.set(
    "lab9_flash",
    JSON.stringify({
      type: "success",
      message: "Anda telah keluar dari sesi.",
    }),
    { path: "/" }
  );
  return res;
}
