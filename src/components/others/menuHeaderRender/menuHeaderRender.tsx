import React from 'react';

import { SwitchOrganization } from '@/components';

function menuHeaderRender(_: unknown, __: unknown, props: any) {
  const { collapsed } = props;
  return <SwitchOrganization collapsed={collapsed} />;
}

export default menuHeaderRender;
