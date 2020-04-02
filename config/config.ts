import { defineConfig } from 'umi';

import antd from './antd';
import routes from './routes';
import layout from './layout';
import proxy from './proxy';
import build from './build';

export default defineConfig({
  antd,

  routes,

  layout,

  proxy,

  ...build,
});
