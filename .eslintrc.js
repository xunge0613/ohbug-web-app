module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    require.resolve('@umijs/fabric/dist/eslint'),
  ],
  rules: {
    'no-new': 'off',
    'import/no-unresolved': 'off',
    'no-nested-ternary': 'off',
    'global-require': 'off',
  },
};
