const {createList} = require('../utils/createList.js')
const {merge} = require("webpack-merge");
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');
const fs = require("fs");

const commonConfiguration = require("./webpack.common.js");
const facebookConfiguration = require("../services/facebook/webpack.facebook.js");
const molocoConfiguration = require("../services/moloco/webpack.moloco.js");
const adWordsConfiguration = require("../services/adWords/webpack.adwords.js");
const mraidConfiguration = require("../services/mraid/webpack.mraid.js");
const vungleConfiguration = require('../services/vungle/webpack.vungle.js');
const g5mmgConfiguration = require("../services/g5mmg/webpack.g5mmg.js");
const ironSourceConfiguration = require("../services/ironSource/webpack.ironSource.js");
const mintegralConfiguration = require("../services/mintegral/webpack.mintegral.js");
const createZip = require("../utils/zipUtil.js");
const packageJSON = require("../package.json");

start();

async function start() {

  // 1. Собираем ассет листы
  console.log('create gameAssets')
  await createList('assets/game/', 'gameAssets', 'gameAssets',true)
  console.log('create preloadAssets')
  await createList('assets/preload/', 'preloadAssets', 'preloadAssets',true)
  // await createList(`strings/en/`, 'localeAssets', 'localeAssets',true)
  // 2. Собираем локализации
  // ['en', 'ge',...]
  const locales = getLocales(path.resolve(__dirname, '..', 'static', 'strings'));
  console.log('locales', locales)
  for (let i = 0; i < locales.length; i++) {
    await createList(`strings/${locales[i]}/`, 'localeAssets', locales[i],true)
  }

  // 2. Собираем общий бандл в dist
  const errors = await commonBuild()
  if (errors) {
    console.log('errors', errors)
    return;
  }
  console.log('the common prod bundle has been created')


  // 4. Список конфигов под сетки
  const services = {
    // 2mb
    PLAY2: facebookConfiguration,      // 2mb Facebook
    // PLAY4: mraidConfiguration,      // 2mb Liftoff

    //3mb
    // PLAY15: mraidConfiguration,     // 3mb Chartboost

    // 5mb
    // PLAY1: adWordsConfiguration,    // Adwords
    // PLAY3: ironSourceConfiguration, // ironSource
    // PLAY5: vungleConfiguration,     // Vungle
    // PLAY6: mraidConfiguration,
    // PLAY9: mintegralConfiguration   // mintegral
    // PLAY12: mraidConfiguration,     // Unity
    // PLAY16: adWordsConfiguration,
    // PLAY17: molocoConfiguration,    // Moloco
    // g5mmg: g5mmgConfiguration,      // MMG
  }

  // 5. Cоздаем массив конфигов сборок для webpack
  const configs = [];
  for (const serviceName in services) {
    locales.forEach((locale) => {

      configs.push(merge(services[serviceName], {
        entry: {
          localeAssets: path.resolve(__dirname, '..', 'src', 'Game', 'assetsLists', `${locale}.js`),
        },
        output: {
          filename: '[name].js',
          path: path.resolve(__dirname, '..', 'builds', `${serviceName}`, `${locale}`)
        },
      }))
    })
  }

  // 6. Собираем билды под сетки
  await new Promise((resolve, reject) => {
    webpack(configs, (err, stats) => {
      if (err) {
        console.log(err);
        reject();
        return;
      }
      resolve();
    })
  })

  // 7. Архивируем
  const packageJSON = await require('../package.json')
  const locale = 'en'
  const tests = {
    PLAY1: /\.(js|html)$/,    // Adwords
    PLAY2: /\.(html)$/,   // Facebook
    PLAY4: /\.(html)$/,
    PLAY5: /\.(html)$/,     // Vungle
    PLAY6: /\.(html)$/,
    PLAY12: /\.(html)$/,     // Unity
    PLAY15: /\.(html)$/,     // Chartboost
    PLAY16: /\.(js|html)$/,
    PLAY17: /\.(html)$/,  // Moloco
    g5mmg: /\.(html)$/,   //
    PLAY3: /\.(html)$/,
    PLAY9: /\.(html)$/
  }
  const sizesOf = {
    PLAY1: /\.(zip)$/,    // Adwords
    PLAY2: /\.(html)$/,
    PLAY4: /\.(html)$/,
    PLAY5: /\.(zip)$/,     // Vungle
    PLAY12: /\.(html)$/,     // Unity
    PLAY6: /\.(html)$/,
    PLAY15: /\.(html)$/,     // Chartboost
    PLAY16: /\.(zip)$/,
    PLAY17: /\.(html)$/,  // Moloco
    g5mmg: /\.(html)$/,   //
    PLAY3: /\.(html)$/,
    PLAY9: /\.(html)$/
  }
  const project = packageJSON.name.split('.')
  const output = `${project[0]}_nob_playable_${project[1]}_${locale}_any_!D!kb`

  for (const folder in services) {
    for (const locale1 of locales) {
      await createZip(folder, locale1, tests[folder], output, sizesOf[folder])
    }
  }

  // 8. удаляем лишние файлы
  for (const folder in services) {
    locales.forEach((locale) => {
      const dir = path.resolve(__dirname, '..', 'builds', folder, locale)
      let files = fs.readdirSync(dir)
      console.log('удаляем файлы в папке', dir)
      files = files.filter((filename) => !(/\.(zip)$/.test(filename)))
      console.log(files)
      files.forEach(file => {
        fs.unlinkSync(dir + path.sep + file)
      })
    })
  }
}

function getBundleConfig() {
  return merge(commonConfiguration,{
    mode: 'production',
    // devtool: 'source-map',
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart:{
          scripts: ['echo "Start prepare bundle"'],
          blocking: true,
          parallel: false
        },
        onBuildEnd:{
          scripts: ['echo "Finish prepare bundle"'],
          blocking: true,
          parallel: false
        }
      }),
      new HtmlWebpackPlugin({
        title: 'G5 Playable Ad',
        inject: true,
        template: path.resolve(__dirname, '..', 'services', 'dev', 'index.html'),
        minify: {
          html5: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: false,
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: false,
          removeEmptyAttributes: false,
        },
        hash: false,
      }),
      new CleanWebpackPlugin()
    ]
  })
}

function commonBuild() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(getBundleConfig());
    compiler.run((err, stats) => { // [Stats Object](#stats-object)
      if (err) {
        console.log(err)
        reject(err)
        return;
      }
      console.log(stats);
      compiler.close((closeErr) => {
        if (closeErr) {
          console.log(closeErr)
          reject(closeErr);
          return;
        }
        resolve(null)
      });
    });
  })
}

function getLocales(stringsDir) {
  return fs.readdirSync(stringsDir)
    .filter((file) => {
      const stat = fs.statSync(path.resolve(stringsDir, file))
      return stat.isDirectory();
    })
}
