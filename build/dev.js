/**
 * @module build/dev
 *
 * Webpack configuration for building the development distribution
 * of the library. This is the version that gets watched and
 * updated in real time during development.
 */

const path = require('path')
const merge = require('webpack-merge') // merge multiple webpack configs
const HappyPack = require('happypack') // speeds up build by doing transforms in parallel
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // parallel thread type-checker
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const { VuetifyProgressiveModule } = require('vuetify-loader')
const { config: baseWebpackConfig, happyThreadPool } = require('./base')

// Helpers
const resolve = file => path.resolve(__dirname, file)

// lib metadata
const libName = require('change-case').pascalCase(require('../package.json').name)

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
  entry: ['core-js/stable', './dev/index.js'],
  output: {
    filename: '[name].js',
    path: resolve('../dev'),
    publicPath: '/dev/',
    library: libName,
  },
  resolve: {
    alias: {
      vuetify: 'vuetify/lib',
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            modules: [VuetifyProgressiveModule],
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        oneOf: [
          {
            test: /\.(png|jpe?g|gif)$/,
            resourceQuery: /vuetify-preload/,
            use: [
              'vuetify-loader/progressive-loader',
              {
                loader: 'url-loader',
                options: { limit: 8000 },
              },
            ],
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: resolve('../dev'),
    publicPath: '/dev/',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    disableHostCheck: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: resolve('../tsconfig.json'),
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            happyPackMode: true,
          },
        },
        'eslint-loader?cache=true?emitWarning=true',
      ],
    }),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader', 'eslint-loader?cache=true?emitWarning=true'],
    }),
  ],
})
