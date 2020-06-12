import React from 'react';
import clsx from 'clsx';

import Icon from '@/components/Icon';

import styles from './IconButton.less';

interface IconButtonProps {
  spin?: boolean;
  icon: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}
const IconButton: React.FC<IconButtonProps> = ({ spin, icon, onClick }) => {
  const classes = clsx(styles.root, {
    [styles.spin]: spin,
  });
  return (
    <button className={classes} type="button" onClick={onClick}>
      <Icon type={icon} />
    </button>
  );
};

export default IconButton;
