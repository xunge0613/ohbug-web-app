import { defineConfig } from 'umi';

import routes from './routes';
import proxy from './proxy';
import build from './build';

export default defineConfig({
  routes,

  proxy,

  ...build,
});
