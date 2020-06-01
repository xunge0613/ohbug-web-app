import React from 'react';
import { Typography, Badge } from 'antd';
import ReactEcharts from 'echarts-for-react';
import type { EChartOption } from 'echarts';
import dayjs from 'dayjs';

import './LineChart.less';

type Data = {
  timestamp: number;
  count: number;
};
interface LineChartProps {
  trend: '24h' | '14d';
  data?: Data[];
  loading?: boolean;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({ trend, data, loading, title }) => {
  const option = React.useMemo<EChartOption>(
    () => ({
      dataset: {
        source: data,
        dimensions: [{ name: 'timestamp' }, { name: 'count' }],
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          lineHeight: 25,
          formatter(timestamp: number) {
            return dayjs(timestamp).format('YYYY-MM-DD');
          },
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        top: 10,
        bottom: 25,
        left: 0,
        right: 0,
      },
      tooltip: {
        trigger: 'axis',
        padding: [8, 16],
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
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

            <div class="tooltip-value">${count} issues</div>

            <span class="tooltip-arrow" />
            `;
          }
          if (trend === '14d') {
            return `<div class="tooltip-time">${dayjs(timestamp).format('YYYY-MM-DD')}</div>

            <div class="tooltip-value">${count} issues</div>

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
          name: 'issues',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          showSymbol: false,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 4,
              },
            },
          },
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
                  color: 'rgba(255,111,97,0.25)',
                },
                {
                  offset: 0.333,
                  color: 'rgba(255,111,97,0.2)',
                },
                {
                  offset: 0.666,
                  color: 'rgba(255,111,97,0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,111,97,0)',
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
        style={{ height: '160px' }}
        opts={{ renderer: 'svg' }}
        showLoading={loading}
        theme="ohbug"
      />
    </div>
  ) : null;
};

export default LineChart;
