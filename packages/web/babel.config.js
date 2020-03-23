const plugins = [
  "transform-remove-console",
  [ '@babel/transform-react-jsx', { pragma: 'h' } ],
  '@babel/syntax-dynamic-import',
  // 'babel-plugin-transform-es2015-spread', // FIXME Still not working :(
  '@babel/transform-runtime', // FIXME Note this is in .babelrc!
  '@babel/transform-async-to-generator',
]

module.exports = {
  "presets": [ /* "expo", */ ],
  "env": {
    "development": {
      "plugins": plugins
    },
    "production": {
      "plugins": plugins
    }
  }
}
