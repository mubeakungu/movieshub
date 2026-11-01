import { mockDetails, mockList } from "./mock";

const BASE = "https://api.themoviedb.org/3";

export const REGION = process.env.TMDB_REGION || "US";
export const hasApiKey = Boolean(process.env.TMDB_READ_TOKEN || process.env.TMDB_API_KEY);

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
};

export type Paged<T> = { page: number; total_pages: number; total_results: number; results: T[] };

export type Video = { key: string; site: string; type: string; name: string; official?: boolean };
export type Provider = { provider_id: number; provider_name: string; logo_path: string };
export type CastMember = { id: number; name: string; character: string; profile_path: string | null };

export type MovieDetails = Movie & {
  runtime: number | null;
  tagline: string | null;
  genres: { id: number; name: string }[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
  similar: Paged<Movie>;
  "watch/providers": {
    results: Record<string, { link: string; flatrate?: Provider[]; rent?: Provider[]; buy?: Provider[]; free?: Provider[]; ads?: Provider[] }>;
  };
};

export const LISTS = {
  now_playing: { title: "Now Playing in Theaters", path: "/movie/now_playing" },
  upcoming: { title: "Coming Soon", path: "/movie/upcoming" },
  trending: { title: "Trending This Week", path: "/trending/movie/week" },
  popular: { title: "Popular", path: "/movie/popular" },
  top_rated: { title: "Top Rated", path: "/movie/top_rated" },
} as const;
export type ListKey = keyof typeof LISTS;

async function tmdb<T>(path: string, params: Record<string, string | number> = {}, revalidate = 3600): Promise<T> {
  const url = new URL(BASE + path);
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const headers: Record<string, string> = { accept: "application/json" };
  if (process.env.TMDB_READ_TOKEN) headers.Authorization = `Bearer ${process.env.TMDB_READ_TOKEN}`;
  else if (process.env.TMDB_API_KEY) url.searchParams.set("api_key", process.env.TMDB_API_KEY);

  const res = await fetch(url, { headers, next: { revalidate } });
  if (!res.ok) throw new Error(`TMDB ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

export async function getList(key: ListKey, page = 1): Promise<Paged<Movie>> {
  if (!hasApiKey) return mockList(page);
  const params: Record<string, string | number> = { page };
  if (key === "now_playing" || key === "upcoming") params.region = REGION;
  return tmdb<Paged<Movie>>(LISTS[key].path, params);
}

/** Latest releases: things released in the last ~45 days, newest first. */
export async function getLatest(page = 1): Promise<Paged<Movie>> {
  if (!hasApiKey) return mockList(page);
  const today = new Date();
  const from = new Date(today.getTime() - 45 * 864e5);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return tmdb<Paged<Movie>>("/discover/movie", {
    page,
    region: REGION,
    sort_by: "primary_release_date.desc",
    "primary_release_date.gte": iso(from),
    "primary_release_date.lte": iso(today),
    "vote_count.gte": 10,
    with_release_type: "2|3|4|6",
  });
}

/** Newest movies that are free to stream (with or without ads) in REGION, via TMDB/JustWatch data. */
export async function getLatestFree(page = 1): Promise<Paged<Movie>> {
  if (!hasApiKey) return mockList(page);
  return tmdb<Paged<Movie>>("/discover/movie", {
    page,
    watch_region: REGION,
    with_watch_monetization_types: "free|ads",
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": new Date().toISOString().slice(0, 10),
    "vote_count.gte": 20,
  });
}

export async function searchMovies(query: string, page = 1): Promise<Paged<Movie>> {
  if (!hasApiKey) {
    const all = mockList(1);
    const results = all.results.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
    return { ...all, results, total_results: results.length };
  }
  return tmdb<Paged<Movie>>("/search/movie", { query, page, include_adult: "false" }, 600);
}

export async function getMovie(id: string): Promise<MovieDetails | null> {
  if (!hasApiKey) return mockDetails(Number(id));
  try {
    return await tmdb<MovieDetails>(`/movie/${id}`, { append_to_response: "videos,credits,similar,watch/providers" });
  } catch {
    return null;
  }
}

export function pickTrailer(videos: Video[]): Video | undefined {
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ||
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0]
  );
}

export { img, year } from "./format";
