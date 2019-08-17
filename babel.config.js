// get the current build environment
const env = process.env.NODE_ENV

// export the babel configuration
module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
  ],
  plugins: [],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: true },
        }],
      ],
    },
    es5: {
      presets: ['@babel/preset-env'],
    },
    lib: {
      presets: [
        ['@babel/preset-env', {
          targets: 'last 1 chrome version',
          modules: false,
        }],
      ],
    },
  },
}

if (['lib', 'es5'].includes(env)) {
  module.exports.plugins.push('./build/sass.js')
}

if (env !== 'lib') {
  module.exports.plugins.push('@babel/plugin-proposal-object-rest-spread')
}
