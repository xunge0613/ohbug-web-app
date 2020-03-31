import path from 'path';
// eslint-disable-next-line
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

// 按需加载
const dynamicImport = {
  loading: '@/components/Loading',
};

// 忽略 moment 的 locale 文件
const ignoreMomentLocale = true;

// 配置是否让生成的文件包含 hash 后缀
const hash = true;

const chainWebpack = (memo) => {
  // 使用 dayjs 替换 moment.js
  memo.plugin('antd-dayjs').use(AntdDayjsWebpackPlugin);

  memo.module
    .rule('lint')
    .test(/\.(ts|tsx)$/)
    .pre()
    .include.add(path.resolve(__dirname, 'src'))
    .end()
    .use('eslint')
    .loader(require.resolve('eslint-loader'));
};

// 开启 TypeScript 编译时类型检查
const forkTSCheker = {};

const build = {
  dynamicImport,
  ignoreMomentLocale,
  hash,
  chainWebpack,
  forkTSCheker,
};

export default build;
