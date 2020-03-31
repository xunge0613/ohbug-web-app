import React from 'react';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import { Typography } from 'antd';

import styles from './Chart.less';

interface PerformanceStatisticProps {
  data?: any;
  field: string;
}

const Charts: React.FC<PerformanceStatisticProps> = ({ data, field }) => {
  const dataSource = React.useMemo(() => {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'bin.histogram',
      field,
      binWidth: 100,
      as: ['value', 'count'],
    });
    return dv.rows;
  }, [data, field]);

  const container = React.useRef<HTMLDivElement>(null);

  const chart = React.useRef<Chart | null>(null);

  React.useEffect(() => {
    if (dataSource) {
      if (!chart.current) {
        chart.current = new Chart({
          container: container.current as HTMLDivElement,
          autoFit: true,
          height: 400,
        });
        chart.current.data(dataSource);
        chart.current.scale({
          value: {
            tickInterval: 100,
          },
          count: { nice: true },
        });
        chart.current.tooltip({
          position: 'top',
          showMarkers: false,
        });
        chart.current.interval().position('value*count');
        chart.current.interaction('element-highlight');
        chart.current.render();
      } else {
        chart.current.changeData(dataSource);
      }
    }
  }, [dataSource]);

  return (
    <div className={styles.chart}>
      <div ref={container}>
        <Typography.Text className={styles.mainTitle} type="secondary">
          {field}
        </Typography.Text>
      </div>
    </div>
  );
};

export default Charts;
