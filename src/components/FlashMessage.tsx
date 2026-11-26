"use client";

import { useEffect } from "react";
import type { FlashData } from "@/helpers/functions";

export function FlashMessage({ flash }: { flash: FlashData | null }) {
  useEffect(() => {
    if (flash) {
      document.cookie = "lab9_flash=; path=/; max-age=0";
    }
  }, [flash]);

  if (!flash) return null;

  const typeClass =
    flash.type === "success" ? "alert-success" : "alert-error";

  return <div className={`alert ${typeClass}`}>{flash.message}</div>;
}
