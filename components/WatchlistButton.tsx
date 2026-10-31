"use client";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";

const KEY = "reel:watchlist";
export type Saved = Pick<Movie, "id" | "title" | "poster_path" | "release_date" | "vote_average" | "overview" | "backdrop_path">;

export function readWatchlist(): Saved[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export default function WatchlistButton({ movie }: { movie: Saved }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(readWatchlist().some((m) => m.id === movie.id)), [movie.id]);

  function toggle() {
    const list = readWatchlist();
    const next = saved ? list.filter((m) => m.id !== movie.id) : [movie, ...list];
    localStorage.setItem(KEY, JSON.stringify(next));
    setSaved(!saved);
  }

  return (
    <button className="btn btn-ghost" onClick={toggle}>
      {saved ? "✓ In My List" : "+ My List"}
    </button>
  );
}
