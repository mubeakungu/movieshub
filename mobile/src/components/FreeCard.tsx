import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Focusable from "./Focusable";
import { freePosterUrl, type FreeMovie } from "@/lib/free";
import { colors } from "@/lib/theme";
import { isTV } from "@/lib/tv";

export default function FreeCard({ movie, width = isTV ? 190 : 130 }: { movie: FreeMovie; width?: number }) {
  return (
    <Link href={{ pathname: "/watch/[id]", params: { id: movie.id } }} asChild>
      <Focusable style={{ width }}>
        <View style={[styles.poster, { width: width - 4, height: (width - 4) * 1.5 }]}>
          <View style={styles.fallback}><Text style={styles.fallbackText}>{movie.title}</Text></View>
          <Image source={freePosterUrl(movie)} style={StyleSheet.absoluteFill} contentFit="cover" transition={150} />
          <View style={styles.badge}><Text style={styles.badgeText}>FREE</Text></View>
        </View>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.sub}>{movie.year} · {movie.runtime} min</Text>
      </Focusable>
    </Link>
  );
}

const styles = StyleSheet.create({
  poster: { borderRadius: 10, overflow: "hidden", backgroundColor: colors.panel },
  fallback: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", padding: 10, backgroundColor: "#2A3142" },
  fallbackText: { color: colors.text, fontWeight: "700", textAlign: "center" },
  badge: { position: "absolute", top: 6, left: 6, backgroundColor: "#22C55E", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: "#04130A", fontSize: 11, fontWeight: "800" },
  title: { color: colors.text, fontSize: 13, fontWeight: "600", marginTop: 6 },
  sub: { color: colors.muted, fontSize: 12 },
});
