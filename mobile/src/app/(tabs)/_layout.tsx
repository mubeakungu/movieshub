import { Tabs } from "expo-router/js-tabs";
import { Text, type ColorValue } from "react-native";
import { colors } from "@/lib/theme";

const icon = (glyph: string) => ({ color }: { color: ColorValue }) => <Text style={{ color, fontSize: 18 }}>{glyph}</Text>;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.bg, borderTopColor: "#FFFFFF14" },
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Reel", tabBarLabel: "Home", tabBarIcon: icon("⌂") }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: icon("⌕") }} />
      <Tabs.Screen name="my-list" options={{ title: "My List", tabBarIcon: icon("♥") }} />
    </Tabs>
  );
}
