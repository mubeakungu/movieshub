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

## Build an installable app

Uses EAS Build (free tier, runs in the cloud, no Android Studio or Xcode needed):

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview   # gives you an .apk download link
npx eas-cli@latest build -p ios --profile production    # needs an Apple Developer account
```

Add `EXPO_PUBLIC_TMDB_READ_TOKEN` as an EAS environment variable (expo.dev → project → Environment variables) so
builds load real data.
