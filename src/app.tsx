import type { RequestConfig } from 'umi';
import echarts from 'echarts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import menuRender from '@/components/menuRender';
import footerRender from '@/components/footerRender';

import chartTheme from './styles/chart.json';
import './styles';

dayjs.extend(relativeTime);
echarts.registerTheme('ohbug', chartTheme.theme);

export const layout = {
  headerRender: false,
  menuRender,
  footerRender,
};

function getResponse(ctx: any) {
  if (ctx.res.success && typeof ctx.res.data !== 'undefined') {
    return ctx.res.data;
  }

  return ctx.res;
}
export const request: RequestConfig = {
  prefix: '/v1',
  timeout: 10000,
  middlewares: [
    async function returnData(ctx, next) {
      await next();

      // 简化返回数据 直接拿到 data
      const response = getResponse(ctx);
      ctx.res = response;
    },
  ],
};
