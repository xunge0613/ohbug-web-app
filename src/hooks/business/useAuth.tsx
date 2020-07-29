import React from 'react';
import { useLocation, useDispatch, useSelector, history } from 'umi';

import type { RootState, User, Organization, Project, Invite } from '@/interfaces';
import { getAuth } from '@/utils';

interface UseAuth {
  isLogin: boolean;
}
/**
 * 用于鉴定当前是否登录
 * 先进入 isLogin 页
 * 未登录直接跳转到登录页
 * 已登录则获取用户相关信息 获取完毕后退出 isLogin
 */
export const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const { pathname } = useLocation();
  const [isLogin, setLogin] = React.useState(false);

  const user = useSelector<RootState, User>((state) => state.user.current!);
  const organization = useSelector<RootState, Organization>((state) => state.organization.current!);
  const project = useSelector<RootState, Project>((state) => state.project.current!);
  const invite = useSelector<RootState, Invite>((state) => state.invite.current!);

  async function getUserInfo(): Promise<void> {
    try {
      if (!user || !Object.keys(user).length) {
        // 没有 user 信息 需要获取
        await dispatch({ type: 'user/get' });
      } else if (pathname === '/login') {
        // 已经有了 user 信息
        history.replace('/');
      } else if (!user.organizations?.length) {
        // 有了 user 没有 organization
        setLogin(true);
        history.replace('/create-organization');
      } else {
        setLogin(true);
      }
    } catch (error) {
      history.replace('/login');
    }
  }
  React.useEffect(() => {
    (async () => {
      if (!auth) {
        // 未登录状态
        setLogin(false);

        if (pathname !== '/login') {
          history.replace('/login');
        }
      } else {
        // 登录状态
        await getUserInfo();

        if (invite) {
          await dispatch({
            type: 'invite/bind',
          });
        }
      }
    })();
  }, [user, organization, project, invite]);

  return { isLogin };
};
