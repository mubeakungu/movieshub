import Link from "next/link";
import { notFound } from "next/navigation";
import Grid from "@/components/Grid";
import { LISTS, getLatest, getLatestFree, getList, type ListKey } from "@/lib/tmdb";

const TITLES: Record<string, string> = { latest: "Latest Releases", latest_free: "Latest Free to Stream (with ads)", ...Object.fromEntries(Object.entries(LISTS).map(([k, v]) => [k, v.title])) };

export default async function Browse({
  params,
  searchParams,
}: {
  params: Promise<{ list: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { list } = await params;
  const { page: p } = await searchParams;
  if (!(list in TITLES)) notFound();
  const page = Math.max(1, Math.min(500, Number(p) || 1));
  const data =
    list === "latest" ? await getLatest(page) : list === "latest_free" ? await getLatestFree(page) : await getList(list as ListKey, page);
  const last = Math.min(data.total_pages, 500);

  return (
    <div className="page">
      <h1 className="page-title">{TITLES[list]}</h1>
      <Grid movies={data.results} />
      <div className="pager">
        {page > 1 && <Link className="btn btn-ghost" href={`?page=${page - 1}`}>← Prev</Link>}
        <span>Page {page} of {last}</span>
        {page < last && <Link className="btn btn-ghost" href={`?page=${page + 1}`}>Next →</Link>}
      </div>
    </div>
  );
}
