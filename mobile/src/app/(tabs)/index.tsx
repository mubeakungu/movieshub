import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Focusable from "@/components/Focusable";
import { isTV } from "@/lib/tv";
import Row from "@/components/Row";
import FreeCard from "@/components/FreeCard";
import { FREE_MOVIES } from "@/lib/free";
import { FlatList } from "react-native";
import { ErrorState, Loading, SampleBanner } from "@/components/States";
import { LIST_TITLES, getList, img, year, type ListKey } from "@/lib/tmdb";
import { colors } from "@/lib/theme";
import { useAsync } from "@/lib/useAsync";

const KEYS = Object.keys(LIST_TITLES) as ListKey[];

export default function Home() {
  const { data, error, loading, reload } = useAsync(
    async () => Object.fromEntries(await Promise.all(KEYS.map(async (k) => [k, (await getList(k)).results] as const))),
    [],
  );

  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorState onRetry={reload} />;

  const hero = data.now_playing.find((m) => m.backdrop_path) || data.now_playing[0];
  const backdrop = hero ? img(hero.backdrop_path, "w780") : null;

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} tintColor={colors.accent} />}
    >
      <SampleBanner />
      {hero && (
        <Focusable
          onPress={() => router.push({ pathname: "/movie/[id]", params: { id: String(hero.id) } })}
          style={styles.hero}
          focusStyle={{ transform: [], borderWidth: 2 }}
          hasTVPreferredFocus
        >
          {backdrop && <Image source={backdrop} style={StyleSheet.absoluteFill} contentFit="cover" />}
          <LinearGradient colors={["transparent", colors.bg]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroBody}>
            <Text style={styles.pill}>New in theaters</Text>
            <Text style={styles.heroTitle}>{hero.title}</Text>
            <Text style={styles.meta}>{year(hero.release_date)} · ★ {hero.vote_average.toFixed(1)}</Text>
          </View>
        </Focusable>
      )}
      {KEYS.map((k, i) => (
        <View key={k}>
          <Row title={LIST_TITLES[k]} movies={data[k]} />
          {i === 0 && (
            <View style={{ marginTop: 22 }}>
              <Text style={styles.rowTitle}>Watch Free: full movies</Text>
              <FlatList
                horizontal
                data={FREE_MOVIES}
                keyExtractor={(m) => m.id}
                renderItem={({ item }) => <FreeCard movie={item} />}
                contentContainerStyle={{ gap: isTV ? 20 : 12, paddingHorizontal: isTV ? 48 : 16, paddingVertical: isTV ? 16 : 6 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      ))}
      <Text style={styles.credit}>
        Movie data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
        Streaming availability by JustWatch.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 0, borderWidth: 0, height: isTV ? 420 : 280, justifyContent: "flex-end", backgroundColor: colors.panel },
  heroBody: { padding: isTV ? 48 : 16, maxWidth: 900 },
  pill: { alignSelf: "flex-start", color: colors.text, fontSize: 11, backgroundColor: "#FFFFFF22", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, overflow: "hidden" },
  heroTitle: { color: colors.text, fontSize: isTV ? 48 : 30, fontWeight: "800", marginTop: 8 },
  meta: { color: colors.muted, marginTop: 4 },
  rowTitle: { color: colors.text, fontSize: isTV ? 24 : 18, fontWeight: "700", marginBottom: 10, paddingHorizontal: isTV ? 48 : 16 },
  credit: { color: colors.muted, fontSize: 11, paddingHorizontal: isTV ? 48 : 16, marginTop: 28, lineHeight: 16 },
});
