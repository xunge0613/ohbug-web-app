import React from 'react';
import { useDispatch, useLocation, history, useSelector } from 'umi';
import { Button } from 'antd';

import type { RootState, InviteModelState } from '@/interfaces';
import { useMount } from '@/hooks';
import { LoginTemplate } from '@/components';

const Invite: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // @ts-ignore
  const uuid = location?.query?.id;
  useMount(() => {
    // @ts-ignore
    if (!uuid) history.replace('/');
    else {
      dispatch({
        type: 'invite/get',
        payload: {
          uuid,
        },
      });
    }
  });
  const invite = useSelector<RootState, InviteModelState['current']>(
    (state) => state.invite.current,
  );
  const loading = useSelector<RootState, boolean>((state) => state.loading.effects['invite/get']!);
  const handleJoinClick = React.useCallback(() => {
    history.push('/login', { uuid });
  }, []);

  return (
    <LoginTemplate
      title={`Hi~ ${invite?.inviter?.name} 邀请你加入 ${invite?.organization?.name}`}
      loading={loading}
    >
      <Button type="primary" block onClick={handleJoinClick}>
        加入团队
      </Button>
    </LoginTemplate>
  );
};

export default Invite;
