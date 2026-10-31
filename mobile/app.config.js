// Extends app.json. CI sets VERSION_CODE so every Play Store upload gets a higher number.
module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    versionCode: Number(process.env.VERSION_CODE || config.android?.versionCode || 1),
  },
});
