const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const terser = require("terser-webpack-plugin")

const hashDigestLength = 20

module.exports = merge(common,{
  mode: "production",
  devtool: "source-map",
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new terser({
        terserOptions: {
          cache: false,
          extractComments: true,
          ie8: true,
          mangle: true,
          parallel: true,
          safari10: true,
          test: /\.(js|jsx)$/i
        }
      }),
    ],
  },

//     // FIXME Some of this could do with being re-enabled!
//     splitChunks: {
//       // minSize: 20000,
//       // maxSize: 30000,
//       // hidePathInfo: true,
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/,
//           name(module) {
//             // get the name. E.g. node_modules/packageName/not/this/part.js
//             // or node_modules/packageName
//             const plain_name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
//             return plain_name
//             // ... or MD5 it for a little obfuscation.
//             // return md5(module.context.match(plain_name).toString().substring(0,hashDigestLength)
//           },
//         },
//       },
//     },

})
