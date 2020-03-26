const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common,{
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      process: { env: {
        __DEV__: false,
        NODE_ENV: '"development"',
      } }
    })
  ]
})
