const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const ip = require('ip')
const portFinderSync = require('portfinder-sync')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackShellPluginNext = require("webpack-shell-plugin-next");

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

// Setup scripts
const scripts = [
  `node ${'bundler' + path.sep + 'createAssetList.js'} --src assets/game/ --listName gameAssets --fileName gameAssets`,
  `node ${'bundler' + path.sep + 'createAssetList.js'} --src assets/preload/ --listName preloadAssets --fileName preloadAssets --toBase64 true`,
  `node ${'bundler' + path.sep + 'createAssetList.js'} --src strings/ --listName localeAssets --fileName localeAssets`,
];

// Setup plugins
let plugins = [];

plugins.push(new WebpackShellPluginNext({
  onBuildStart:{
    scripts: scripts,
    blocking: true,
    parallel: false
  },
  // onBuildEnd:{
  //     scripts: ['echo "Webpack End"'],
  //     blocking: false,
  //     parallel: true
  // }
}));

plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '..', 'services', 'g5mmg', 'index.html'),
    minify: false
  })
)

module.exports = merge(
    commonConfiguration,
    {
      entry: {
        localeAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'localeAssets.js'),
        preloadAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'preloadAssets.js'),
        gameAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'gameAssets.js'),
        service: path.resolve(__dirname, '..', 'services', 'g5mmg', 'g5mmg.js'),
        game: path.resolve(__dirname, '..', 'src', 'index.js' ),
      },
        stats: 'errors-warnings',
        mode: 'development',
        infrastructureLogging:
        {
            level: 'warn',
        },
        plugins: plugins,
        devServer:
        {
            host: 'local-ip',
            port: portFinderSync.getPort(8080),
            open: true,
            https: false,
            allowedHosts: 'all',
            hot: false,
            watchFiles: ['src/**', 'static/**'],
            static:
            {
                watch: true,
                directory: path.join(__dirname, '../static')
            },
            client:
            {
                logging: 'none',
                overlay: true,
                progress: false
            },
            onAfterSetupMiddleware: function(devServer)
            {
                const port = devServer.options.port
                const https = devServer.options.https ? 's' : ''
                const localIp = ip.address()
                const domain1 = `http${https}://${localIp}:${port}`
                const domain2 = `http${https}://localhost:${port}`

                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)
            }
        }
    }
)
