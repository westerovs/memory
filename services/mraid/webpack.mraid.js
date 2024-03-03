const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

const webpack = require('webpack')

const projectCode = require(path.resolve(__dirname,`../../package.json`)).name.slice(0, 3)
const links = require(path.resolve(__dirname,`./links.json`))[projectCode]
console.log('PROJECT_CODE: ', projectCode)
console.log('LINKS: ', links)

module.exports = {
  mode: 'production',
  entry: {
    localeAssets: path.resolve() + '/dist/localeAssets.js',
    preloadAssets: path.resolve() + '/dist/preloadAssets.js',
    gameAssets: path.resolve() + '/dist/gameAssets.js',
    game: path.resolve() + '/dist/game.js',
    service: path.resolve() + '/services/mraid/mraid.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title         : 'G5 Playable Ad',
      filename      : 'index.html',
      template      : `services/mraid/index.html`,
      inject: 'body',
      scriptLoading: 'blocking',
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
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/localeAssets/, /preloadAssets/, /gameAssets/, /service/,/game/]),
    new webpack.DefinePlugin({
      __GPLINK: JSON.stringify(links.googlePlay),
      __APPSTORELINK: JSON.stringify(links.appStore),
    })
  ]
}
