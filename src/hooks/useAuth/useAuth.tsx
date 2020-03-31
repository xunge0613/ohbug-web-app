import React from 'react';
import { useLocation, history } from 'umi';
import { useDispatch, useSelector } from 'react-redux';

import { getGithub } from '../../utils';
import { RootState } from '../../store';
import { UserState } from '../../models';

interface UseAuth {
  isLogin: boolean;
}
/**
 * 用于鉴定当前是否登录
 * 先进入 isLogin 页
 * 未登录直接跳转到登录页
 * 已登录则获取用户相关信息 获取完毕后退出 isLogin
 *
 * @param Component
 */
const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const github = getGithub();
  const { pathname } = useLocation();

  // 根据 cookie 内是否含有 id 判断登录态
  const auth = Boolean(github.id);
  const [isLogin, setLogin] = React.useState(false);
  const user = useSelector<RootState, UserState>(state => state.user);

  React.useEffect(() => {
    async function getAllProjectInfo(): Promise<any> {
      // 根据 Organization id 获取对应所有的 Project
      await dispatch({ type: 'project/getAllProjectByOrganizationId' });
    }

    async function getUserInfo(): Promise<any> {
      try {
        if (!Object.keys(user).length) {
          // 没有 user 信息 需要获取
          await dispatch({ type: 'user/get' });
        } else if (pathname === '/login') {
          // 已经有了 user 信息
          history.replace('/');
        }
      } catch (error) {
        history.replace('/login');
      }
    }

    async function run(): Promise<any> {
      if (!auth) {
        // 未登录状态
        setLogin(false);

        if (pathname !== '/login') {
          history.replace('/login');
        }
      } else {
        // 登录状态
        await getUserInfo();
        await getAllProjectInfo();
        setLogin(true);
      }
    }

    run();
  }, []); // eslint-disable-line

  return { isLogin };
};

export default useAuth;
