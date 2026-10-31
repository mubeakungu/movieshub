import Grid from "@/components/Grid";
import { searchMovies } from "@/lib/tmdb";

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const data = query ? await searchMovies(query) : null;
  return (
    <div className="page">
      <h1 className="page-title">{query ? `Results for “${query}”` : "Search"}</h1>
      <form action="/search" className="search search-big">
        <input name="q" type="search" defaultValue={query} placeholder="Search movies…" autoFocus />
      </form>
      {data && (data.results.length ? <Grid movies={data.results} /> : <p className="muted">No movies found.</p>)}
    </div>
  );
}
