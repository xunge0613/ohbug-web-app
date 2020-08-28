import React from 'react';
import { useSelector } from 'umi';

import { LoginForm, LoginTemplate } from '@/components';
import type { RootState } from '@/interfaces';
import { useInvite } from '@/hooks';

import styles from './SignUp.less';

interface SignUpPageProps {
  children?: React.ReactNode;
}

const SignUp: React.FC<SignUpPageProps> = ({ children }) => {
  const { subTitle } = useInvite('signup');
  const loading = useSelector<RootState, boolean>(
    (state) => !!state.loading.effects['auth/github']!,
  );

  return (
    <LoginTemplate className={styles.root} loading={loading} title="Signup" subTitle={subTitle}>
      <LoginForm type="signup" />
      {children}
    </LoginTemplate>
  );
};

export default SignUp;
