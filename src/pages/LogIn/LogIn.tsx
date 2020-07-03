import React from 'react';
import { Space, Button } from 'antd';
import { useLocation, useDispatch, useSelector, Link } from 'umi';

import { oauth2_github_href } from '@/config';
import { useMount, useToggle, useInvite } from '@/hooks';
import { MobileLoginForm, Icon, LoginTemplate } from '@/components';
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
    if (query && Object.keys(query).length) {
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

  const [loginBoxVisible, { toggle: toggleLoginBoxVisible }] = useToggle(true);
  const handleLoginWithMobileClick = React.useCallback(() => {
    toggleLoginBoxVisible(false);
  }, []);
  const handleBackLoginBoxClick = React.useCallback(() => {
    toggleLoginBoxVisible(true);
  }, []);

  return (
    <LoginTemplate className={styles.root} loading={loading} title="Login" subTitle={subTitle}>
      {loginBoxVisible ? (
        <Space className={styles.loginBox} direction="vertical" size="middle">
          <Button
            block
            size="large"
            icon={<Icon type="icon-ohbug-smartphone-fill" />}
            onClick={handleLoginWithMobileClick}
          >
            手机登录
          </Button>
          <Button
            block
            size="large"
            href={oauth2_github_href}
            icon={<Icon type="icon-ohbug-github-fill" style={{ color: '#24292e' }} />}
          >
            Github 登录
          </Button>
          {/* <Button */}
          {/*  block */}
          {/*  size="large" */}
          {/*  href="#" */}
          {/*  icon={<Icon type="icon-ohbug-wechat-fill" style={{ color: '#1AAD19' }} />} */}
          {/* > */}
          {/*  微信登录 */}
          {/* </Button> */}

          <span>
            没有账号？ <Link to="/signup">注册</Link>
          </span>
        </Space>
      ) : (
        <>
          <MobileLoginForm type="login" />
          <Button type="link" onClick={handleBackLoginBoxClick}>
            <Icon type="icon-ohbug-arrow-left-s-line" />
            所有登录选项
          </Button>
        </>
      )}

      {children}
    </LoginTemplate>
  );
};

export default LogIn;
