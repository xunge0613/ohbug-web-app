import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Avatar, Dropdown, Typography, Divider } from 'antd';

import Logout from '../Logout';
import CreateProject from '../CreateProject';
import { RootState } from '../../store';
import { ProjectState, UserState } from '../../models';

import styles from './UserBlock.less';
import getPlatformLogo from '../../utils/getPlatformLogo';

const createMenu = (user: UserState, project: ProjectState): React.ReactElement => {
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
  const project = useSelector<RootState, ProjectState>(state => state.project);
  const user = useSelector<RootState, UserState>(state => state.user);
  const { current } = project;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!project.current || !project.current.id) {
      dispatch({ type: 'project/handleCreateProjectVisible', payload: true });
    }
  }, []);

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
