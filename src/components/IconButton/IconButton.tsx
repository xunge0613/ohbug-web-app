import React from 'react';
import clsx from 'clsx';

import Icon from '@/components/Icon';

import styles from './IconButton.less';

interface IconButtonProps {
  spin?: boolean;
  icon: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  size?: 'default' | 'small' | 'large';
}
const IconButton: React.FC<IconButtonProps> = ({ spin, icon, onClick, size = 'default' }) => {
  const classes = clsx(styles.root, {
    [styles.spin]: spin,
    [styles.sizeSmall]: size === 'small',
    [styles.sizeDefault]: size === 'default',
    [styles.sizeLarge]: size === 'large',
  });
  return (
    <button className={classes} type="button" onClick={onClick}>
      <Icon type={icon} />
    </button>
  );
};

export default IconButton;
