import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">REEL<span>.</span></Link>
      <nav className="nav">
        <Link href="/browse/latest">Latest</Link>
        <Link href="/free" className="nav-free">Watch Free</Link>
        <Link href="/browse/now_playing">In Theaters</Link>
        <Link href="/browse/upcoming">Coming Soon</Link>
        <Link href="/browse/trending">Trending</Link>
        <Link href="/my-list">My List</Link>
      </nav>
      <form action="/search" className="search">
        <input name="q" type="search" placeholder="Search movies…" aria-label="Search movies" />
      </form>
    </header>
  );
}
