module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
  ],
};
