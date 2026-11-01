import Link from "next/link";
import Row from "@/components/Row";
import { getLatest, getList, getMovie, img, pickTrailer, year } from "@/lib/tmdb";
import TrailerButton from "@/components/TrailerButton";
import FreeCard from "@/components/FreeCard";
import { FREE_MOVIES } from "@/lib/free";

export const revalidate = 3600;

export default async function Home() {
  const [latest, nowPlaying, upcoming, trending, popular] = await Promise.all([
    getLatest(),
    getList("now_playing"),
    getList("upcoming"),
    getList("trending"),
    getList("popular"),
  ]);

  const heroBase = nowPlaying.results.find((m) => m.backdrop_path) || nowPlaying.results[0];
  const hero = heroBase ? await getMovie(String(heroBase.id)) : null;
  const trailer = hero ? pickTrailer(hero.videos.results) : undefined;
  const backdrop = hero ? img(hero.backdrop_path, "w1280") : null;

  return (
    <>
      {hero && (
        <section className="hero" style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}>
          <div className="hero-shade" />
          <div className="hero-body">
            <span className="pill">New in theaters</span>
            <h1>{hero.title}</h1>
            <p className="meta">
              {year(hero.release_date)} · ★ {hero.vote_average.toFixed(1)}
              {hero.runtime ? ` · ${hero.runtime} min` : ""}
            </p>
            <p className="overview">{hero.overview}</p>
            <div className="actions">
              {trailer && <TrailerButton videoKey={trailer.key} title={hero.title} />}
              <Link href={`/movie/${hero.id}`} className="btn btn-ghost">More info</Link>
            </div>
          </div>
        </section>
      )}
      <Row title="Latest Releases" movies={latest.results} href="/browse/latest" />
      <section className="row">
        <div className="row-head">
          <h2>Watch Free: full movies</h2>
          <Link href="/free" className="see-all">See all →</Link>
        </div>
        <div className="row-scroll">
          {FREE_MOVIES.map((m) => (
            <FreeCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
      <Row title="Now Playing in Theaters" movies={nowPlaying.results} href="/browse/now_playing" />
      <Row title="Trending This Week" movies={trending.results} href="/browse/trending" />
      <Row title="Coming Soon" movies={upcoming.results} href="/browse/upcoming" />
      <Row title="Popular" movies={popular.results} href="/browse/popular" />
    </>
  );
}
