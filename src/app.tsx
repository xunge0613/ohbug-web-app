import './wdyr';
import React from 'react';
import ConfigProvider from 'antd/lib/config-provider';
import { ConfigProvider as ConfigProvider2 } from 'antd';
import type { RequestConfig } from 'umi';
import echarts from 'echarts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage/session';

import {
  UserSetting,
  footerRender,
  menuHeaderRender,
  menuItemRender,
  renderEmpty,
  rightContentRender,
  errorHandler,
} from '@/components';
import { ICONFONT_URL } from '@/config';
import { getAuth } from '@/utils';

import chartTheme from './styles/chart.json';
import './styles';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
dayjs().locale('zh-cn').format();
echarts.registerTheme('ohbug', chartTheme.theme);

export const layout = {
  iconfontUrl: ICONFONT_URL,
  layout: 'top',
  rightContentRender,
  onMenuHeaderClick: () => {},
  menuHeaderRender,
  menuItemRender,
  footerRender,
};

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <ConfigProvider2 renderEmpty={renderEmpty}>
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
  headers: { Authorization: `bearer ${getAuth()?.token}` },
  middlewares: [
    async function (ctx, next) {
      const { req } = ctx;
      const { url } = req;
      // baseURL 从 config/define 中定义
      // @ts-ignore
      ctx.req.url = `${baseURL}${url}`;

      await next();

      // 简化返回数据 直接拿到 data
      const response = getResponse(ctx);
      ctx.res = response;
    },
  ],
  errorHandler,
};

const persistConfig = {
  timeout: 1000,
  key: 'root',
  whitelist: ['organization', 'project'],
  storage,
};
const persistEnhancer = () => (createStore: any) => (
  reducer: any,
  initialState: any,
  enhancer: any,
) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  return {
    persist,
    ...store,
  };
};
export const dva = {
  config: {
    extraEnhancers: [persistEnhancer()],
  },
};
