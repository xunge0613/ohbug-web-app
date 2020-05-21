import React from 'react';
import { useDispatch, useLocation, useParams, useSelector } from 'umi';
import type { EventModelState, IssueModelState } from 'umi';
import { Row, Col, Spin, Tabs } from 'antd';

import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import type { RootState } from '@/interfaces';

import Title from './components/Title';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Trend from './components/Trend';
// import Description from './components/Description';

const Event: React.FC = () => {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;
  const { target } = useParams();

  useMount(() => {
    const { issue_id } = query;

    if (target === 'latest' && issue_id) {
      dispatch({ type: 'event/getLatestEvent', payload: { issue_id } });
      dispatch({ type: 'issue/get', payload: { issue_id } });
    } else {
      dispatch({
        type: 'event/get',
        payload: {
          event_id: target,
        },
      });
    }
  });

  const event = useSelector<RootState, EventModelState['current']>((state) => state.event.current);
  const issue = useSelector<RootState, IssueModelState['current']>((state) => state.issue.current);
  const loading = useSelector<RootState, boolean>(
    (state) =>
      state.loading.effects['event/getLatestEvent']! &&
      state.loading.effects['issue/getLatestIssue']!,
  );

  const tabList = React.useMemo(
    () => [
      {
        key: 'detail',
        tab: 'detail',
        disabled: false,
        element: (
          <Row gutter={24}>
            <Col xs={24} sm={24} md={18}>
              <Profile event={event!} />
              <Detail event={event!} />
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Trend issue={issue!} />
            </Col>
          </Row>
        ),
      },
      {
        key: 'replay',
        tab: 'replay',
        disabled: !event?.replay,
        element: <div>reply</div>,
      },
    ],
    [event, issue],
  );

  return (
    <BasicLayout>
      <Spin spinning={loading} delay={500}>
        {event && issue && (
          <>
            {/* 标题信息 */}
            <Title event={event} issue={issue} />

            {/* tab */}
            <Tabs>
              {tabList.map((tab) => (
                <Tabs.TabPane tab={tab.tab} key={tab.key}>
                  {tab.element}
                </Tabs.TabPane>
              ))}
            </Tabs>

            {/* <Description /> */}
          </>
        )}
      </Spin>
    </BasicLayout>
  );
};

export default Event;
