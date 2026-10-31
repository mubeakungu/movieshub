"use client";
import { useEffect, useState } from "react";
import Grid from "@/components/Grid";
import { readWatchlist, type Saved } from "@/components/WatchlistButton";

export default function MyList() {
  const [list, setList] = useState<Saved[] | null>(null);
  useEffect(() => setList(readWatchlist()), []);
  return (
    <div className="page">
      <h1 className="page-title">My List</h1>
      {list && (list.length ? <Grid movies={list} /> : <p className="muted">Nothing saved yet. Tap “+ My List” on any movie.</p>)}
    </div>
  );
}
