import type { Metadata } from "next";
import Header from "@/components/Header";
import { hasApiKey } from "@/lib/tmdb";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reel · The latest movies",
  description: "Discover the latest movies, watch trailers, and find where to stream them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {!hasApiKey && (
          <div className="banner">
            Showing sample data. Add <code>TMDB_READ_TOKEN</code> to <code>.env.local</code> to load real movies.
          </div>
        )}
        <main>{children}</main>
        <footer className="footer">
          Movie data and images from{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">TMDB</a>. This product uses the TMDB API
          but is not endorsed or certified by TMDB. Streaming availability by JustWatch.
        </footer>
      </body>
    </html>
  );
}
