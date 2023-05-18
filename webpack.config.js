module.exports = {
  module: {
    rules: [
      // Outras configurações do Webpack
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
      // ...
    ],
  },
};