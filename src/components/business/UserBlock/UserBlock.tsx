import React from 'react';
import { Menu, Avatar, Typography, Dropdown } from 'antd';
import { useSelector } from 'umi';

import { Logout, Icon } from '@/components';
import type { RootState, User } from '@/interfaces';
import { getDefaultAvatar } from '@/utils';

import styles from './UserBlock.less';

const createMenu = (user: User): React.ReactElement => {
  return (
    <Menu className={styles.menu}>
      <Menu.Item className={styles.user}>
        <div className={styles.info} style={{ display: 'inline-flex' }}>
          <Typography.Text strong>{user.name}</Typography.Text>
          <Typography.Text type="secondary">{user.email}</Typography.Text>
        </div>
      </Menu.Item>

      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );
};

interface UserBlockProps {}
const UserBlock: React.FC<UserBlockProps> = () => {
  const user = useSelector<RootState, User>((state) => state.user);
  const avatar = React.useMemo(() => getDefaultAvatar({ id: user.id, name: user.name }), [user]);

  return (
    <Dropdown trigger={['click']} overlay={createMenu(user)} placement="bottomRight">
      <div className={styles.root}>
        <Avatar src={user.avatar || avatar} />
        <Icon type="icon-ohbug-arrow-down-s-line" />
      </div>
    </Dropdown>
  );
};

export default UserBlock;
