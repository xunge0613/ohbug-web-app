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

  function getUserInfo() {
    try {
      if (auth && (!user || !Object.keys(user).length)) {
        // 没有 user 信息 需要获取
        const { id } = auth!;
        dispatch({ type: 'user/get', payload: { id } });
      } else if (pathname === '/login') {
        // 已经有了 user 信息
        history.replace('/');
      } else if (!user.organizations?.length && !organization) {
        // 有了 user 没有 organization
        history.replace('/create-organization');
        setLogin(true);
      } else if (user) {
        setLogin(true);
      }
    } catch (error) {
      history.replace('/login');
    }
  }
  React.useEffect(() => {
    if (!auth) {
      // 未登录状态
      setLogin(false);

      if (pathname !== '/login') {
        history.replace('/login');
      }
    } else {
      // 登录状态
      getUserInfo();

      if (invite) {
        dispatch({
          type: 'invite/bind',
        });
      }
    }
  }, [user, organization, project, invite]);

  return { isLogin };
};
