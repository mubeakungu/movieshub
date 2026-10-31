# Reel: the latest movies

A Next.js app for discovering the newest movies: latest releases, now playing, coming soon, trending, search,
movie details with cast, official trailers (YouTube), a saved "My List", and **Where to watch** links to the
legal streaming, rental and purchase services for each title (TMDB / JustWatch data).

It does not host or stream full movies itself. Playback is trailers plus deep links to licensed services.

## Run it

```bash
npm install
cp .env.example .env.local   # paste your TMDB "API Read Access Token" into TMDB_READ_TOKEN
npm run dev                  # http://localhost:3000
```

Get a free TMDB key at https://www.themoviedb.org/settings/api. Without a key the app runs on sample data.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmubeakungu%2Fmovieshub&env=TMDB_READ_TOKEN&envDescription=TMDB%20API%20Read%20Access%20Token&envLink=https%3A%2F%2Fwww.themoviedb.org%2Fsettings%2Fapi&project-name=movieshub)

Push to GitHub and import into Vercel (or any Node host). Set `TMDB_READ_TOKEN` and optionally `TMDB_REGION`
(two-letter country code, default `US`) as environment variables. Pages are cached and refreshed hourly.

## Structure

- `lib/tmdb.ts`: TMDB client (lists, latest discover query, search, details with videos/credits/providers)
- `app/page.tsx`: home with hero trailer and rows
- `app/browse/[list]`: paged grids (`latest`, `now_playing`, `upcoming`, `trending`, `popular`, `top_rated`)
- `app/movie/[id]`: details, trailer, where to watch, cast, similar
- `app/search`, `app/my-list`: search and the localStorage watchlist
