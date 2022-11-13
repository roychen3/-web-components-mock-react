module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
  ignorePatterns: ['**/*.html', '**/*.scss', '**/src/images/**'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['MockApiData', './mockApiData/'],
          ['Src', './src'],
          ['Utils', './src/utils'],
          ['Components', './src/components'],
          ['Images', './src/images'],
          ['ModalPages', './src/modalPages'],
          ['Pages', './src/pages'],
        ],
      },
    },
  },
};
