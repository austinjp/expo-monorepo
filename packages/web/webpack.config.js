const path = require("path")
const webpack = require("webpack")

const fs = require('graceful-fs')
const realFs = require('fs')
fs.gracefulify(realFs)

externals = {
  fs: fs
}

module.exports = {
  entry: "./src/index.js",
  externals: externals,
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        // See babel.config.js
      },
    }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryExport: 'default',
    globalObject: 'this',
  },

  // resolve: {
  //   alias: {
  //     'react': 'preact',
  //     // 'react-dom': 'preact-compat',
  //   },
  // },
}
