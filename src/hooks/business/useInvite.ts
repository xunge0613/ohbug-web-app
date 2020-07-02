import { useLocation, useSelector } from 'umi';
import type { InviteModelState } from 'umi';
import { RootState } from '@/interfaces';

export function useInvite() {
  const { state } = useLocation();
  const invite = useSelector<RootState, InviteModelState['current']>((s) => s.invite.current);
  if (state && 'uuid' in state && invite) {
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
