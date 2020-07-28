import layout from './layout';
import routes from './routes';
import proxy from './proxy';
import request from './request';
import dva from './dva';
import antd from './antd';
import theme from './theme';
import others from './others';
import build from './build';
import define from './define';

export default {
  layout,
  routes,

  define,
  proxy,
  request,
  dva,

  antd,
  theme,

  ...others,
  ...build,
};
