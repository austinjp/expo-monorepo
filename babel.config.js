module.exports = {
  "presets": [
    "module:babel-preset-expo",
  ],
  "env": {
    "production": {
      "plugins": [
        "transform-remove-console",
        [ '@babel/plugin-transform-react-jsx', { pragma: 'h' } ],
        'syntax-dynamic-import',
        // 'babel-plugin-transform-es2015-spread', // FIXME Still not working :(
        'transform-runtime', // FIXME Note this is in .babelrc!
        'transform-async-to-generator',
      ]
    }
  }
}
