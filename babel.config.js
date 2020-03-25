const presets = [ "@babel/preset-react" ]

const plugins = [
  '@babel/syntax-dynamic-import',
  '@babel/transform-runtime',
  '@babel/transform-async-to-generator',
  "transform-remove-console",
  [
    '@babel/transform-react-jsx', { pragma: 'h' }
  ],
  '@babel/react-jsx'
]

module.exports = {
  "presets": presets,
  "env": {
    "development": {
      "plugins": plugins
    },
    "production": {
      "plugins": plugins
    }
  }
}
