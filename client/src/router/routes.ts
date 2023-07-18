import loadable, { LoadableComponent } from '@loadable/component';

type RouterType = {
  title: string;
  path: string;
  element: LoadableComponent<unknown>;
};

export const routes: RouterType[] = [
  {
    path: '/',
    element: loadable(() => import('../pages/overview')),
    title: 'overview',
  },
];
