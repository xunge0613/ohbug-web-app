import React from 'react';
import { Layout, Menu, Avatar } from 'antd';

import { history } from 'umi';
import UserBlock from '@/components/UserBlock';

import styles from './menuRender.less';

function handleMenuItemClick({ key }: any) {
  history.push(key);
}

function menuRender(props: any) {
  const {
    navTheme,
    siderWidth,
    isMobile,
    collapsed,
    onCollapse,
    menuData,
    location,
    logo,
    title,
  } = props;
  console.log(props);

  return (
    <Layout.Sider
      className={styles.root}
      theme={navTheme}
      width={siderWidth}
      collapsed={collapsed}
      onCollapse={(collapse) => {
        if (!isMobile) {
          if (onCollapse) {
            onCollapse(collapse);
          }
        }
      }}
    >
      <div className={styles.logo}>
        <Avatar src={logo} />
        <span className={styles.title}>{title}</span>
      </div>

      <Menu
        className={styles.menu}
        selectedKeys={[location?.pathname]}
        onClick={handleMenuItemClick}
        mode="inline"
      >
        {menuData.map((item: any) => (
          <Menu.Item key={item.key}>{item.name}</Menu.Item>
        ))}
      </Menu>

      <div className={styles.userBlock}>
        <UserBlock />
      </div>
    </Layout.Sider>
  );
}

export default menuRender;
