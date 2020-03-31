import React from 'react';

import { useAuth } from '@/hooks';
import Loading from './Loading';

export default ({ children }: any) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return children;
  }
  return <Loading />;
};
