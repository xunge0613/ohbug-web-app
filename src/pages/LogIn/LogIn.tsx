import React from 'react';
import { Spin, Typography, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useLocation, useDispatch, Link, useSelector } from 'umi';

import { oauth2_github_href } from '@/config';
import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import MobileLoginForm from '@/components/MobileLoginForm';
import type { RootState } from '@/interfaces';

import styles from './LogIn.less';

interface LoginPageProps {
  children?: React.ReactNode;
}

function useLoginRedirect(): void {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;

  useMount(() => {
    if (query && Object.keys(query).length) {
      dispatch({ type: 'auth/github', payload: query });
    }
  });
}

const LogIn: React.FC<LoginPageProps> = ({ children }) => {
  useLoginRedirect();

  const loading = useSelector<RootState, boolean>(
    (state) => !!state.loading.effects['auth/github']!,
  );

  return (
    <BasicLayout className={styles.root}>
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Typography.Title>登录</Typography.Title>
          <MobileLoginForm type="login" />
          <Button type="primary" size="large" href={oauth2_github_href}>
            <GithubOutlined />
            Continue with Github
          </Button>

          <br />
          <Link to="/signup">还没有账号 去注册</Link>
          {children}
        </div>
      )}
    </BasicLayout>
  );
};

export default LogIn;
