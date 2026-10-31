import Link from "next/link";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function Row({ title, movies, href }: { title: string; movies: Movie[]; href?: string }) {
  if (!movies.length) return null;
  return (
    <section className="row">
      <div className="row-head">
        <h2>{title}</h2>
        {href && <Link href={href} className="see-all">See all →</Link>}
      </div>
      <div className="row-scroll">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}
