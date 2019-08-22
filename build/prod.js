/**
 * @module build/prod
 *
 * Webpack configuration for building the production distribution
 * of the library.
 */

const merge = require('webpack-merge') // merge multiple webpack configs
const HappyPack = require('happypack') // speeds up build by doing transforms in parallel
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // parallel thread type-checker
const { config: baseWebpackConfig, happyThreadPool } = require('./base')

// Helpers
const resolve = file => require('path').resolve(__dirname, file)

// lib metadata
const pkg = require('../package.json')
const libName = require('change-case').pascalCase(pkg.name)

module.exports = merge(baseWebpackConfig, {
  entry: {
    [pkg.name]: './src/index.ts',
  },
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    library: libName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: 'happypack/loader?id=scripts',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true,
    //   tsconfig: resolve('../tsconfig.json'),
    // }),
    new HappyPack({
      id: 'scripts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: { happyPackMode: true },
        },
      ],
    }),
  ],
})
