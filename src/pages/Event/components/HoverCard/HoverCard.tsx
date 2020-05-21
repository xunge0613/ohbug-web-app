import React from 'react';
import { Card } from 'antd';
import type { CardProps } from 'antd/lib/card';
import clsx from 'clsx';

import styles from './HoverCard.less';

const HoverCard: React.FC<CardProps> = (props) => {
  const classes = clsx(props.className, styles.root);
  return (
    <Card {...props} className={classes}>
      <div className={styles.container}>{props.children}</div>
    </Card>
  );
};

export default HoverCard;
