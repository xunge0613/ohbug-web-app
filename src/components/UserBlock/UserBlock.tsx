import React from 'react';
import { Menu, Avatar, Dropdown, Typography } from 'antd';
import { useSelector, useDispatch } from 'umi';
import type { ProjectModelState, UserModelState } from 'umi';

import { useMount } from '@/hooks';
import getPlatformLogo from '@/utils/getPlatformLogo';
import Icon from '@/components/Icon';
import type { RootState } from '@/interfaces';

import Logout from '../Logout';
import CreateProject from '../CreateProject';

import styles from './UserBlock.less';

const createMenu = (user: UserModelState): React.ReactElement => {
  return (
    <Menu className={styles.menu}>
      <Menu.Item className={styles.user}>
        <Avatar src={user.avatar} />
        <div className={styles.info} style={{ display: 'inline-flex' }}>
          <Typography.Text strong>{user.name}</Typography.Text>
          <Typography.Text type="secondary">{user.email}</Typography.Text>
        </div>
        <div className={styles.user} />
      </Menu.Item>

      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );
};

interface UserBlockProps {
  collapsed: boolean;
}
const UserBlock: React.FC<UserBlockProps> = ({ collapsed }) => {
  const dispatch = useDispatch();
  const project = useSelector<RootState, ProjectModelState>((state) => state.project);
  const user = useSelector<RootState, UserModelState>((state) => state.user);
  const { current } = project;

  useMount(() => {
    if (!project.current || !project.current.id) {
      dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
    }
  });

  return (
    <>
      <Dropdown trigger={['click']} overlay={createMenu(user)} placement="bottomRight">
        <div className={styles.root}>
          <div className={styles.user}>
            {current && (
              <>
                <Avatar src={getPlatformLogo(current.type)} />
                {!collapsed && (
                  <div className={styles.info}>
                    <Typography.Text className={styles.name} strong>
                      {current.name} <Icon type="ohbug-arrow-down-s-line" />
                    </Typography.Text>
                    <Typography.Text className={styles.type} type="secondary">
                      {current.type}
                    </Typography.Text>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Dropdown>
      <CreateProject />
    </>
  );
};

export default UserBlock;
