module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!**/*.d.ts',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: '<rootDir>/tsconfig.test.json',
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['<rootDir>/test/index.ts'],
  snapshotSerializers: [
    'jest-serializer-html',
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  testEnvironmentOptions: {
    omitJSDOMErrors: true,
  },
  transform: {
    '\\.(sass|scss)$': 'jest-css-modules',
    '.*\\.js$': 'babel-jest',
    '.*\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!vuetify)',
  ],
  verbose: true, // set to false unless debugging
}
