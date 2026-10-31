import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import type { Movie } from "./tmdb";

const KEY = "reel:watchlist";
type Listener = (list: Movie[]) => void;
const listeners = new Set<Listener>();

export async function readWatchlist(): Promise<Movie[]> {
  try {
    return JSON.parse((await AsyncStorage.getItem(KEY)) || "[]");
  } catch {
    return [];
  }
}

async function write(list: Movie[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((l) => l(list));
}

/** Shared watchlist state, kept in sync across screens. */
export function useWatchlist() {
  const [list, setList] = useState<Movie[]>([]);
  useEffect(() => {
    readWatchlist().then(setList);
    listeners.add(setList);
    return () => void listeners.delete(setList);
  }, []);

  const toggle = useCallback(async (m: Movie) => {
    const cur = await readWatchlist();
    const exists = cur.some((x) => x.id === m.id);
    const { id, title, overview, poster_path, backdrop_path, release_date, vote_average } = m;
    await write(exists ? cur.filter((x) => x.id !== m.id) : [{ id, title, overview, poster_path, backdrop_path, release_date, vote_average }, ...cur]);
  }, []);

  return { list, has: (id: number) => list.some((m) => m.id === id), toggle };
}
