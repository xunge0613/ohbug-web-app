import React from 'react';
import { Link } from 'umi';

import { Icon } from '@/components';

import styles from './menuItemRender.less';

function MenuItemRender(props: any): React.ReactNode {
  let { path } = props;
  if (path === '/issue') path = '/issue?project_id=current';

  return (
    <div className={styles.root}>
      <Icon type={props.icon as string} style={{ fontSize: 24 }} />
      <Link to={path!}>{props.name}</Link>
    </div>
  );
}

export default MenuItemRender;
