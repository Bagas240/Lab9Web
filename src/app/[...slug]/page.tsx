import { ModularRouter, RouterSearchParams } from "@/lib/router";

export const dynamic = "force-dynamic";

export default async function RewriteCatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<RouterSearchParams>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const page = slug.join("/");
  return <ModularRouter searchParams={query} explicitPage={page} />;
}
