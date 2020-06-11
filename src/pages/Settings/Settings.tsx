import React from 'react';
import { Card, Menu } from 'antd';
import { useRouteMatch, useLocation, useParams, history } from 'umi';

import BasicLayout from '@/layouts/Basic';

import styles from './Settings.less';

const menuList = [
  {
    label: '团队设置',
    key: 'profile',
    path: '/profile',
  },
  {
    label: '项目列表',
    key: 'projects',
    path: '/projects',
  },
];

interface SettingsProps {
  children: React.ReactNode;
}
const Settings: React.FC<SettingsProps> = ({ children }) => {
  const match = useRouteMatch();
  const { organization_id } = useParams();
  const location = useLocation();
  const selectedKeys = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, key] = location.pathname.split(`/settings/${organization_id}/`);
    return [key];
  }, [location, organization_id]);

  return (
    <BasicLayout className={styles.root}>
      <Card>
        <Menu className={styles.leftMenu} selectedKeys={selectedKeys}>
          {menuList.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={() => {
                history.push(`${match.url}${item.path}`);
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
        <section className={styles.container}>{children}</section>
      </Card>
    </BasicLayout>
  );
};

export default Settings;
