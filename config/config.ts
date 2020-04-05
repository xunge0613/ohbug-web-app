import { defineConfig } from 'umi';

import proxy from './proxy';
import antd from './antd';
import routes from './routes';
import layout from './layout';
import dva from './dva';
import request from './request';
import build from './build';

export default defineConfig({
  proxy,
  antd,
  routes,
  layout,
  dva,
  request,
  ...build,
});
