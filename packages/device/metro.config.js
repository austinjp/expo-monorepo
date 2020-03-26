const { createReactNativeConfiguration } = require('expo-yarn-workspaces');
const {getDefaultConfig} = require('metro-config');
const { mergeConfig } = require("metro-config");

// This provides "expo-keep-awake" (plus other things, probably).
const crn = createReactNativeConfiguration(__dirname);

const cfg = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: [...assetExts, 'txt', 'xml', 'png', 'jpg', 'pb', 'tflite','ttf'],
      sourceExts: [...sourceExts, "js", "jsx"],
    },
    transformer: {
      babelTransformerPath: require.resolve("metro-babel-transformer"),
      assetRegistryPath: [
        "./assets/",
        "./assets/fonts/",
        "./assets/images/",
      ],
    },
  };
})();

module.exports = mergeConfig(crn,cfg);
