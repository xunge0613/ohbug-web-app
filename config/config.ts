import { defineConfig } from 'umi';

import proxy from './proxy';
import antd from './antd';
import theme from './theme';
import routes from './routes';
import layout from './layout';
import dva from './dva';
import request from './request';
import build from './build';

export default defineConfig({
  proxy,
  antd,
  theme,
  routes,
  layout,
  dva,
  request,
  ...build,
});
