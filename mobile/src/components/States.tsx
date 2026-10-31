import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { hasApiKey } from "@/lib/tmdb";
import { colors } from "@/lib/theme";

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.accent} size="large" />
    </View>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Couldn’t load movies</Text>
      <Text style={styles.muted}>Check your connection or TMDB token.</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>Try again</Text>
      </Pressable>
    </View>
  );
}

export function SampleBanner() {
  if (hasApiKey) return null;
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Sample data. Set EXPO_PUBLIC_TMDB_READ_TOKEN to load real movies.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, padding: 24, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 18, fontWeight: "700" },
  muted: { color: colors.muted },
  btn: { marginTop: 10, backgroundColor: "#FFFFFF1F", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: colors.text, fontWeight: "600" },
  banner: { backgroundColor: "#FF4D5A22", borderColor: "#FF4D5A55", borderWidth: 1, margin: 16, marginBottom: 0, padding: 10, borderRadius: 8 },
  bannerText: { color: colors.text, fontSize: 13 },
});
