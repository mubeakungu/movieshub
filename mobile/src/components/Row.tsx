import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";
import { colors } from "@/lib/theme";
import { isTV } from "@/lib/tv";

export default function Row({ title, movies }: { title: string; movies: Movie[] }) {
  if (!movies.length) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.heading}>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={{ gap: isTV ? 20 : 12, paddingHorizontal: isTV ? 48 : 16, paddingVertical: isTV ? 16 : 6 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginTop: 22 },
  heading: { color: colors.text, fontSize: isTV ? 24 : 18, fontWeight: "700", marginBottom: 10, paddingHorizontal: isTV ? 48 : 16 },
});
