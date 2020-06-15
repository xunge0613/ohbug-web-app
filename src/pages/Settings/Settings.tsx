import React from 'react';
import { Card, Menu } from 'antd';
import { useRouteMatch, useLocation, useParams, history } from 'umi';
import { pathToRegexp } from 'path-to-regexp';

import BasicLayout from '@/layouts/Basic';
import IconButton from '@/components/IconButton';

import styles from './Settings.less';

interface MenuItem {
  label: string;
  key: string;
  path?: string;
  children?: MenuList;
}
type MenuList = MenuItem[];
const organizationMenuList: MenuList = [
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
const projectMenuList = (project_id?: number | string): MenuList => [
  {
    label: '项目设置',
    key: `project/${project_id}/profile`,
    path: `/project/${project_id}/profile`,
  },
  {
    label: '通知',
    key: `project/${project_id}/notification`,
    children: [
      {
        label: '通知规则',
        key: `project/${project_id}/notification_rules`,
        path: `/project/${project_id}/notification_rules`,
      },
      {
        label: '通知设置',
        key: `project/${project_id}/notification_setting`,
        path: `/project/${project_id}/notification_setting`,
      },
    ],
  },
  // {
  //   label: 'SourceMap',
  //   key: `project/${project_id}/sourcemap`,
  //   path: `/project/${project_id}/sourcemap`,
  // },
  {
    label: '成员列表',
    key: `project/${project_id}/users`,
    path: `/project/${project_id}/users`,
  },
];
function renderMenu(menuList: MenuList, handleItemClick: (item: MenuItem) => void) {
  return menuList.map((item) =>
    Array.isArray(item.children) ? (
      <Menu.SubMenu key={item.key} title={item.label}>
        {renderMenu(item.children, handleItemClick)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.key} onClick={() => handleItemClick(item)}>
        {item.label}
      </Menu.Item>
    ),
  );
}

interface SettingsProps {
  children: React.ReactNode;
}
const Settings: React.FC<SettingsProps> = ({ children }) => {
  const match = useRouteMatch();
  const { organization_id } = useParams();
  const location = useLocation();

  const regexp = pathToRegexp('/settings/:organization_id/project/:project_id/(.*)');
  const isProjectSetting = React.useMemo(
    () => location.pathname.includes('/project/') && match.url === `/settings/${organization_id}`,
    [location, match, organization_id],
  );
  const project_id = React.useMemo(() => regexp.exec(location.pathname)?.[2], [regexp, location]);
  const menuList = React.useMemo(() => {
    if (isProjectSetting) {
      return projectMenuList(project_id);
    }
    return organizationMenuList;
  }, [isProjectSetting, project_id]);
  const selectedKeys = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, key] = location.pathname.split(`/settings/${organization_id}/`);
    return [key];
  }, [location, organization_id]);

  const handleBack = React.useCallback(() => {
    history.goBack();
  }, []);

  return (
    <BasicLayout
      className={styles.root}
      pageHeader={
        <div className={styles.header}>
          <IconButton icon="icon-ohbug-arrow-left-s-line" onClick={handleBack} />
        </div>
      }
    >
      <Card>
        <Menu className={styles.leftMenu} selectedKeys={selectedKeys} mode="inline">
          {renderMenu(menuList, (item) => history.push(`${match.url}${item.path}`))}
        </Menu>
        <section className={styles.container}>{children}</section>
      </Card>
    </BasicLayout>
  );
};

export default Settings;
