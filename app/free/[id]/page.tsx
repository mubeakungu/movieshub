import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FreeCard from "@/components/FreeCard";
import { FREE_MOVIES, findFreeMovie, freePosterUrl, freeSourceUrl, freeVideoUrl } from "@/lib/free";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return FREE_MOVIES.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = findFreeMovie((await params).id);
  return { title: m ? `Watch ${m.title} (${m.year}) free · Reel` : "Not found · Reel" };
}

export default async function WatchFree({ params }: Props) {
  const movie = findFreeMovie((await params).id);
  if (!movie) notFound();
  const more = FREE_MOVIES.filter((m) => m.id !== movie.id);

  return (
    <div className="page">
      <div className="player">
        <video src={freeVideoUrl(movie)} poster={freePosterUrl(movie)} controls autoPlay playsInline preload="metadata" />
      </div>
      <h1 className="watch-title">{movie.title} <span className="muted">({movie.year})</span></h1>
      <p className="meta">{movie.runtime} min · {movie.license}</p>
      <p className="overview" style={{ maxWidth: 760 }}>{movie.overview}</p>
      <p className="muted" style={{ fontSize: 13 }}>
        Streaming from the <a href={freeSourceUrl(movie)} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Internet Archive</a>.
        {" "}<Link href="/free" style={{ textDecoration: "underline" }}>All free movies</Link>
      </p>
      <h2 style={{ marginTop: 36 }}>More free movies</h2>
      <div className="grid">
        {more.map((m) => (
          <FreeCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
