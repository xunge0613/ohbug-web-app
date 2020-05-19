import React from 'react';
import { Typography, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useLocation, useDispatch } from 'umi';

import { oauth2_github_href } from '@/config';
import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';

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
        <Typography.Title>Join in</Typography.Title>
        <Button type="primary" size="large" shape="round" href={oauth2_github_href}>
          <GithubOutlined />
          Continue with Github
        </Button>
        {children}
      </div>
    </BasicLayout>
  );
};

export default LogIn;
