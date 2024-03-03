const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

// Setup plugins
let plugins = [];

plugins.push(new CopyWebpackPlugin({
    patterns: [
        { from: path.resolve(__dirname, '..', 'static') }
    ]
}));
plugins.push(new MiniCSSExtractPlugin());

module.exports = {
    entry: {
        localeAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'localeAssets.js'),
        preloadAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'preloadAssets.js'),
        gameAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', 'gameAssets.js'),
        service: path.resolve(__dirname, '..', 'services', 'dev', 'dev.js'),
        game: path.resolve(__dirname, '..', 'src', 'index.js' ),
    },
    output:
    {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    devtool: 'source-map',
    plugins: plugins,

    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use:
                [
                    'html-loader'
                ]
            },

            // JS
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    { loader: "style-loader", options: { injectType: "styleTag" } },
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            }
        ]
    }
}
