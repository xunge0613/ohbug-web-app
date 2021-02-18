import path from 'path'

// @ts-ignore
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

// 按需加载
const dynamicImport = {
  loading: '@/components/styles/Loading',
}

// 忽略 moment 的 locale 文件
const ignoreMomentLocale = true

// 配置是否让生成的文件包含 hash 后缀
const hash = true

const chainWebpack = (memo: any) => {
  // 使用 dayjs 替换 moment.js
  memo.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin)

  memo.module
    .rule('lint')
    .test(/\.(ts|tsx)$/)
    .pre()
    .include.add(path.resolve(__dirname, 'src'))
    .end()
    .use('eslint')
    .loader(require.resolve('eslint-loader'))
}

// 开启 TypeScript 编译时类型检查
const forkTSChecker = {}

// node_modules 下的文件不走 babel 编译
const nodeModulesTransform = {
  type: 'none',
  exclude: [],
}

// 开发环境禁用 sourcemap
const devtool =
  process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map'

const lessLoader = {
  lessOptions: {
    javascriptEnabled: true,
  },
}

const externals = {
  echarts: 'window.echarts',
  react: 'window.React',
  'react-dom': 'window.ReactDOM',
}
const { ENV_TAG } = process.env
const scripts =
  ENV_TAG === 'development'
    ? [
        'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.js',
        'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.development.js',
        'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.development.js',
      ]
    : [
        'https://cdn.jsdelivr.net/npm/echarts@4.8.0/dist/echarts.min.js',
        'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js',
        'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js',
      ]

const build = {
  dynamicImport,
  ignoreMomentLocale,
  hash,
  chainWebpack,
  forkTSChecker,
  nodeModulesTransform,
  devtool,
  lessLoader,
  externals,
  scripts,
}

export default build
