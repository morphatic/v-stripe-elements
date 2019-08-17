/**
 * @module build/prod
 * 
 * Webpack configuration for building the production distribution
 * of the library.
 */

const merge = require('webpack-merge') // merge multiple webpack configs
/**
 * TODO: Figure out if we want to keep HappyPack. Is it necessary for such a small library?
 */
const HappyPack = require('happypack') // speeds up build by doing transforms in parallel
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // parallel thread type-checker
const { config: baseWebpackConfig, happyThreadPool } = require('./base')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: 'VStripeInput', // do we need this???
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    vuetify: {
      commonjs: 'vuetify',
      commonjs2: 'vuetify',
      amd: 'vuetify',
      root: 'Vuetify'
    }
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: 'happypack/loader?id=scripts',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'scripts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: { happyPackMode: true }
        }
      ]
    })
  ]
})
