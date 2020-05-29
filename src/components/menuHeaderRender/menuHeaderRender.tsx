import React from 'react';

import UserBlock from '@/components/UserBlock';

function menuHeaderRender(_: unknown, __: unknown, props: any) {
  const { collapsed } = props;
  return <UserBlock collapsed={collapsed} />;
}

export default menuHeaderRender;
