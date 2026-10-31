import { mockDetails, mockList } from "./mock";

const BASE = "https://api.themoviedb.org/3";
const TOKEN = process.env.EXPO_PUBLIC_TMDB_READ_TOKEN;
export const REGION = process.env.EXPO_PUBLIC_TMDB_REGION || "US";
export const hasApiKey = Boolean(TOKEN);

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};
export type Paged<T> = { page: number; total_pages: number; total_results: number; results: T[] };
export type Video = { key: string; site: string; type: string; name: string; official?: boolean };
export type Provider = { provider_id: number; provider_name: string; logo_path: string };
export type CastMember = { id: number; name: string; character: string; profile_path: string | null };
export type WatchRegion = { link: string; flatrate?: Provider[]; rent?: Provider[]; buy?: Provider[]; free?: Provider[]; ads?: Provider[] };
export type MovieDetails = Movie & {
  runtime: number | null;
  tagline: string | null;
  genres: { id: number; name: string }[];
  videos: { results: Video[] };
  credits: { cast: CastMember[] };
  similar: Paged<Movie>;
  "watch/providers": { results: Record<string, WatchRegion> };
};

export type ListKey = "latest" | "now_playing" | "upcoming" | "trending" | "popular";
export const LIST_TITLES: Record<ListKey, string> = {
  latest: "Latest Releases",
  now_playing: "Now Playing in Theaters",
  trending: "Trending This Week",
  upcoming: "Coming Soon",
  popular: "Popular",
};

async function tmdb<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const qs = new URLSearchParams({ language: "en-US", ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
  const res = await fetch(`${BASE}${path}?${qs}`, { headers: { accept: "application/json", Authorization: `Bearer ${TOKEN}` } });
  if (!res.ok) throw new Error(`TMDB ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export async function getList(key: ListKey, page = 1): Promise<Paged<Movie>> {
  if (!hasApiKey) return mockList(page);
  switch (key) {
    case "latest": {
      const today = new Date();
      return tmdb("/discover/movie", {
        page,
        region: REGION,
        sort_by: "primary_release_date.desc",
        "primary_release_date.gte": iso(new Date(today.getTime() - 45 * 864e5)),
        "primary_release_date.lte": iso(today),
        "vote_count.gte": 10,
        with_release_type: "2|3|4|6",
      });
    }
    case "trending":
      return tmdb("/trending/movie/week", { page });
    case "now_playing":
    case "upcoming":
      return tmdb(`/movie/${key}`, { page, region: REGION });
    default:
      return tmdb(`/movie/${key}`, { page });
  }
}

export async function searchMovies(query: string): Promise<Paged<Movie>> {
  if (!hasApiKey) {
    const all = mockList(1);
    const results = all.results.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
    return { ...all, results, total_results: results.length };
  }
  return tmdb("/search/movie", { query, include_adult: "false" });
}

export async function getMovie(id: string): Promise<MovieDetails | null> {
  if (!hasApiKey) return mockDetails(Number(id));
  return tmdb(`/movie/${id}`, { append_to_response: "videos,credits,similar,watch/providers" });
}

export function pickTrailer(videos: Video[]): Video | undefined {
  const yt = videos.filter((v) => v.site === "YouTube");
  return yt.find((v) => v.type === "Trailer" && v.official) || yt.find((v) => v.type === "Trailer") || yt.find((v) => v.type === "Teaser") || yt[0];
}

export const img = (path: string | null, size: "w92" | "w185" | "w342" | "w500" | "w780" | "w1280" = "w342") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
export const year = (d?: string) => (d ? d.slice(0, 4) : "TBA");
