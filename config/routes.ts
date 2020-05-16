export default [
  { exact: true, path: '/', redirect: '/project' },
  {
    exact: true,
    path: '/project',
    component: '@/pages/Project',
    wrappers: ['@/wrappers/auth'],
    // layout
    menu: {
      name: '项目 Project',
      icon: 'project',
    },
  },
  {
    exact: true,
    path: '/issue',
    component: '@/pages/Issue',
    wrappers: ['@/wrappers/auth'],
    // layout
    menu: {
      name: '问题 Issue',
      icon: 'issues-close',
    },
  },
  {
    exact: true,
    path: '/event/:target',
    component: '@/pages/Event',
    wrappers: ['@/wrappers/auth'],
  },
  // {
  //   exact: true,
  //   path: '/feedback',
  //   component: '@/pages/Feedback',
  //   wrappers: ['@/wrappers/auth'],
  //   // layout
  //   menu: {
  //     name: '反馈 Feedback',
  //     icon: 'coffee',
  //   },
  // },
  // {
  //   exact: true,
  //   path: '/dashboard',
  //   component: '@/pages/Dashboard',
  //   wrappers: ['@/wrappers/auth'],
  //   // layout
  //   menu: {
  //     name: '仪表盘 Dashboard',
  //     icon: 'dashboard',
  //   },
  // },
  {
    exact: true,
    path: '/login',
    component: '@/pages/Login',
    layout: {
      hideMenu: true,
      hideNav: true,
    },
  },
  {
    exact: true,
    path: '/create-organization',
    component: '@/pages/CreateOrganization',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/404',
    component: '@/pages/NotFound',
    layout: {
      hideMenu: true,
      hideNav: true,
    },
  },
  {
    redirect: '/404',
  },
];
