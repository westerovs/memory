const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = {
  mode: 'production',
  entry: {
    localeAssets: path.resolve() + '/dist/localeAssets.js',
    preloadAssets: path.resolve() + '/dist/preloadAssets.js',
    gameAssets: path.resolve() + '/dist/gameAssets.js',
    service: path.resolve() + '/services/ironSource/ironsource.js',
    game: path.resolve() + '/dist/game.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title         : 'G5 Playable Ad',
      filename      : 'index.html',
      template      : `services/ironSource/index.html`,
      inject: 'body',
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
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/localeAssets/, /preloadAssets/, /gameAssets/, /service/,/game/])
  ]
}
