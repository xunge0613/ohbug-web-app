import React from 'react';
import { Button } from 'antd';
import { useLocation, useDispatch, useSelector } from 'umi';

import { oauth2GithubHref } from '@/config';
import { useMount, useInvite } from '@/hooks';
import { LoginForm, Icon, LoginTemplate } from '@/components';
import type { RootState } from '@/interfaces';

import styles from './LogIn.less';

interface LoginPageProps {
  children?: React.ReactNode;
}

function useLoginRedirect() {
  const dispatch = useDispatch();
  // @ts-ignore
  const { query } = useLocation();

  useMount(() => {
    if (query && 'code' in query && 'state' in query) {
      dispatch({ type: 'auth/github', payload: query });
    }
  });
}

const LogIn: React.FC<LoginPageProps> = ({ children }) => {
  useLoginRedirect();
  const { subTitle } = useInvite();

  const loading = useSelector<RootState, boolean>(
    (state) => !!state.loading.effects['auth/github']!,
  );

  return (
    <LoginTemplate className={styles.root} loading={loading} title="Login" subTitle={subTitle}>
      <LoginForm type="login" />

      <Button
        type="text"
        href={oauth2GithubHref}
        icon={<Icon type="icon-ohbug-github-fill" style={{ color: '#24292e' }} />}
      >
        Github 登录
      </Button>

      {children}
    </LoginTemplate>
  );
};

export default LogIn;
