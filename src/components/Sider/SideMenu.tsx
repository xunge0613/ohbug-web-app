import React from 'react';
import { Layout, Menu } from 'antd';
import {
  ProjectOutlined,
  DashboardOutlined,
  IssuesCloseOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useLocation, Link } from 'umi';

import styles from './SideMenu.module.less';

interface SideMenuProps {
  collapsed: boolean;
}
const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const { pathname } = useLocation();

  const selectedKey = pathname.split('/')[1];

  return (
    <Layout.Sider className={styles.root} width={240} theme="dark" collapsed={collapsed}>
      <Link className={styles.logo} to="/">
        <img src="/logo.svg" alt="ohbug" />
      </Link>
      <div className={styles.content}>
        <Menu className={styles.menu} theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="project">
            <Link to="/project">
              <ProjectOutlined />
              <span className={styles.title}>Project</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard">
            <Link to="/dashboard">
              <DashboardOutlined />
              <span className={styles.title}>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="issue">
            <Link to="/issue">
              <IssuesCloseOutlined />
              <span className={styles.title}>Issue</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="event">
            <Link to="/event">
              <QuestionCircleOutlined />
              <span className={styles.title}>Event</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="feedback">
            <Link to="/feedback">
              <QuestionCircleOutlined />
              <span className={styles.title}>Feedback</span>
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="settings">
            <Link to="/settings">
              <Icon type="setting" />
              <span className={styles.title}>Settings</span>
            </Link>
          </Menu.Item> */}
        </Menu>
      </div>
    </Layout.Sider>
  );
};

export default SideMenu;
