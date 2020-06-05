import React from 'react';

import Icon from '@/components/Icon';

import styles from './IconButton.less';

interface IconButtonProps {
  icon: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
}
const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button className={styles.root} type="button" onClick={onClick}>
      <Icon type={icon} />
    </button>
  );
};

export default IconButton;
