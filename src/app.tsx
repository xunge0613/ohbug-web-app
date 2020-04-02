import React from 'react';

import UserBlock from '@/components/UserBlock';

import './styles';

export const layout = {
  rightContentRender: () => <UserBlock />,
  footerRender: () => <footer>footer</footer>,
};
