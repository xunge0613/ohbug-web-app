import React from 'react';
import { Card, Menu, Dropdown, Typography, Tooltip } from 'antd';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';

import type { RootState, AnalysisModelState } from '@/interfaces';
import Chart from './Chart';

import styles from './Chart.less';

const tabListData = [
  {
    key: 'navigationTiming',
    extra: [
      'fetchTime',
      'totalTime',
      'headerSize',
      'workerTime',
      'downloadTime',
      'pageLoadTime',
      'dnsLookupTime',
      'timeToFirstByte',
    ],
    alias: 'Navigation Timing',
    desc: 'Navigation Timing 提供了可用于衡量一个网站性能的数据',
  },
  {
    key: 'dataConsumption',
    extra: ['css', 'img', 'link', 'fetch', 'other', 'total', 'beacon', 'script', 'xmlhttprequest'],
    alias: 'dataConsumption',
    desc: 'dataConsumption 收集与文档相关的资源的性能指标 比如css、script、图像等等',
  },
  {
    key: 'networkInformation',
    extra: ['rtt', 'downlink'],
    alias: 'NetworkInformation',
    desc:
      'NetworkInformation 提供有关设备正在使用的连接与网络进行通信的信息 并提供了在连接类型更改时通知脚本的事件',
  },
  {
    key: 'firstPaint',
    alias: '首次绘制 FP',
    desc: 'FP 标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点',
  },
  {
    key: 'firstContentfulPaint',
    alias: '首次内容绘制 (FCP)',
    desc:
      'FCP 标记的是浏览器渲染来自 DOM 第一位内容的时间点 该内容可能是文本、图像、SVG 甚至 <canvas> 元素',
  },
  {
    key: 'firstInputDelay',
    alias: '首次输入延迟 (FID)',
    desc:
      'FID 测量用户首次与站点交互时（即，当他们单击链接，点击按钮或使用自定义的，由JavaScript驱动的控件）到浏览器实际能够回应这种互动的延时',
  },
  {
    key: 'largestContentfulPaint',
    alias: '最大内容绘制 (LCP)',
    desc: `LCP 标记的是浏览器渲染的最大的那个元素，可能是

    1. 元素
    2. 里面的元素
    3. 元素
    4. 一个有background-image:url样式的元素
    5. 块级元素包括 text节点或者其他内联元素 的元素`,
  },
];

const PerformanceStatistic: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<{
    tab: string;
    extra: string;
  }>({
    tab: 'firstPaint',
    extra: '',
  });
  const handleTabChange = React.useCallback(
    (key) => {
      setActiveTab(() => {
        const current = tabListData.find((tab) => tab.key === key);
        return {
          tab: key,
          extra: current?.extra ? current.extra[0] : '',
        };
      });
    },
    [setActiveTab],
  );

  const tabList = React.useMemo(() => {
    const handleExtraMenuSelect = (e: any) => {
      setActiveTab((state) => ({
        ...state,
        extra: e.key,
      }));
    };
    return tabListData.map((tab) => {
      return {
        key: tab.key,
        tab: tab.extra ? (
          <Dropdown
            overlay={
              <Menu selectedKeys={[activeTab.extra]} onClick={handleExtraMenuSelect}>
                {tab.extra.map((ex) => (
                  <Menu.Item key={ex}>{ex}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={['click']}
          >
            <div className={styles.tab}>
              <div className={styles.tabTitle}>
                <Typography.Text className={styles.tabTitleText}>{tab.alias}</Typography.Text>
                <Tooltip title={tab.desc}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </div>
              <Typography.Text type="secondary">
                {tab.key} <DownOutlined />
              </Typography.Text>
            </div>
          </Dropdown>
        ) : (
          <div className={styles.tab}>
            <div className={styles.tabTitle}>
              <Typography.Text className={styles.tabTitleText}>{tab.alias}</Typography.Text>
              <Tooltip title={tab.desc}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <Typography.Text type="secondary">{tab.key}</Typography.Text>
          </div>
        ),
      };
    });
  }, [activeTab]);

  const field = activeTab.extra || activeTab.tab;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: 'analysis/getPerformanceStatistics',
      payload: {
        type: activeTab.tab,
      },
    });
  }, [dispatch, activeTab.tab]);
  const performance = useSelector<RootState, AnalysisModelState['performance']>(
    (state) => state.analysis.performance,
  );
  const data = activeTab.extra ? performance?.map((d) => d[activeTab.tab] || d) : performance;
  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects['analysis/getPerformanceStatistics']!,
  );

  return (
    <Card
      className={styles.root}
      tabList={tabList}
      activeTabKey={activeTab.tab}
      onTabChange={handleTabChange}
      loading={loading}
    >
      <Chart field={field} data={data} />
    </Card>
  );
};

export default PerformanceStatistic;
