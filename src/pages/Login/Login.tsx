import React from 'react';
import { Typography, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useLocation, useDispatch } from 'umi';

import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';

import styles from './Login.less';

interface LoginPageProps {
  children?: React.ReactNode;
}

const clientId =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_GITHUB_CLIENT_ID
    : process.env.REACT_APP_GITHUB_CLIENT_ID_DEV;
const href = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

function useLoginRedirect(): void {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;

  useMount(() => {
    if (query && Object.keys(query).length) {
      dispatch({ type: 'login/login', payload: { query } });
    }
  });
}

const Login: React.FC<LoginPageProps> = ({ children }) => {
  useLoginRedirect();

  return (
    <BasicLayout className={styles.root}>
      <div>
        <Typography.Title>Join in</Typography.Title>
        <Button type="primary" size="large" shape="round" href={href}>
          <GithubOutlined />
          Continue with Github
        </Button>
        {children}
      </div>
    </BasicLayout>
  );
};

export default Login;
