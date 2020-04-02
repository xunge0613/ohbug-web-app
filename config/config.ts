import { defineConfig } from 'umi';

import proxy from './proxy';
import antd from './antd';
import routes from './routes';
import layout from './layout';
import dva from './dva';
import build from './build';

export default defineConfig({
  proxy,
  antd,
  routes,
  layout,
  dva,
  ...build,
});
