import React from 'react';
import { Avatar, Divider } from 'antd';

import styles from './footerRender.less';

function footerRender(props: any) {
  const { collapsed, isMobile, logo, title } = props;
  if (collapsed || isMobile) return null;
  return (
    <footer className={styles.root}>
      <Divider />
      <div className={styles.logo}>
        <Avatar src={logo} />
        <span className={styles.title}>{title}</span>
      </div>
    </footer>
  );
}

export default footerRender;
