import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy · Reel" };

export default function Privacy() {
  return (
    <div className="page prose">
      <h1 className="page-title">Privacy policy</h1>
      <p className="muted">Last updated: October 31, 2026</p>
      <p>
        Reel (the website and the Android/iOS app) lets you browse movies, watch trailers, and see where films are
        available to stream. This policy explains what happens to your data.
      </p>
      <h2>What we collect</h2>
      <p><strong>Nothing personal.</strong> Reel has no accounts, no sign-in, no ads, and no analytics or tracking SDKs.</p>
      <ul>
        <li><strong>My List</strong> is stored only on your device and is never sent to us. Uninstalling the app or clearing site data deletes it.</li>
        <li>
          <strong>Search terms and movie lookups</strong> are sent to The Movie Database (TMDB) API to fetch movie information.{" "}
          <a href="https://www.themoviedb.org/privacy-policy">TMDB&apos;s privacy policy</a> applies to those requests.
        </li>
        <li><strong>Trailers</strong> open on YouTube, and &quot;Where to watch&quot; links open the streaming service&apos;s site. Those services have their own privacy policies.</li>
        <li><strong>Images</strong> are loaded from TMDB&apos;s image servers, which can see your IP address like any website you visit.</li>
      </ul>
      <h2>Children</h2>
      <p>Reel is not directed at children under 13 and does not knowingly collect any information from them.</p>
      <h2>Changes</h2>
      <p>If this policy changes, the new version will be posted here with a new date.</p>
      <h2>Contact</h2>
      <p>Questions: <a href="https://github.com/mubeakungu/movieshub/issues">open an issue on GitHub</a>.</p>
    </div>
  );
}
