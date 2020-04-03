export default {
  '/api': {
    target: 'http://ohbug.io/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
