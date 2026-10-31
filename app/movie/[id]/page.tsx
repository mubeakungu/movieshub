import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Row from "@/components/Row";
import TrailerButton from "@/components/TrailerButton";
import WatchlistButton from "@/components/WatchlistButton";
import { REGION, getMovie, img, pickTrailer, year, type Provider } from "@/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovie((await params).id);
  return { title: movie ? `${movie.title} (${year(movie.release_date)}) · Reel` : "Not found · Reel" };
}

function Providers({ label, list }: { label: string; list?: Provider[] }) {
  if (!list?.length) return null;
  return (
    <div className="providers">
      <span className="providers-label">{label}</span>
      {list.map((p) => (
        <span key={p.provider_id} className="provider" title={p.provider_name}>
          <Image src={img(p.logo_path, "w92")!} alt={p.provider_name} width={40} height={40} />
        </span>
      ))}
    </div>
  );
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const movie = await getMovie(id);
  if (!movie) notFound();

  const trailer = pickTrailer(movie.videos.results);
  const backdrop = img(movie.backdrop_path, "w1280");
  const poster = img(movie.poster_path, "w500");
  const watch = movie["watch/providers"].results[REGION];
  const saved = {
    id: movie.id, title: movie.title, poster_path: movie.poster_path, backdrop_path: movie.backdrop_path,
    release_date: movie.release_date, vote_average: movie.vote_average, overview: movie.overview,
  };

  return (
    <>
      <section className="detail" style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}>
        <div className="hero-shade" />
        <div className="detail-body">
          <div className="detail-poster">
            {poster ? <Image src={poster} alt={movie.title} fill sizes="300px" priority /> : <div className="poster-fallback">{movie.title}</div>}
          </div>
          <div className="detail-info">
            <h1>{movie.title} <span className="muted">({year(movie.release_date)})</span></h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            <p className="meta">
              {movie.release_date || "Release date TBA"} · ★ {movie.vote_average.toFixed(1)}
              {movie.runtime ? ` · ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ""}
            </p>
            <div className="genres">{movie.genres.map((g) => <span key={g.id} className="pill">{g.name}</span>)}</div>
            <p className="overview">{movie.overview}</p>
            <div className="actions">
              {trailer ? <TrailerButton videoKey={trailer.key} title={movie.title} /> : <span className="muted">No trailer yet</span>}
              <WatchlistButton movie={saved} />
            </div>

            <div className="watch">
              <h3>Where to watch</h3>
              {watch ? (
                <>
                  <Providers label="Stream" list={watch.flatrate} />
                  <Providers label="Free" list={[...(watch.free || []), ...(watch.ads || [])]} />
                  <Providers label="Rent" list={watch.rent} />
                  <Providers label="Buy" list={watch.buy} />
                  <a href={watch.link} target="_blank" rel="noreferrer" className="see-all">See all options →</a>
                </>
              ) : (
                <p className="muted">Not streaming in {REGION} yet. It may still be in theaters.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {movie.credits.cast.length > 0 && (
        <section className="row">
          <div className="row-head"><h2>Cast</h2></div>
          <div className="row-scroll">
            {movie.credits.cast.slice(0, 15).map((c) => (
              <div key={c.id} className="cast">
                <div className="cast-photo">
                  {c.profile_path ? <Image src={img(c.profile_path, "w185")!} alt={c.name} fill sizes="120px" /> : <span>{c.name[0]}</span>}
                </div>
                <div className="card-title">{c.name}</div>
                <div className="card-sub">{c.character}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Row title="More like this" movies={movie.similar.results.filter((m) => m.id !== movie.id)} />
    </>
  );
}
