const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    localeAssets: path.resolve( 'dist', 'localeAssets.js'),
    preloadAssets: path.resolve('dist', 'preloadAssets.js'),
    gameAssets: path.resolve( 'dist', 'gameAssets.js'),
    service: path.resolve('services', 'adwords', 'adwords.js'),
    game: path.resolve('dist', 'game.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title         : 'G5 Playable Ad',
      filename      : 'index.html',
      template      : path.resolve(__dirname, '..', '..', 'services', 'adwords', 'index.html'),
      minify        : {
        html5                : true,
        minifyCSS            : false,
        minifyJS             : false,
        minifyURLs           : false,
        collapseWhitespace   : false,
        removeComments       : false,
        removeAttributeQuotes: false,
        removeEmptyAttributes: true,
      },
      hash: false,
    }),
  ]
}
