import React from 'react';
import { Card, Row, Col, Skeleton, Typography, Descriptions, Timeline } from 'antd';
import {
  UserOutlined,
  LinkOutlined,
  RocketOutlined,
  WarningOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Timeago from 'react-timeago';
import moment from 'moment';
import { Action } from '@ohbug/types';
import RrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

import StackInfo from '../../../../components/StackInfo';
import { RootState } from '../../../../store';
import { EventState } from '../../../../models';

import styles from './Description.less';

function getMessageAndIconByActionType(
  action: Action,
): {
  message: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
} {
  const status = action.data?.res?.status;
  switch (action.type) {
    case 'click':
      return {
        message: action.data?.selector,
        icon: <UserOutlined />,
      };
    case 'navigation':
      return {
        message: (
          <>
            <strong>From:</strong> <em>{action.data?.from}</em> <strong>To:</strong>{' '}
            <em>{action.data?.to}</em>
          </>
        ),
        icon: <LinkOutlined />,
      };
    case 'ajax':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong> <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: <RocketOutlined />,
        color: status > 400 ? 'red' : status <= 200 ? 'green' : 'grey',
      };
    case 'fetch':
      return {
        message: (
          <>
            <strong>{action.data?.req?.method}</strong> <em>{action.data?.req?.url}</em>{' '}
            <strong>[{action.data?.res?.status}]</strong>
          </>
        ),
        icon: <RocketOutlined />,
        color: status > 400 ? 'red' : status <= 200 ? 'green' : 'grey',
      };
    case 'console':
      return {
        message: `[${action.message}] ${action.data}`,
        icon: <CodeOutlined />,
      };
    default:
      return {
        message: '',
        icon: <WarningOutlined />,
        color: 'ref',
      };
  }
}

interface ContentList {
  detail: React.ReactElement;
  replay: React.ReactElement;
}

