import React from 'react';
import { Typography } from 'antd';

import BasicLayout from '@/layouts/Basic';
import MobileLoginForm from '@/components/MobileLoginForm';

import styles from './SignUp.less';

const SignUp: React.FC = () => {
  return (
    <BasicLayout className={styles.root}>
      <div>
        <Typography.Title>注册</Typography.Title>
        <MobileLoginForm type="signup" />
      </div>
    </BasicLayout>
  );
};

export default SignUp;
