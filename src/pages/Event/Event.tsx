import React from 'react';
import { useDispatch, useParams, useSelector } from 'umi';
import { Row, Col, Tabs, Radio } from 'antd';

import BasicLayout from '@/layouts/Basic';
import type { RootState, EventModelState, IssueModelState } from '@/interfaces';

import { history } from '@/interfaces';
import Title from './components/Title';
import Profile from './components/Profile';
import Detail from './components/Detail';
import Trend from './components/Trend';
// import Description from './components/Description';

interface EventTabProps {
  event: EventModelState['current'];
  issue: IssueModelState['current'];
}
const EventTab: React.FC<EventTabProps> = ({ event, issue }) => {
  const tabList = React.useMemo(
    () => [
      {
        key: 'detail',
        tab: 'detail',
        disabled: false,
        element: (
          <Row gutter={24}>
            <Col xs={24} sm={24} md={6}>
              <Trend issue={issue} />
            </Col>
            <Col xs={24} sm={24} md={18}>
              <Profile event={event} />
              <Detail event={event} />
            </Col>
          </Row>
        ),
      },
    ],
    [event, issue],
  );
  const handlePreviousClick = React.useCallback(() => {
    if (event?.previous) history.push(`/issue/${issue?.id}/event/${event?.previous?.document_id}`);
  }, [event]);
  const handleNextClick = React.useCallback(() => {
    if (event?.next) history.push(`/issue/${issue?.id}/event/${event?.next?.document_id}`);
  }, [event]);

  return (
    <Tabs
      tabBarExtraContent={
        <Radio.Group size="small">
          <Radio.Button disabled={!event?.previous} onClick={handlePreviousClick}>
            {'< Older'}
          </Radio.Button>
          <Radio.Button disabled={!event?.next} onClick={handleNextClick}>
            {'Newer >'}
          </Radio.Button>
        </Radio.Group>
      }
    >
      {tabList.map((tab) => (
        <Tabs.TabPane tab={tab.tab} key={tab.key}>
          {tab.element}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

const Event: React.FC = () => {
  const dispatch = useDispatch();
  const { issue_id, event_id } = useParams();

  React.useEffect(() => {
    if (event_id === 'latest' && issue_id) {
      dispatch({ type: 'event/getLatestEvent', payload: { issue_id } });
    } else {
      dispatch({
        type: 'event/get',
        payload: {
          event_id,
          issue_id,
        },
      });
    }
    dispatch({ type: 'issue/get', payload: { issue_id } });
  }, [event_id, issue_id]);

  const event = useSelector<RootState, EventModelState['current']>((state) => state.event.current);
  const issue = useSelector<RootState, IssueModelState['current']>((state) => state.issue.current);

  return (
    <BasicLayout>
      {/* 标题信息 */}
      {event && issue && <Title event={event} issue={issue} />}

      {/* tab */}
      {event && issue && <EventTab event={event} issue={issue} />}

      {/* <Description /> */}
    </BasicLayout>
  );
};

export default Event;
