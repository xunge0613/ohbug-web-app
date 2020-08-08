import { useDispatch, useLocation, useSelector } from 'umi';
import type { InviteModelState } from 'umi';

import { RootState } from '@/interfaces';
import { useMount } from '@/hooks';

export function useInvite() {
  const dispatch = useDispatch();
  // @ts-ignore
  const { query } = useLocation();
  const invite = useSelector<RootState, InviteModelState['current']>((s) => s.invite.current);
  useMount(() => {
    if (!invite) {
      dispatch({
        type: 'invite/get',
        payload: {
          uuid: query.invite,
        },
      });
    }
  });

  if (query && 'invite' in query && invite) {
    return {
      isInvite: true,
      subTitle: `${invite?.inviter?.name} 邀请您加入 ${invite?.organization?.name}`,
    };
  }

  return {
    isInvite: false,
    subTitle: '登录帐户以开始全面监控您的应用。',
  };
}
