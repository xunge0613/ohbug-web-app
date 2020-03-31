export default [
  { exact: true, path: '/', redirect: '/project' },
  {
    exact: true,
    path: '/dashboard',
    component: '@/pages/Dashboard',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/project',
    component: '@/pages/Project',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/issue',
    component: '@/pages/Issue',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/event',
    component: '@/pages/Event',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/event/:target',
    component: '@/pages/Event/Detail',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/feedback',
    component: '@/pages/Feedback',
    wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/login',
    component: '@/pages/Login',
    // wrappers: ['@/wrappers/auth'],
  },
  {
    exact: true,
    path: '/create-organization',
    component: '@/pages/CreateOrganization',
    wrappers: ['@/wrappers/auth'],
  },
];
