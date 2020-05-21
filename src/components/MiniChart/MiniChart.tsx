import React from 'react';
import { Typography, Badge } from 'antd';
import ReactEcharts from 'echarts-for-react';
import type { EChartOption } from 'echarts';
import dayjs from 'dayjs';

import './MiniChart.less';

type Data = {
  timestamp: number;
  count: number;
};
interface MiniChartProps {
  trend: '24h' | '14d';
  data?: Data[];
  loading?: boolean;
  title?: string;
}

const MiniChart: React.FC<MiniChartProps> = ({ trend, data, loading, title }) => {
  const option = React.useMemo<EChartOption>(
    () => ({
      dataset: {
        source: data,
        dimensions: [{ name: 'timestamp' }, { name: 'count' }],
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        top: 5,
        bottom: 5,
        left: 0,
        right: 0,
      },
      tooltip: {
        trigger: 'axis',
        padding: [8, 16],
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        transitionDuration: 0,
        appendToBody: true,
        position(point, params, dom, rect, size) {
          // @ts-ignore
          const { contentSize } = size;
          // @ts-ignore
          return [point[0] - contentSize[0] / 2, '120%'];
        },
        formatter(params) {
          // @ts-ignore
          const [{ value }] = params;
          // @ts-ignore
          const { timestamp, count } = value;
          if (trend === '24h') {
            return `<div class="tooltip-time">
            ${dayjs(timestamp).format('YYYY-MM-DD')}<br>
            ${dayjs(timestamp).format('h:00 A → h:59 A')}
            </div>

            <div class="tooltip-value">${count} events</div>

            <span class="tooltip-arrow" />
            `;
          }
          if (trend === '14d') {
            return `<div class="tooltip-time">${dayjs(timestamp).format('YYYY-MM-DD')}</div>

            <div class="tooltip-value">${count} events</div>

            <span class="tooltip-arrow" />
            `;
          }
          return '';
        },
        textStyle: {
          fontWeight: 'bolder',
          fontSize: 12,
          lineHeight: 1,
        },
        extraCssText: 'text-align: center;',
      },
      series: [
        {
          name: 'events',
          type: 'line',
          smooth: true,
          symbol: 'emptyCircle',
          symbolSize: 2,
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#FF6F61',
                },
                {
                  offset: 1,
                  color: '#FFF',
                },
              ],
            },
          },
        },
      ],
    }),
    [data],
  );

  return data ? (
    <div>
      {title && (
        <div>
          <Badge status="processing" />
          <Typography.Text strong>{title}</Typography.Text>
        </div>
      )}
      <ReactEcharts
        option={option}
        style={{ height: '40px' }}
        opts={{ renderer: 'svg' }}
        showLoading={loading}
        theme="ohbug"
      />
    </div>
  ) : null;
};

export default MiniChart;
