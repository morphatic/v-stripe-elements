/**
 * @module build/base
 *
 * Base webpack configuration for building the library. Used
 * by `build/dist` and `build/prod`.
 */

require('dotenv').config()

const os = require('os')
const HappyPack = require('happypack') // speeds up build by doing transforms in parallel
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extracts CSS from JS
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // just what the name implies

// is this a production build?
const isProd = process.env.NODE_ENV === 'production'

// create a thread pool for parallelizing transformations
exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4),
})

const cssLoaders = [
  { loader: MiniCssExtractPlugin.loader, options: { hmr: !isProd } },
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } },
]

const sassLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      fiber: require('fibers'),
      indentedSyntax: true,
    },
  },
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      fiber: require('fibers'),
      indentedSyntax: false,
    },
  },
]

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true,
  }),
  new MiniCssExtractPlugin(),
]

exports.config = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: sassLoaders,
      },
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
    ],
  },
  plugins,
  performance: {
    hints: false,
  },
  stats: { children: false },
}
