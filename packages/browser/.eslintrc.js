module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    tsconfigRootDir: './',
  },
  rules: {
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  globals: {
    DEBUG: true,
  },
  ignorePatterns: ['**/*.js', '!src'],
};
