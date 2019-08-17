/**
 * @module build/dist
 *
 * Webpack configuration for building the browser-compatible
 * distribution of the library. This will result in a single
 * JS file and a single CSS file suitable for loading directly
 * in a web page, and can be served, e.g. by unpkg, jsdelivr,
 * cdnjs, etc.
 */

const webpack = require('webpack')
const merge = require('webpack-merge') // merge multiple webpack configs
const TerserPlugin = require('terser-webpack-plugin') // minifies JS
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // extracts CSS from JS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // minifies extracted CSS

// base this on the production webpack config
const base = require('./prod')
// get the package metadata from `package.json`
const pkg = require('../package.json')
// convert the package name to PascalCase
const libName = require('change-case').pascalCase(pkg.name)
// set the version
const version = process.env.VERSION || pkg.version

const builds = {
  development: {
    config: {
      devtool: 'source-map',
      mode: 'development',
      output: {
        filename: '[name].js',
        libraryTarget: 'umd',
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      ],
    },
  },
  production: {
    config: {
      mode: 'production',
      output: {
        filename: '[name].min.js',
        libraryTarget: 'umd',
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].min.css',
        }),
      ],
      performance: {
        hints: false,
      },
    },
    env: 'production',
  },
}

function genConfig (opts) {
  const config = merge({}, base, opts.config)

  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(opts.env || 'development'),
    }),
  ])

  if (opts.env) {
    config.plugins = config.plugins.concat([
      new webpack.BannerPlugin({
        banner: `/*!
* ${libName} v${version}
* Created by ${pkg.author}
* Released under the ${pkg.license} License.
*/     `,
        raw: true,
        entryOnly: true,
      }),
    ])
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: { removeAll: true },
            postcssZindex: false,
            reduceIdents: false,
          },
          canPrint: false,
        }),
      ],
    }
  }
  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  module.exports = Object.keys(builds).map(name => genConfig(builds[name]))
}
