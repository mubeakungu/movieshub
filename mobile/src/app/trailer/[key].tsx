import { Stack, useLocalSearchParams } from "expo-router";
import { createElement } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

/** Plays a YouTube trailer inside the app instead of handing off to the YouTube app. */
export default function Trailer() {
  const { key, title } = useLocalSearchParams<{ key: string; title?: string }>();
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(key)}?autoplay=1&playsinline=1&rel=0`;

  // YouTube's embedded player needs a page origin, so the iframe is wrapped in a small HTML page.
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;height:100%;background:#000}iframe{position:absolute;inset:0;width:100%;height:100%;border:0}</style></head>
<body><iframe src="${src}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></body></html>`;

  return (
    <View style={styles.wrap}>
      <Stack.Screen options={{ title: title || "Trailer", headerTransparent: false }} />
      {Platform.OS === "web" ? (
        createElement("iframe", { src, allow: "autoplay; encrypted-media; fullscreen", allowFullScreen: true, style: { border: 0, width: "100%", height: "100%" } })
      ) : (
        <WebView
          source={{ html, baseUrl: "https://reel.app" }}
          style={styles.web}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#000" },
  web: { flex: 1, backgroundColor: "#000" },
});
