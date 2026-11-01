# Reel mobile (Android + iPhone)

The Expo / React Native version of Reel: latest releases, now playing, trending, coming soon, search, movie details
with cast, trailers (opens YouTube), Where to watch, and a saved My List. Same TMDB data as the web app.

## Run on your phone

```bash
cd mobile
npm install
cp .env.example .env.local   # paste your TMDB "API Read Access Token"
npx expo start               # scan the QR code with the Expo Go app
```

Without a token the app runs on sample data. `EXPO_PUBLIC_*` values are bundled into the app, so only use a
read-only TMDB token there.

## Download the Android app

Every change to `mobile/` on `main` builds an APK with GitHub Actions and attaches it to the
[android-latest release](https://github.com/mubeakungu/movieshub/releases/tag/android-latest). Open that page on your
Android phone, download `reel.apk`, and open it to install (allow installs from your browser when asked).

To load real movies in that build, add a repository secret named `TMDB_READ_TOKEN` (GitHub → Settings → Secrets and
variables → Actions) and re-run the "Android APK" workflow. This build is signed with a debug key, which is fine for
sideloading but not for the Play Store; use EAS (below) for store releases.

## Build with EAS (store releases)

Uses EAS Build (free tier, runs in the cloud, no Android Studio or Xcode needed):

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview   # gives you an .apk download link
npx eas-cli@latest build -p ios --profile production    # needs an Apple Developer account
```

Add `EXPO_PUBLIC_TMDB_READ_TOKEN` as an EAS environment variable (expo.dev → project → Environment variables) so
builds load real data.

## Android TV

The same APK runs on Android TV / Google TV: it appears on the TV home screen (with `assets/tv-banner.png`), lays
out in landscape with larger cards, and every card and button can be reached with the remote's arrow keys.
To install, use the **Downloader** app on the TV and enter
`github.com/mubeakungu/movieshub/releases/download/android-latest/reel.apk`.

## Watch Free and trailers

- Trailers play inside the app (`src/app/trailer/[key].tsx`, a YouTube embed in a WebView).
- **Watch Free** (`src/app/(tabs)/free.tsx`, `src/app/watch/[id].tsx`) streams full-length public-domain and
  Creative Commons films from the Internet Archive with `expo-video`. The list lives in `src/lib/free.ts` (and
  `lib/free.ts` for the website). Only add titles whose rights are clear: an archive.org upload is not automatically
  public domain.
