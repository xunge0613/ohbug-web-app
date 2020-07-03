import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getMatchMenu, MenuDataItem } from '@umijs/route-utils';

import { Icon } from '@/components';

// 获取当前的选中菜单
export const getSelectedMenuKeys = (pathname: string, menuData: MenuDataItem[]): string[] => {
  const menus = getMatchMenu(pathname, menuData);
  return menus.map((item) => item.key || item.path || '');
};

export function getMenuItem(item: MenuDataItem): React.ReactElement {
  let { path } = item;
  if (item.path === '/settings/:organization_id') path = '/settings/current';
  return (
    <Menu.Item key={item.key || item.path} icon={<Icon type={item.icon as string} />}>
      <Link to={path!}>{item.name}</Link>
    </Menu.Item>
  );
}

export function getMenuItems(menuData: MenuDataItem[] = []): React.ReactElement[] {
  return menuData
    .filter((item) => item.name && !item.hideInMenu)
    .map((item) => getMenuItem(item))
    .filter((item) => item);
}
