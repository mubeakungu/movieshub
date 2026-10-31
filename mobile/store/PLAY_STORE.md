# Publishing Reel on Google Play

Everything that can be prepared in the repo is done. These steps need you, because they happen in your own
Google and GitHub accounts.

## 1. Add the signing secrets to GitHub (5 min, on a computer)

The upload key files were shared with you privately (not in this repo). In
GitHub → movieshub → Settings → Secrets and variables → Actions → **New repository secret**, add:

| Name | Value |
| --- | --- |
| `ANDROID_UPLOAD_KEYSTORE_BASE64` | the whole contents of `ANDROID_UPLOAD_KEYSTORE_BASE64.txt` |
| `ANDROID_UPLOAD_KEYSTORE_PASSWORD` | the contents of `ANDROID_UPLOAD_KEYSTORE_PASSWORD.txt` |
| `TMDB_READ_TOKEN` | your TMDB "API Read Access Token" (so the app shows real movies) |

Then Actions → **Android APK** → **Run workflow**. When it finishes, `reel.aab` is on the
[android-latest release](https://github.com/mubeakungu/movieshub/releases/tag/android-latest).

Keep `reel-upload.jks` and its password somewhere safe (a password manager). If it is ever lost, Google can reset
the upload key, but it takes a few days.

## 2. Create a Google Play developer account

- Go to https://play.google.com/console/signup, choose **Personal** (or Organization if you have a registered business).
- One-time fee: **US$25**. Google verifies your ID and a phone number; this can take a few days.

## 3. Create the app

Play Console → **Create app**:

- App name: **Reel: Latest Movies**
- Default language: English (US) · App or game: **App** · Free or paid: **Free**
- Accept the declarations.

## 4. Fill in "Set up your app" (Dashboard)

| Section | Answer |
| --- | --- |
| Privacy policy | `https://github.com/mubeakungu/movieshub/blob/main/PRIVACY.md` (or `https://<your-vercel-site>/privacy`) |
| App access | All functionality is available without special access |
| Ads | No, the app does not contain ads |
| Content rating | Fill the questionnaire: category **Reference, News, or Educational**; answer No to violence/sexual/etc. Trailers can contain mature scenes, so answer honestly if asked about user-viewable video. |
| Target audience | **18 and over** (keeps it simple; trailers aren't filtered for kids) |
| News app | No |
| Data safety | **No data collected, no data shared.** (My List stays on the device; there are no accounts or analytics.) |
| Government app / financial features / health | No |
| App category | **Entertainment** |
| Contact email | your email |

## 5. Store listing

Main store listing → use the text below and the images in this folder.

- **App icon**: `play-icon-512.png`
- **Feature graphic**: `play-feature-graphic.png`
- **Phone screenshots** (at least 2): install the APK on your phone *after* adding `TMDB_READ_TOKEN`, then screenshot
  the home screen, a movie page, and search.

**Short description (≤80 chars)**

> New movies, trailers, and where to stream them, all in one place.

**Full description**

> Reel keeps you up to date with the newest movies.
>
> • Latest releases, now playing in theaters, trending this week, and coming soon
> • Watch official trailers
> • See where every movie is streaming, free, for rent, or to buy in your country
> • Search any movie and see cast, runtime, ratings, and similar films
> • Save movies to My List so you remember what to watch next
>
> No account and no ads. Your list stays on your phone.
>
> Movie data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
> Streaming availability by JustWatch.

## 6. Upload and test

New personal developer accounts must run a **closed test with at least 12 testers for 14 days** before they can
publish to everyone. Organization accounts can skip this.

1. Testing → **Closed testing** → Create track → **Create new release**.
2. Accept **Play App Signing** (Google holds the final signing key; you keep the upload key).
3. Upload `reel.aab` from the android-latest release. Release name: `1.0.0`.
4. Add testers (a Google Group or a list of emails), save, and **Send for review**.
5. After 14 days with 12+ opted-in testers, Dashboard → **Apply for production** and roll out.

Every later update: push to `main`, run the workflow, and upload the new `reel.aab` (its version number increases
automatically).
