import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function Grid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
}
