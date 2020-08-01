export default [
  { exact: true, path: '/', wrappers: ['@/wrappers/auth'], redirect: '/organization-project' },
  {
    exact: true,
    path: '/organization-project',
    component: '@/pages/OrganizationProject',
    wrappers: ['@/wrappers/auth'],
    // layout
    menu: {
      name: '团队项目',
      icon: 'icon-ohbug-projector-line',
    },
  },
  {
    exact: true,
    path: '/organization-project/:project_id/getting-started',
    component: '@/pages/GettingStarted',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/issue',
    component: '@/pages/Issue',
    wrappers: ['@/wrappers/auth'],
    // layout
    menu: {
      name: '问题',
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
  {
    exact: false,
    path: '/settings/:organization_id',
    component: '@/pages/Settings',
    wrappers: ['@/wrappers/auth'],
    layout: {
      hideMenu: true,
      hideNav: true,
      hideFooter: true,
    },
    routes: [
      {
        exact: true,
        path: '/settings/:organization_id',
        redirect: '/settings/:organization_id/profile',
      },
      {
        exact: true,
        path: '/settings/:organization_id/profile',
        component: '@/pages/Settings/Organization/Profile',
      },
      {
        exact: true,
        path: '/settings/:organization_id/projects',
        component: '@/pages/Settings/Organization/Projects',
      },
      {
        exact: true,
        path: '/settings/:organization_id/members',
        component: '@/pages/Settings/Organization/Members',
      },
      // project settings
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id',
        redirect: '/settings/:organization_id/project/:project_id/profile',
      },
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id/profile',
        component: '@/pages/Settings/Project/Profile',
      },
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id/notification_rules',
        component: '@/pages/Settings/Project/Notification/Rules',
      },
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id/notification_setting',
        component: '@/pages/Settings/Project/Notification/Setting',
      },
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id/sourcemap',
        component: '@/pages/Settings/Project/SourceMap',
      },
      {
        exact: true,
        path: '/settings/:organization_id/project/:project_id/members',
        component: '@/pages/Settings/Project/Members',
      },
      {
        redirect: '/404',
      },
    ],
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
    path: '/invite',
    component: '@/pages/Invite',
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
