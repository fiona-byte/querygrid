import loadable, { LoadableComponent } from '@loadable/component';

type RouterType = {
  title: string;
  path: string;
  element: LoadableComponent<unknown>;
};

export const dashboard: RouterType[] = [
  {
    path: '',
    element: loadable(() => import('../pages/dashboard/overview')),
    title: 'overview',
  },
  {
    path: 'tables',
    element: loadable(() => import('../pages/dashboard/tables')),
    title: 'tables',
  },
];

export const page: RouterType[] = [
  {
    path: 'projects',
    element: loadable(() => import('../pages/project/project')),
    title: 'projects',
  },
  {
    path: 'create',
    element: loadable(() => import('../pages/project/create')),
    title: 'create',
  },
];

export const authentications: RouterType[] = [
  {
    path: 'login',
    element: loadable(() => import('../pages/authentication/login')),
    title: 'login',
  },
];
