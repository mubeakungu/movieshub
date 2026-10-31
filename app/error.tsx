"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page">
      <h1 className="page-title">Couldn’t load movies</h1>
      <p className="muted">The movie database didn’t respond. Check your TMDB key or try again.</p>
      <button className="btn btn-ghost" onClick={reset}>Try again</button>
    </div>
  );
}
