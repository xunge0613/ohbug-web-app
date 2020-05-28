import React from 'react';

import LoginTemplate from '@/components/LoginTemplate';
import MobileLoginForm from '@/components/MobileLoginForm';

import styles from './SignUp.less';

const SignUp: React.FC = () => {
  return (
    <LoginTemplate
      className={styles.root}
      title="Signin"
      subTitle="注册帐户以开始全面监控您的应用。"
    >
      <MobileLoginForm type="signup" />
    </LoginTemplate>
  );
};

export default SignUp;
