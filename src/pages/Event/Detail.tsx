import React from 'react';
import { useDispatch, useLocation, useParams } from 'umi';

import { useMount } from '@/hooks';
import BasicLayout from '@/layouts/Basic';
import Description from './components/Description';

const Detail: React.FC = () => {
  const dispatch = useDispatch();
  const { query } = useLocation() as any;
  const { target } = useParams();

  useMount(() => {
    const { issue_id } = query;

    if (target === 'latest' && issue_id) {
      dispatch({ type: 'event/getLatestEvent', payload: { issue_id } });
    } else {
      dispatch({
        type: 'event/get',
        payload: {
          event_id: target,
        },
      });
    }
  });

  return (
    <BasicLayout>
      <Description />
    </BasicLayout>
  );
};

export default Detail;
