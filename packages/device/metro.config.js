const { createReactNativeConfiguration } = require('expo-yarn-workspaces');
const {getDefaultConfig} = require('metro-config');
const { mergeConfig } = require("metro-config");

const crn = createReactNativeConfiguration(__dirname);

const cfg = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    resolver: {
      // assetExts: [assetExts, 'txt', 'xml', 'png', 'jpg', 'pb', 'tflite'],
      sourceExts: [...sourceExts, "js", "jsx"],
    },
    transformer: {
      babelTransformerPath: require.resolve("metro-babel-transformer"),
      assetRegistryPath: "./assets/",
    },
  };
})();

module.exports = mergeConfig(crn,cfg);
