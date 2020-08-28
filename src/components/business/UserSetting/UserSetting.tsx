import React from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'umi';

import type { RootState, User } from '@/interfaces';

import Content from './Content';

import styles from './UserSetting.less';

const UserSetting: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector<RootState, User>((state) => state.user?.current!);

  const visible = useSelector<RootState, boolean>((state) => state.user?.userSettingVisible);
  const handleClose = React.useCallback(() => {
    dispatch({
      type: 'user/setState',
      payload: {
        userSettingVisible: false,
      },
    });
  }, [dispatch]);

  return (
    <Drawer
      className={styles.root}
      title="账号设置"
      placement="right"
      closable
      width={600}
      visible={visible}
      onClose={handleClose}
    >
      {user && <Content user={user} />}
    </Drawer>
  );
};

export default UserSetting;
