import React from 'react';
import { Layout, Menu } from 'antd';

import { history } from 'umi';
import UserBlock from '@/components/UserBlock';
import Icon from '@/components/Icon';

import styles from './menuRender.less';

function handleMenuItemClick({ key }: any) {
  history.push(key);
}

function menuRender(props: any) {
  const { navTheme, siderWidth, isMobile, collapsed, onCollapse, menuData, location } = props;

  return (
    <Layout.Sider
      className={styles.root}
      theme={navTheme}
      width={siderWidth}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      onCollapse={(collapse) => {
        if (onCollapse) {
          onCollapse(collapse);
        }
      }}
      trigger=""
    >
      <div className={styles.top}>
        <div className={styles.userBlock}>
          <UserBlock collapsed={collapsed} />
        </div>

        <Menu
          className={styles.menu}
          selectedKeys={[location?.pathname]}
          onClick={handleMenuItemClick}
          mode="inline"
        >
          {menuData.map((item: any) => (
            <Menu.Item key={item.key} icon={<Icon type={item.icon} />}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </div>

      <div className={styles.bottom}>
        <button
          className={styles.trigger}
          type="button"
          onClick={() => {
            onCollapse(!collapsed);
          }}
        >
          {collapsed ? (
            <Icon type="ohbug-layout-left-line" />
          ) : (
            <Icon type="ohbug-layout-left-2-line" />
          )}
        </button>
      </div>
    </Layout.Sider>
  );
}

export default menuRender;
