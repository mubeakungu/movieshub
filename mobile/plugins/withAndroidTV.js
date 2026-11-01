// Makes the Android build installable and launchable on Android TV / Google TV:
// - declares touchscreen and leanback as optional features
// - adds the LEANBACK_LAUNCHER category so the app shows on the TV home screen
// - sets the TV home-screen banner (assets/tv-banner.png, 320x180)
const fs = require("fs");
const path = require("path");
const { withAndroidManifest, withDangerousMod } = require("expo/config-plugins");

function ensureFeature(manifest, name) {
  manifest["uses-feature"] = manifest["uses-feature"] || [];
  if (!manifest["uses-feature"].some((f) => f.$["android:name"] === name)) {
    manifest["uses-feature"].push({ $: { "android:name": name, "android:required": "false" } });
  }
}

const withTVManifest = (config) =>
  withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    ensureFeature(manifest, "android.hardware.touchscreen");
    ensureFeature(manifest, "android.software.leanback");

    const app = manifest.application[0];
    app.$["android:banner"] = "@drawable/tv_banner";

    const main = app.activity.find((a) => a.$["android:name"] === ".MainActivity");
    const launcherFilter = main["intent-filter"].find((f) =>
      (f.action || []).some((a) => a.$["android:name"] === "android.intent.action.MAIN"),
    );
    launcherFilter.category = launcherFilter.category || [];
    if (!launcherFilter.category.some((c) => c.$["android:name"] === "android.intent.category.LEANBACK_LAUNCHER")) {
      launcherFilter.category.push({ $: { "android:name": "android.intent.category.LEANBACK_LAUNCHER" } });
    }
    return cfg;
  });

const withTVBanner = (config) =>
  withDangerousMod(config, [
    "android",
    async (cfg) => {
      const dir = path.join(cfg.modRequest.platformProjectRoot, "app/src/main/res/drawable");
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(path.join(cfg.modRequest.projectRoot, "assets/tv-banner.png"), path.join(dir, "tv_banner.png"));
      return cfg;
    },
  ]);

module.exports = (config) => withTVBanner(withTVManifest(config));