const Description: React.FC = () => {
  const event = useSelector<RootState, EventState['current']>(state => state.event.current);
  const [activeTab, setActiveTab] = React.useState<keyof ContentList>('detail');

  const replayRef = React.useRef<HTMLDivElement>(null);
  const handleTabChange = React.useCallback((key: any): void => {
    setActiveTab(key);
  }, []);

  const eventLoading = !event;

  React.useEffect(() => {
    if (event && event.replay) {
      new RrwebPlayer({
        target: replayRef.current, // 可以自定义 DOM 元素
        data: {
          events: event.replay.data,
        },
      });
    }
  }, [event, activeTab]);

  if (event) {
    const contentList: ContentList = {
      detail: (
        <Row className={styles.root} gutter={36}>
          <Col span={16}>
            <Skeleton loading={eventLoading}>
              <Row className={styles.group} gutter={36}>
                <Col span={12}>
                  <Typography.Paragraph>
                    <Typography.Title className={styles.title} level={3}>
                      {event.type}
                    </Typography.Title>
                    <Typography.Text ellipsis>{event.detail.message}</Typography.Text>
                  </Typography.Paragraph>
                </Col>
                <Col span={12}>
                  {/* <Statistic
                    className={styles.statistics}
                    title={<Tooltip title="受此事件影响的用户数">USERS</Tooltip>}
                    value={event.user.ip_address}
                  /> */}
                </Col>
              </Row>
            </Skeleton>
            <Skeleton loading={eventLoading}>
              {/* all */}
              {event.detail.message && (
                <Descriptions
                  className={styles.descriptions}
                  title="错误信息"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item>{event.detail.message}</Descriptions.Item>
                </Descriptions>
              )}

              {/* unhandledrejectionError */}
              {/* uncaughtError */}
              {event.detail.stack && (
                <Descriptions
                  className={styles.descriptions}
                  title="堆栈信息"
                  column={1}
                  size="small"
                >
                  <Descriptions.Item>
                    <StackInfo stack={event.detail.stack} source={event.source} />
                  </Descriptions.Item>
                </Descriptions>
              )}

              {/* resourceError */}
              {event.detail.selector && (
                <Descriptions
                  className={styles.descriptions}
                  title="DOM 信息"
                  column={1}
                  size="small"
                  bordered
                >
                  <Descriptions.Item label="HTML">{event.detail.outerHTML}</Descriptions.Item>
                  <Descriptions.Item label="selector">{event.detail.selector}</Descriptions.Item>
                  <Descriptions.Item label="nodeType">{event.detail.nodeType}</Descriptions.Item>
                  <Descriptions.Item label="tagName">{event.detail.tagName}</Descriptions.Item>
                  <Descriptions.Item label="id">{event.detail.id}</Descriptions.Item>
                  <Descriptions.Item label="className">{event.detail.className}</Descriptions.Item>
                  <Descriptions.Item label="name">{event.detail.name}</Descriptions.Item>
                  <Descriptions.Item label="src">{event.detail.src}</Descriptions.Item>
                </Descriptions>
              )}

              {/* ajaxError */}
              {/* fetchError */}
              {event.type === 'ajaxError' && (
                <Descriptions
                  className={styles.descriptions}
                  title="HTTP 信息"
                  column={1}
                  size="small"
                  bordered
                >
                  <Descriptions.Item label="method">{event.detail.req.method}</Descriptions.Item>
                  <Descriptions.Item label="url">{event.detail.req.url}</Descriptions.Item>
                  <Descriptions.Item label="data">{event.detail.req.data}</Descriptions.Item>

                  <Descriptions.Item label="status">{event.detail.res.status}</Descriptions.Item>
                  <Descriptions.Item label="statusText">
                    {event.detail.res.statusText}
                  </Descriptions.Item>
                  <Descriptions.Item label="response">
                    {event.detail.res.response}
                  </Descriptions.Item>
                </Descriptions>
              )}

              {/* websocketError */}
              {event.type === 'websocketError' && (
                <Descriptions
                  className={styles.descriptions}
                  title="WebSocket 信息"
                  column={1}
                  size="small"
                  bordered
                >
                  <Descriptions.Item label="url">{event.detail.url}</Descriptions.Item>
                  <Descriptions.Item label="timeStamp">{event.detail.timeStamp}</Descriptions.Item>
                  <Descriptions.Item label="readyState">
                    {event.detail.readyState}
                  </Descriptions.Item>
                  <Descriptions.Item label="protocol">{event.detail.protocol}</Descriptions.Item>
                  <Descriptions.Item label="extensions">
                    {event.detail.extensions}
                  </Descriptions.Item>
                  <Descriptions.Item label="binaryType">
                    {event.detail.binaryType}
                  </Descriptions.Item>
                  <Descriptions.Item label="bufferedAmount">
                    {event.detail.bufferedAmount}
                  </Descriptions.Item>
                </Descriptions>
              )}

              <div className={styles.descriptions}>
                <div className={styles.title}>Actions 信息</div>
                <Timeline>
                  {event?.actions?.map((action, index) => {
                    const { message, icon, color } = getMessageAndIconByActionType(action);
                    return (
                      <Timeline.Item key={action.timestamp + index} dot={icon} color={color}>
                        <div className={styles.action}>
                          <div className={styles.type}>{action.type}</div>
                          <div className={styles.data}>{message}</div>
                          <div className={styles.time}>
                            {moment(action.timestamp).format('HH:mm:ss')}
                          </div>
                        </div>
                      </Timeline.Item>
                    );
                  })}
                  <Timeline.Item dot={<WarningOutlined />} color="red">
                    <div className={styles.action}>
                      <div className={styles.type}>exception</div>
                      <div className={styles.data}>{event.detail.message}</div>
                      <div className={styles.time}>{moment(event.time).format('HH:mm:ss')}</div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </div>
            </Skeleton>
          </Col>

          <Col span={8}>
            <Skeleton loading={eventLoading}>
              {/* all */}
              <Descriptions
                className={styles.descriptions}
                title="概要信息"
                column={1}
                size="small"
                bordered
              >
                <Descriptions.Item label="time">
                  <Timeago date={event.time} />
                </Descriptions.Item>
                <Descriptions.Item label="url">{event.url}</Descriptions.Item>
                <Descriptions.Item label="title">{event.title}</Descriptions.Item>
                <Descriptions.Item label="user">{event.user.ip_address}</Descriptions.Item>
              </Descriptions>

              {/* all */}
              <Descriptions
                className={styles.descriptions}
                title="设备信息"
                column={1}
                size="small"
                bordered
              >
                <Descriptions.Item label="browser">{event.browser}</Descriptions.Item>
                <Descriptions.Item label="browser.version">
                  {event.browser_version}
                </Descriptions.Item>
                <Descriptions.Item label="device">{event.device_type}</Descriptions.Item>
                <Descriptions.Item label="engine">{event.engine}</Descriptions.Item>
                <Descriptions.Item label="engine.version">{event.engine_version}</Descriptions.Item>
                <Descriptions.Item label="os">{event.os}</Descriptions.Item>
                <Descriptions.Item label="os.version">{event.os_version}</Descriptions.Item>
              </Descriptions>
            </Skeleton>
          </Col>
        </Row>
      ),
      replay: <div ref={replayRef} />,
    };
    const tabList = [
      {
        key: 'detail',
        tab: 'detail',
      },
      {
        key: 'replay',
        tab: 'replay',
        disabled: !event.replay,
      },
    ];

    return (
      <Card tabList={tabList} activeTabKey={activeTab} onTabChange={handleTabChange}>
        {contentList[activeTab]}
      </Card>
    );
  }
  return null;
};

export default Description;
