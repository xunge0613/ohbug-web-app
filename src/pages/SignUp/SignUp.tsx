import React from 'react';

import { LoginTemplate, MobileLoginForm } from '@/components';
import { useInvite } from '@/hooks';

import styles from './SignUp.less';

const SignUp: React.FC = () => {
  const { subTitle } = useInvite();
  return (
    <LoginTemplate className={styles.root} title="Signin" subTitle={subTitle}>
      <MobileLoginForm type="signup" />
    </LoginTemplate>
  );
};

export default SignUp;
