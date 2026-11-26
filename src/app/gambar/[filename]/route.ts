import { NextRequest, NextResponse } from "next/server";
import { getUploadedImage } from "@/lib/store";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const image = getUploadedImage(filename);
  if (!image) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(new Uint8Array(image.buffer), {
    status: 200,
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "no-store",
    },
  });
}
