module.exports = function(api){

  let cfg = {
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

      // NOTE DO NOT put anything for packages/web in here.
      // See packages/web/webpack.*.js for reasons
      // and use the conditional approach below.

    ]
  };

  // Use this approach for conditional configs
  // to tweak cfg before returning.
  const _ = api.caller((c) => {
    // c.name could be "@babel/cli" or "babel-loader" currently.
    // c.target would be "web" or ...??
    // if c.target == "web" { cfg.whatever = { ... } }
  });


  return cfg;
}
