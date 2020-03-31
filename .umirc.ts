import { defineConfig } from 'umi'
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

export default defineConfig({
  routes: [
    { exact: true, path: '/', redirect: '/project' },
    {
      exact: true,
      path: '/dashboard',
      component: '@/pages/Dashboard',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/project',
      component: '@/pages/Project',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/issue',
      component: '@/pages/Issue',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/event',
      component: '@/pages/Event',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/event/:target',
      component: '@/pages/Event/Detail',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/feedback',
      component: '@/pages/Feedback',
      wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/login',
      component: '@/pages/Login',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      exact: true,
      path: '/create-organization',
      component: '@/pages/CreateOrganization',
      wrappers: ['@/wrappers/auth'],
    },
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:6666/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  // 按需加载
  dynamicImport: {
    loading: '@/components/Loading',
  },

  chainWebpack(memo) {
    // 使用 dayjs 替换 moment.js
    memo.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin)
  },

  // 开启 TypeScript 编译时类型检查
  forkTSCheker: {},
  // 忽略 moment 的 locale 文件
  ignoreMomentLocale: true,

  // 包模块结构分析
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },

  // 配置是否让生成的文件包含 hash 后缀
  hash: true,
})
