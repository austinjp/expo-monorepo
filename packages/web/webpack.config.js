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
        // options: {
        //   presets: [
        //     [ '@babel/preset-env', { targets: { browsers: [ "last 3 versions" ] } } ],
        //     '@babel/preset-react',
        //     // 'babel-preset-stage-0' // FIXME Note this is in .babelrc!
        //   ],
        //   plugins: [
        //     [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
        //     '@babel/plugin-syntax-dynamic-import',
        //     // 'babel-plugin-transform-es2015-spread', // FIXME Still not working :(
        //     // 'babel-plugin-transform-runtime' // FIXME Note this is in .babelrc!
        //     // 'babel-plugin-transform-async-to-generator',
        //   ]
        // },
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
