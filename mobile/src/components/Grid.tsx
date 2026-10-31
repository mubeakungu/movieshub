import { FlatList, useWindowDimensions } from "react-native";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function Grid({ movies, header }: { movies: Movie[]; header?: React.ReactElement }) {
  const { width } = useWindowDimensions();
  const cols = width > 700 ? 5 : 3;
  const cardW = (width - 32 - (cols - 1) * 12) / cols;
  return (
    <FlatList
      key={cols}
      data={movies}
      numColumns={cols}
      keyExtractor={(m) => String(m.id)}
      renderItem={({ item }) => <MovieCard movie={item} width={cardW} />}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 18, padding: 16 }}
      ListHeaderComponent={header}
      keyboardShouldPersistTaps="handled"
    />
  );
}
