import { Stack, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import Focusable from "@/components/Focusable";
import { findFreeMovie, freeSourceUrl, freeVideoUrl } from "@/lib/free";
import { colors } from "@/lib/theme";
import { isTV } from "@/lib/tv";

export default function Watch() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = findFreeMovie(id);
  const player = useVideoPlayer(movie ? freeVideoUrl(movie) : null, (p) => p.play());

  if (!movie)
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Movie not found.</Text>
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <Stack.Screen options={{ title: movie.title, headerTransparent: false }} />
      <VideoView
        player={player}
        style={styles.video}
        nativeControls
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
        contentFit="contain"
        hasTVPreferredFocus
      />
      <View style={styles.body}>
        <Text style={styles.title}>{movie.title} <Text style={styles.muted}>({movie.year})</Text></Text>
        <Text style={styles.muted}>{movie.runtime} min · {movie.license}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Focusable onPress={() => Linking.openURL(freeSourceUrl(movie))} style={{ alignSelf: "flex-start", padding: 4 }}>
          <Text style={styles.link}>Streaming from the Internet Archive →</Text>
        </Focusable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  video: { width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000", maxHeight: isTV ? 560 : undefined },
  body: { padding: isTV ? 48 : 16, gap: 6 },
  title: { color: colors.text, fontSize: isTV ? 34 : 22, fontWeight: "800" },
  muted: { color: colors.muted },
  overview: { color: "#D6DBE4", lineHeight: 22, marginTop: 8 },
  link: { color: colors.muted, marginTop: 8 },
});
