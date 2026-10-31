import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { img, year, type Movie } from "@/lib/tmdb";
import { colors } from "@/lib/theme";

export default function MovieCard({ movie, width = 130 }: { movie: Movie; width?: number }) {
  const poster = img(movie.poster_path, "w342");
  return (
    <Link href={{ pathname: "/movie/[id]", params: { id: String(movie.id) } }} asChild>
      <Pressable style={{ width }}>
        <View style={[styles.poster, { width, height: width * 1.5 }]}>
          {poster ? (
            <Image source={poster} style={StyleSheet.absoluteFill} contentFit="cover" transition={150} />
          ) : (
            <View style={styles.fallback}>
              <Text style={styles.fallbackText}>{movie.title}</Text>
            </View>
          )}
          {movie.vote_average > 0 && (
            <View style={styles.rating}>
              <Text style={styles.ratingText}>★ {movie.vote_average.toFixed(1)}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.sub}>{year(movie.release_date)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  poster: { borderRadius: 10, overflow: "hidden", backgroundColor: colors.panel },
  fallback: { flex: 1, alignItems: "center", justifyContent: "center", padding: 10, backgroundColor: "#2A3142" },
  fallbackText: { color: colors.text, fontWeight: "700", textAlign: "center" },
  rating: { position: "absolute", top: 6, left: 6, backgroundColor: "#000B", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  ratingText: { color: colors.text, fontSize: 11 },
  title: { color: colors.text, fontSize: 13, fontWeight: "600", marginTop: 6 },
  sub: { color: colors.muted, fontSize: 12 },
});
