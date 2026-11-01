import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import Focusable from "@/components/Focusable";
import { isTV } from "@/lib/tv";
import Row from "@/components/Row";
import { ErrorState, Loading } from "@/components/States";
import { REGION, getMovie, img, pickTrailer, year, type Provider } from "@/lib/tmdb";
import { colors } from "@/lib/theme";
import { useAsync } from "@/lib/useAsync";
import { useWatchlist } from "@/lib/watchlist";

function Providers({ label, list }: { label: string; list?: Provider[] }) {
  if (!list?.length) return null;
  return (
    <View style={styles.providers}>
      <Text style={styles.providerLabel}>{label}</Text>
      {list.slice(0, 6).map((p) => (
        <Image key={p.provider_id} source={img(p.logo_path, "w92")!} style={styles.providerLogo} accessibilityLabel={p.provider_name} />
      ))}
    </View>
  );
}

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: movie, error, loading, reload } = useAsync(() => getMovie(id), [id]);
  const { has, toggle } = useWatchlist();

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={reload} />;
  if (!movie)
    return (
      <View style={[styles.center]}>
        <Text style={styles.muted}>Movie not found.</Text>
      </View>
    );

  const trailer = pickTrailer(movie.videos.results);
  const backdrop = img(movie.backdrop_path, "w780");
  const poster = img(movie.poster_path, "w342");
  const watch = movie["watch/providers"].results[REGION];
  const saved = has(movie.id);
  const runtime = movie.runtime ? ` · ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "";

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.backdrop}>
        {backdrop && <Image source={backdrop} style={StyleSheet.absoluteFill} contentFit="cover" />}
        <LinearGradient colors={["#0B0D1255", colors.bg]} style={StyleSheet.absoluteFill} />
      </View>

      <View style={styles.top}>
        <View style={styles.poster}>
          {poster ? (
            <Image source={poster} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <View style={styles.posterFallback}><Text style={styles.text}>{movie.title}</Text></View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.muted}>{year(movie.release_date)} · ★ {movie.vote_average.toFixed(1)}{runtime}</Text>
          <View style={styles.genres}>
            {movie.genres.map((g) => <Text key={g.id} style={styles.pill}>{g.name}</Text>)}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        {movie.tagline ? <Text style={styles.tagline}>{movie.tagline}</Text> : null}
        <Text style={styles.overview}>{movie.overview}</Text>

        <View style={styles.actions}>
          {trailer ? (
            <Focusable
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`)}
              hasTVPreferredFocus
            >
              <Text style={styles.btnText}>▶ Play Trailer</Text>
            </Focusable>
          ) : (
            <Text style={styles.muted}>No trailer yet</Text>
          )}
          <Focusable style={styles.btn} onPress={() => toggle(movie)} hasTVPreferredFocus={!trailer}>
            <Text style={styles.btnText}>{saved ? "✓ In My List" : "+ My List"}</Text>
          </Focusable>
        </View>

        <View style={styles.watch}>
          <Text style={styles.h3}>Where to watch</Text>
          {watch ? (
            <>
              <Providers label="Stream" list={watch.flatrate} />
              <Providers label="Free" list={[...(watch.free || []), ...(watch.ads || [])]} />
              <Providers label="Rent" list={watch.rent} />
              <Providers label="Buy" list={watch.buy} />
              <Focusable onPress={() => Linking.openURL(watch.link)} style={{ alignSelf: "flex-start", padding: 4 }}>
                <Text style={styles.link}>See all options →</Text>
              </Focusable>
            </>
          ) : (
            <Text style={styles.muted}>Not streaming in {REGION} yet. It may still be in theaters.</Text>
          )}
        </View>
      </View>

      {movie.credits.cast.length > 0 && (
        <View style={{ marginTop: 22 }}>
          <Text style={[styles.h2, { paddingHorizontal: 16 }]}>Cast</Text>
          <FlatList
            horizontal
            data={movie.credits.cast.slice(0, 15)}
            keyExtractor={(c) => String(c.id)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View style={{ width: 84, alignItems: "center" }}>
                <View style={styles.castPhoto}>
                  {item.profile_path ? (
                    <Image source={img(item.profile_path, "w185")!} style={StyleSheet.absoluteFill} contentFit="cover" />
                  ) : (
                    <Text style={styles.muted}>{item.name[0]}</Text>
                  )}
                </View>
                <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.castChar} numberOfLines={1}>{item.character}</Text>
              </View>
            )}
          />
        </View>
      )}

      <Row title="More like this" movies={movie.similar.results.filter((m) => m.id !== movie.id)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  backdrop: { height: isTV ? 360 : 240, backgroundColor: colors.panel },
  top: { flexDirection: "row", gap: isTV ? 28 : 14, paddingHorizontal: isTV ? 48 : 16, marginTop: -90, alignItems: "flex-end" },
  poster: { width: isTV ? 200 : 110, height: isTV ? 300 : 165, borderRadius: 10, overflow: "hidden", backgroundColor: colors.panel },
  posterFallback: { flex: 1, alignItems: "center", justifyContent: "center", padding: 8, backgroundColor: "#2A3142" },
  title: { color: colors.text, fontSize: isTV ? 40 : 24, fontWeight: "800" },
  text: { color: colors.text, fontWeight: "700", textAlign: "center" },
  muted: { color: colors.muted, marginTop: 4 },
  genres: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  pill: { color: colors.text, fontSize: 11, backgroundColor: "#FFFFFF1A", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, overflow: "hidden" },
  section: { paddingHorizontal: isTV ? 48 : 16, marginTop: 16, maxWidth: isTV ? 1100 : undefined },
  tagline: { color: colors.muted, fontStyle: "italic", marginBottom: 8 },
  overview: { color: "#D6DBE4", lineHeight: 22 },
  actions: { flexDirection: "row", gap: 10, marginTop: 16, alignItems: "center" },
  btn: { backgroundColor: "#FFFFFF1F", paddingHorizontal: 16, paddingVertical: 11, borderRadius: 8 },
  btnPrimary: { backgroundColor: colors.accent },
  btnText: { color: colors.text, fontWeight: "700" },
  watch: { marginTop: 20, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#FFFFFF14", backgroundColor: colors.panel },
  h2: { color: colors.text, fontSize: 18, fontWeight: "700", marginBottom: 10 },
  h3: { color: colors.text, fontSize: 16, fontWeight: "700", marginBottom: 10 },
  providers: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  providerLabel: { color: colors.muted, width: 48, fontSize: 13 },
  providerLogo: { width: 36, height: 36, borderRadius: 8 },
  link: { color: colors.muted, marginTop: 4 },
  castPhoto: { width: 76, height: 76, borderRadius: 38, overflow: "hidden", backgroundColor: colors.panel, alignItems: "center", justifyContent: "center" },
  castName: { color: colors.text, fontSize: 12, fontWeight: "600", marginTop: 6 },
  castChar: { color: colors.muted, fontSize: 11 },
});
