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
    path: 'collections',
    element: loadable(() => import('../pages/dashboard/collections')),
    title: 'collections',
  },
];

export const page: RouterType[] = [
  {
    path: 'projects',
    element: loadable(() => import('../pages/project/project')),
    title: 'projects',
  },
];

export const setup: RouterType[] = [
  {
    path: 'setup',
    element: loadable(() => import('../pages/authentication/setup')),
    title: 'setup',
  },
];

export const authentications: RouterType[] = [
  {
    path: 'login',
    element: loadable(() => import('../pages/authentication/login')),
    title: 'login',
  },
];
