import { StyleSheet, Text, View } from "react-native";
import Grid from "@/components/Grid";
import { useWatchlist } from "@/lib/watchlist";
import { colors } from "@/lib/theme";

export default function MyList() {
  const { list } = useWatchlist();
  if (!list.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.muted}>Nothing saved yet. Tap “+ My List” on any movie.</Text>
      </View>
    );
  return <Grid movies={list} />;
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  muted: { color: colors.muted, textAlign: "center" },
});
