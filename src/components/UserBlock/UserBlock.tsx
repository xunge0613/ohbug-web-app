import React from 'react';
import { Menu, Avatar, Dropdown, Typography, Divider } from 'antd';
import { useSelector, useDispatch, ProjectModelState, UserModelState } from 'umi';

import { useMount } from '@/hooks';
import { RootState } from '@/interfaces';
import getPlatformLogo from '@/utils/getPlatformLogo';
import Logout from '../Logout';
import CreateProject from '../CreateProject';

import styles from './UserBlock.less';

const createMenu = (user: UserModelState, project: ProjectModelState): React.ReactElement => {
  const { current } = project;

  return (
    <Menu className={styles.menu}>
      {current && (
        <>
          <div className={styles.user}>
            <Avatar src={getPlatformLogo(current.type)} />
            <div className={styles.info}>
              <Typography.Text className={styles.name} strong>
                {current.name}
              </Typography.Text>
              <Typography.Text className={styles.type} type="secondary">
                {current.type}
              </Typography.Text>
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
        </>
      )}

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

const UserBlock: React.FC = () => {
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
    <div className={styles.root}>
      <Dropdown
        overlay={createMenu(user, project)}
        placement="bottomRight"
        overlayClassName={styles.popover}
      >
        <div className={styles.inner}>
          <Avatar src={current && getPlatformLogo(current.type)} />
        </div>
      </Dropdown>
      <CreateProject />
    </div>
  );
};

export default UserBlock;
