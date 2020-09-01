import { history } from 'umi';

/**
 * 用于判断是否有权限进入当前页面
 *
 * @param hasAuth
 */
export const useAccess = (hasAuth: boolean) => {
  if (!hasAuth) {
    history.push('/403');
  }
};
