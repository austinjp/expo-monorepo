module.exports = {
  "presets": [
    "module:babel-preset-expo",
  ],
  "env": {
    "production": {
      "plugins": [
        "transform-remove-console",
        [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
        '@babel/plugin-syntax-dynamic-import',
        // 'babel-plugin-transform-es2015-spread', // FIXME Still not working :(
        '@babel/plugin-transform-runtime', // FIXME Note this is in .babelrc!
        '@babel/plugin-transform-async-to-generator',
      ]
    }
  }
}
