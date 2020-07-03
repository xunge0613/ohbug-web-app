import React from 'react';
import { Layout, Menu } from 'antd';
import type { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu';

import { SwitchOrganization } from '@/components';

import { getSelectedMenuKeys, getMenuItems } from './utils';

import styles from './menuRender.less';

function MenuRender(props: SiderMenuProps): React.ReactElement {
  const {
    collapsed,
    onCollapse,
    theme,
    siderWidth,
    isMobile,
    breakpoint = 'lg',
    style,
    location = {
      pathname: '/',
    },
    menuData,
  } = props;
  const keys = getSelectedMenuKeys(location.pathname || '/', menuData || []);
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      breakpoint={breakpoint === false ? undefined : breakpoint}
      onCollapse={(collapse) => {
        if (!isMobile) {
          if (onCollapse) {
            onCollapse(collapse);
          }
        }
      }}
      style={{
        overflow: 'hidden',
        ...style,
      }}
      width={siderWidth}
      theme={theme}
    >
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.head}>
            <SwitchOrganization collapsed={collapsed} />
          </div>

          <div className={styles.content}>
            <Menu theme={theme} selectedKeys={keys} mode="inline">
              {getMenuItems(menuData)}
            </Menu>
          </div>
        </div>

        <div className={styles.bottom} />
      </div>
    </Layout.Sider>
  );
}

export default MenuRender;
