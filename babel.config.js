module.exports = {
  presets: [
    ["@babel/env"]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3,
        "version": "^7.16.5"
      }
    ]
  ]
}