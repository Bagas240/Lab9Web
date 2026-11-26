import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/views/Header";
import { Footer } from "@/views/Footer";
import { DashboardView } from "@/views/Dashboard";
import { NotFoundView } from "@/views/NotFoundView";
import { ListView } from "@/modules/user/ListView";
import { AddView } from "@/modules/user/AddView";
import { EditView } from "@/modules/user/EditView";
import { LoginView } from "@/modules/auth/LoginView";
import { FlashMessage } from "@/components/FlashMessage";
import type { FlashData } from "@/helpers/functions";
import { getBarangById } from "@/lib/store";

const ALLOWED_ROUTES = new Set([
  "dashboard",
  "user/list",
  "user/add",
  "user/edit",
  "user/delete",
  "auth/login",
  "auth/logout",
]);

const PROTECTED_ROUTES = new Set([
  "user/list",
  "user/add",
  "user/edit",
  "user/delete",
]);

export interface RouterSearchParams {
  page?: string | string[];
  id?: string | string[];
  notice?: string | string[];
}

export async function ModularRouter({
  searchParams,
  explicitPage,
}: {
  searchParams: RouterSearchParams;
  explicitPage?: string;
}) {
  const cookieStore = await cookies();
  const currentUser = cookieStore.get("lab9_user")?.value ?? null;

  let flash: FlashData | null = null;
  const rawFlash = cookieStore.get("lab9_flash")?.value;
  if (rawFlash) {
    try {
      const parsed = JSON.parse(rawFlash) as FlashData;
      if (
        parsed &&
        (parsed.type === "success" || parsed.type === "error") &&
        typeof parsed.message === "string"
      ) {
        flash = parsed;
      }
    } catch {
      flash = null;
    }
  }

  if (!flash && searchParams.notice === "auth_required") {
    flash = {
      type: "error",
      message: "Silakan login terlebih dahulu untuk mengakses halaman ini.",
    };
  }

  const rawPage = explicitPage !== undefined ? explicitPage : searchParams.page;
  const page = rawPage === undefined ? "dashboard" : rawPage;
  const currentPage = typeof page === "string" ? page : "";

  if (
    typeof page === "string" &&
    PROTECTED_ROUTES.has(page) &&
    !currentUser
  ) {
    redirect("/index.php?page=auth/login&notice=auth_required");
  }

  let content: React.ReactNode;

  if (typeof page !== "string" || !ALLOWED_ROUTES.has(page)) {
    content = <NotFoundView />;
  } else if (page === "dashboard") {
    content = <DashboardView />;
  } else if (page === "user/list") {
    content = <ListView />;
  } else if (page === "user/add") {
    content = <AddView />;
  } else if (page === "user/edit") {
    const rawId = typeof searchParams.id === "string" ? searchParams.id : "";
    const id = Number.parseInt(rawId, 10);
    const data = Number.isFinite(id) && id > 0 ? getBarangById(id) : null;
    if (!data) {
      redirect("/index.php?page=user/list");
    }
    content = <EditView data={data} />;
  } else if (page === "user/delete") {
    redirect("/index.php?page=user/list");
  } else if (page === "auth/login") {
    if (currentUser) {
      redirect("/index.php?page=user/list");
    }
    content = <LoginView />;
  } else if (page === "auth/logout") {
    redirect("/api/auth/logout");
  } else {
    content = <NotFoundView />;
  }

  return (
    <div className="container">
      <Header currentPage={currentPage} currentUser={currentUser} />
      <main>
        <FlashMessage flash={flash} />
        {content}
      </main>
      <Footer />
    </div>
  );
}
