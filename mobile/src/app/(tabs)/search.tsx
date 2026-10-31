import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Grid from "@/components/Grid";
import { searchMovies, type Movie } from "@/lib/tmdb";
import { colors } from "@/lib/theme";

export default function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Movie[] | null>(null);

  useEffect(() => {
    const query = q.trim();
    if (!query) return setResults(null);
    let cancelled = false;
    const t = setTimeout(() => {
      searchMovies(query)
        .then((r) => !cancelled && setResults(r.results))
        .catch(() => !cancelled && setResults([]));
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  const header = (
    <View>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search movies…"
        placeholderTextColor={colors.muted}
        style={styles.input}
        autoFocus
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      {results && !results.length && <Text style={styles.muted}>No movies found.</Text>}
    </View>
  );

  return <Grid movies={results || []} header={header} />;
}

const styles = StyleSheet.create({
  input: { backgroundColor: colors.panel, color: colors.text, borderColor: colors.border, borderWidth: 1, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 },
  muted: { color: colors.muted, marginTop: 16 },
});
