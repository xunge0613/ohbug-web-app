export default {
  '/api': {
    target: 'http://localhost:6666/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
