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
      icon: 'icon-ohbug-projector-line',
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
      icon: 'icon-ohbug-error-warning-line',
    },
  },
  {
    exact: true,
    path: '/issue/:issue_id/event/:event_id',
    component: '@/pages/Event',
    wrappers: ['@/wrappers/auth'],
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
    component: '@/pages/LogIn',
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    exact: true,
    path: '/signup',
    component: '@/pages/SignUp',
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    exact: true,
    path: '/bindUser',
    component: '@/pages/BindUser',
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    exact: true,
    path: '/create-organization',
    component: '@/pages/CreateOrganization',
    wrappers: ['@/wrappers/auth'],
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    exact: true,
    path: '/404',
    component: '@/pages/NotFound',
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
  },
  {
    redirect: '/404',
  },
];
