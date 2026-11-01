import { FlatList, StyleSheet, Text, useWindowDimensions } from "react-native";
import FreeCard from "@/components/FreeCard";
import { FREE_MOVIES } from "@/lib/free";
import { colors } from "@/lib/theme";
import { isTV } from "@/lib/tv";

export default function Free() {
  const { width } = useWindowDimensions();
  const pad = isTV ? 48 : 16;
  const cols = isTV ? 6 : width > 700 ? 5 : 3;
  const cardW = (width - pad * 2 - (cols - 1) * 12) / cols;
  return (
    <FlatList
      key={cols}
      data={FREE_MOVIES}
      numColumns={cols}
      keyExtractor={(m) => m.id}
      renderItem={({ item }) => <FreeCard movie={item} width={cardW} />}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ gap: 18, padding: pad }}
      ListHeaderComponent={
        <Text style={styles.intro}>
          Full-length classics and open movies you can watch right here, free and legal. Public domain and Creative
          Commons films, streamed from the Internet Archive.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({ intro: { color: colors.muted, lineHeight: 20, marginBottom: 4 } });
