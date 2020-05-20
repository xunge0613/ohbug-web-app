import React from 'react';
import clsx from 'clsx';

import styles from './Image.less';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: object;
}
const Image: React.FC<ImageProps> = ({ src, alt, className, style, ...args }) => {
  const classes = clsx(styles.root, className);
  return (
    <div className={classes} style={style} {...args}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
