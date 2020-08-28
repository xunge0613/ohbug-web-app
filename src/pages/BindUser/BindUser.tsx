import React from 'react';
import { Typography, Avatar } from 'antd';
import { useSelector, Link } from 'umi';

import type { RootState, AuthModelState } from '@/interfaces';
import { LoginTemplate, LoginForm } from '@/components';

import styles from './BindUser.less';

const BindUser: React.FC = () => {
  const oauth = useSelector<RootState, AuthModelState['oauth']>((state) => state.auth.oauth);

  return (
    <LoginTemplate className={styles.root} title="请绑定手机号">
      {oauth && (
        <div>
          <Typography>{oauth?.oauthUserDetail?.name}</Typography>
          <Avatar src={oauth?.oauthUserDetail?.avatar_url} />
        </div>
      )}
      <div>
        <LoginForm type="bindUser" />
        已有账号？ <Link to="/login">登陆</Link>
      </div>
    </LoginTemplate>
  );
};

export default BindUser;
