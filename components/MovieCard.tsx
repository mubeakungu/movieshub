import Link from "next/link";
import Image from "next/image";
import { img, year } from "@/lib/format";
import type { Movie } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = img(movie.poster_path, "w342");
  return (
    <Link href={`/movie/${movie.id}`} className="card" title={movie.title}>
      <div className="poster">
        {poster ? (
          <Image src={poster} alt={movie.title} fill sizes="(max-width: 640px) 40vw, 180px" />
        ) : (
          <div className="poster-fallback">{movie.title}</div>
        )}
        {movie.vote_average > 0 && <span className="rating">★ {movie.vote_average.toFixed(1)}</span>}
      </div>
      <div className="card-title">{movie.title}</div>
      <div className="card-sub">{year(movie.release_date)}</div>
    </Link>
  );
}
