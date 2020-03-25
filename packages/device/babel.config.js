const presets = [ "expo" ]

const plugins = [
  "transform-remove-console",
  [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
  '@babel/syntax-dynamic-import',
  '@babel/transform-runtime',
  '@babel/transform-async-to-generator',
]

module.exports = {
  "presets": presets,
  "env": {
    "production": {
      "plugins": plugins
    }
  },
  "env": {
    "development": {
      "plugins": plugins
    }
  }
}
