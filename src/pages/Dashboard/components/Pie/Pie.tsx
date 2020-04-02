import React from 'react';
import { Card, Typography } from 'antd';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

import { useDispatch, useSelector, useMount } from '@/hooks';
import { RootState } from '@/store';

type Type = 'browser' | 'os' | 'type' | 'device';
interface StatisticsProps {
  title: React.ReactNode;
  type: Type;
}

const Pie: React.FC<StatisticsProps> = ({ title, type }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: 'analysis/getStatistics', payload: { type } });
  }, [dispatch, type]);

  const data = useSelector<RootState, any>((state) => state.analysis[type]);
  const loading = typeof data === 'undefined';

  const container = React.useRef<HTMLDivElement>(null);

  useMount(() => {
    if (data && data.length) {
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent',
      });

      const chart = new Chart({
        container: container.current as HTMLDivElement,
        autoFit: true,
        height: 220,
      });
      chart.data(dv.rows);
      chart.coordinate('theta', {
        radius: 0.75,
      });
      chart.scale('percent', {
        formatter: (val) => `${(val * 100).toFixed(2)}%`,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
          content: ({ percent, item }) => {
            const value = (percent * 100).toFixed(2);
            return `${item}: ${value}%`;
          },
        })
        .adjust('stack');
      chart.interaction('element-active');
      chart.render();

      return (): void => {
        chart.destroy();
      };
    }
    return () => {};
  });

  return (
    <Card
      title={
        <span>
          {title} <Typography.Text type="secondary">(24小时内)</Typography.Text>
        </span>
      }
      size="small"
      loading={loading}
    >
      <div ref={container} />
    </Card>
  );
};

export default Pie;
