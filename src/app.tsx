import React from 'react';
import type { RequestConfig } from 'umi';

import UserBlock from '@/components/UserBlock';

import './styles';

export const layout = {
  rightContentRender: () => <UserBlock />,
  footerRender: () => <footer>footer</footer>,
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
