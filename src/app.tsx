import React from 'react';
import ConfigProvider from 'antd/lib/config-provider';
import { ConfigProvider as ConfigProvider2 } from 'antd';
import type { RequestConfig } from 'umi';
import echarts from 'echarts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

import {
  CreateProject,
  UserSetting,
  footerRender,
  headerRender,
  menuRender,
  renderEmpty,
} from '@/components';
import { ICONFONT_URL } from '@/config';

import chartTheme from './styles/chart.json';
import './styles';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
dayjs().locale('zh-cn').format();
echarts.registerTheme('ohbug', chartTheme.theme);

export const layout = {
  iconfontUrl: ICONFONT_URL,
  menuRender,
  headerRender,
  footerRender,
};

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <ConfigProvider2 renderEmpty={renderEmpty}>
        <CreateProject />
        <UserSetting />
        {container}
      </ConfigProvider2>
    </ConfigProvider>
  );
}

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
