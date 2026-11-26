import { ModularRouter, RouterSearchParams } from "@/lib/router";

export const dynamic = "force-dynamic";

export default async function IndexPhpPage({
  searchParams,
}: {
  searchParams: Promise<RouterSearchParams>;
}) {
  const params = await searchParams;
  return <ModularRouter searchParams={params} />;
}
