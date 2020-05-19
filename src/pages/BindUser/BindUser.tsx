import React from 'react';
import { Typography, Avatar } from 'antd';
import { useSelector, Link } from 'umi';
import type { AuthModelState } from 'umi';

import type { RootState } from '@/interfaces';
import BasicLayout from '@/layouts/Basic';
import MobileLoginForm from '@/components/MobileLoginForm';

import styles from './BindUser.less';

const BindUser: React.FC = () => {
  const oauth = useSelector<RootState, AuthModelState['oauth']>((state) => state.auth.oauth);

  return (
    <BasicLayout className={styles.root}>
      {oauth && (
        <div>
          <Typography>{oauth?.oauthUserDetail?.name}</Typography>
          <Avatar src={oauth?.oauthUserDetail?.avatar_url} />
        </div>
      )}
      <div>
        <Typography.Title>您好，请绑定手机号</Typography.Title>
        <MobileLoginForm type="bindUser" />
        <Link to="/login">已有账号 去登陆</Link>
      </div>
    </BasicLayout>
  );
};

export default BindUser;
