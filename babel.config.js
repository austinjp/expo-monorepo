module.exports = {
  presets: [],
  plugins: [],
  overrides: [
    {
      test: [ /packages\/device\// ],
      presets: [
        "module:babel-preset-expo",
        "module:metro-react-native-babel-preset"
      ],
    },

    {
      // Many react-native libraries do not compile their ES6 JS.
      test: [ /node_modules\/react-native/ ],
      exclude: /node_modules\/react-native-web\//,
      presets: [
        "module:metro-react-native-babel-preset"
      ],
    }

    // NOTE DO NOT put anything for packages/web in here. It
    // Must go in packages/web/webpack.*.js.

  ]
}
