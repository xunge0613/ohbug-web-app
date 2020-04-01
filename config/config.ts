import { defineConfig } from 'umi';

import routes from './routes';
import layout from './layout';
import proxy from './proxy';
import build from './build';

export default defineConfig({
  routes,

  layout,

  proxy,

  ...build,
});
