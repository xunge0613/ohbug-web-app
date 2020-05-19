import React from 'react';
import { Typography } from 'antd';
import { Link } from 'umi';

import BasicLayout from '@/layouts/Basic';
import MobileLoginForm from '@/components/MobileLoginForm';

import styles from './SignUp.less';

const SignUp: React.FC = () => {
  return (
    <BasicLayout className={styles.root}>
      <div>
        <Typography.Title>注册</Typography.Title>
        <MobileLoginForm />
        <Link to="/login">已有账号 去登陆</Link>
      </div>
    </BasicLayout>
  );
};

export default SignUp;
