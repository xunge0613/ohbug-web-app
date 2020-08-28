import { useDispatch, useLocation, useSelector } from 'umi';
import type { InviteModelState } from 'umi';

import { RootState } from '@/interfaces';
import { useMount } from '@/hooks';

type Type = 'login' | 'signup';

export function useInvite(type?: Type) {
  const dispatch = useDispatch();
  // @ts-ignore
  const { query } = useLocation();
  const invite = useSelector<RootState, InviteModelState['current']>((s) => s.invite.current);
  useMount(() => {
    if (!invite && query && 'invite' in query) {
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

  if (type === 'signup') {
    return {
      isInvite: false,
      subTitle: '注册账号开始全面监控您的应用。',
    };
  }
  return {
    isInvite: false,
    subTitle: '登录账号以开始全面监控您的应用。',
  };
}
