const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const copyPlugin = require("copy-webpack-plugin")

// remember to update version in files in /static and /public
const version = (process.env.VERSION || 1)

const cacheGroupsOptions = {chunks: "all", minSize: 0, minChunks: 1, reuseExistingChunk: true, enforce: true}

const hashFunction = 'sha512'

let cfg = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // See babel.config.js
          options: {
            // We need Pract pragma "h" to only ever be applied
            // by Webpack when building for web. This requires
            // babel to parse packages/shared -- but if we put
            // that into babel.config.js it will apply pragma h
            // for all builds including non-web (i.e. React
            // Native) builds. So it must remain only here.
            rootMode: "upward",
            presets: [
              // "@babel/preset-react",
              // "@babel/preset-flow",
              "module:metro-react-native-babel-preset",
              // "@babel/preset-env", // { targets: { browsers: [ "last 3 versions" ] } } ],
            ],
            plugins: [
              // '@babel/plugin-transform-react-jsx',
              [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
              // '@babel/plugin-syntax-dynamic-import',
              // '@babel/plugin-transform-spread',
              // '@babel/plugin-transform-runtime',
              // '@babel/plugin-transform-async-to-generator',
              // '@babel/plugin-transform-flow-strip-types',
              // '@babel/plugin-proposal-class-properties',
            ]
          }
        },
      },
      {
        // Many react-native libraries do not compile their ES6 JS.
        test: [ /node_modules\/react-native/ ],
        exclude: /node_modules\/react-native-web\//,
        use: {
          loader: "babel-loader", // See babel.config.js
          options: {
            rootMode: "upward",
          }
        }
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryExport: 'default',
    globalObject: 'this',
  },

  optimization: {
    splitChunks: {
      automaticNameDelimiter: '/',
      maxInitialRequests: Infinity,
      // minSize: 20000,
      // maxSize: 100000,
      chunks: 'all',
      // name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. e.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const plain_name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return "vendor/" + plain_name
          },
          ...cacheGroupsOptions
        },
      },
    },
    occurrenceOrder: true,
  },

  plugins: [

    // new webpack.HotModuleReplacementPlugin() // this breaks contenthash :(

    new webpack.DefinePlugin({
      process: {
        // Node version is necessary because some modules seem to destroy it,
        // and other modules down-stream can expect it.
        version: JSON.stringify(version),
        env: { VERSION: JSON.stringify(version) }
      }
    }),

    new htmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),

    new copyPlugin([{
      from: "static",
    }]),

    // Ensure file hashes don't change unexpectedly
    new webpack.HashedModuleIdsPlugin({
      hashFunction: hashFunction,
    }),
  ],

  resolve: {
    extensions: [
      // Note, the ".android.js" and ".ios.js" are necessary because react-native
      // includes libraries with files ending in these extensions, and webpack
      // fails to resolve them. The issue is inside webpack/lib/WebpackOptionsDefaulter.js
      // which simply adds a fixed list of extensions onto the root filename. These
      // extensions are listed here, plus the android and ios variants.
      ".wasm", ".mjs", ".js", ".json", ".android.js", ".ios.js"
    ],
    alias: {
      "react-native$": "react-native-web/dist/index.js",
      "react$": "preact/compat",
      "react-dom/test-utils$": "preact/test-utils",
      "react-dom$": "preact/compat", // Must be below test-utils
      "react-dom/unstable-native-dependencies$": "preact-responder-event-plugin",
    },
  },
}

module.exports = cfg
