import React from 'react';
import { Typography, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useLocation, useDispatch, Link } from 'umi';

import { oauth2_github_href } from '@/config';
import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import MobileLoginForm from '@/components/MobileLoginForm';

import styles from './LogIn.less';

interface LoginPageProps {
  children?: React.ReactNode;
}

function useLoginRedirect(): void {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;

  useMount(() => {
    if (query && Object.keys(query).length) {
      dispatch({ type: 'auth/login', payload: { query } });
    }
  });
}

const LogIn: React.FC<LoginPageProps> = ({ children }) => {
  useLoginRedirect();

  return (
    <BasicLayout className={styles.root}>
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
    </BasicLayout>
  );
};

export default LogIn;
