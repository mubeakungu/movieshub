import Link from "next/link";
import { freePosterUrl, type FreeMovie } from "@/lib/free";

export default function FreeCard({ movie }: { movie: FreeMovie }) {
  return (
    <Link href={`/free/${movie.id}`} className="card" title={movie.title}>
      <div className="poster">
        <div className="poster-fallback">{movie.title}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={freePosterUrl(movie)} alt={movie.title} loading="lazy" className="poster-img" />
        <span className="rating free-badge">FREE</span>
      </div>
      <div className="card-title">{movie.title}</div>
      <div className="card-sub">{movie.year} · {movie.runtime} min</div>
    </Link>
  );
}
