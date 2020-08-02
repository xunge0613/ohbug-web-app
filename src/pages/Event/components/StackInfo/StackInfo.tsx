import React from 'react';
import { Radio } from 'antd';
import clsx from 'clsx';
import type { SourceMapTraceCode } from 'source-map-trace/dist/interfaces';

import styles from './StackInfo.less';

interface StackInfoProps {
  stack: string;
  source?: SourceMapTraceCode[];
}

const StackInfo: React.FC<StackInfoProps> = ({ stack, source }) => {
  const [toggle, setToggle] = React.useState('raw');
  const handleToggleChange = React.useCallback((e) => {
    setToggle(e.target.value);
  }, []);

  const content = React.useMemo((): React.ReactNode => {
    switch (toggle) {
      case 'raw':
        return stack;
      case 'code':
        return source?.map(
          ({ code, number, highlight }): React.ReactElement => {
            const classes = clsx(styles.line, {
              [styles.highlight]: highlight,
            });
            return (
              <div className={classes} key={number}>
                <span className={styles.number}>{number}</span>
                <span className={styles.code}>{code}</span>
              </div>
            );
          },
        );
      default:
        return null;
    }
  }, [source, stack, toggle]);

  return (
    <div className={styles.root}>
      <Radio.Group
        className={styles.toggle}
        value={toggle}
        onChange={handleToggleChange}
        size="small"
      >
        <Radio.Button value="raw">Raw</Radio.Button>
        <Radio.Button value="code" disabled={!source}>
          Code
        </Radio.Button>
      </Radio.Group>

      <pre className={styles.playground}>{content}</pre>
    </div>
  );
};

export default StackInfo;
