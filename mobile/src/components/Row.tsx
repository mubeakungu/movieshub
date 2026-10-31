import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";
import { colors } from "@/lib/theme";

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
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { marginTop: 22 },
  heading: { color: colors.text, fontSize: 18, fontWeight: "700", marginBottom: 10, paddingHorizontal: 16 },
});
