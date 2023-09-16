import { LayoutDashboard, Server } from 'lucide-react';

export const menus = [
  {
    id: 'menu',
    name: 'Menu',
    links: [
      {
        id: 'overview',
        name: 'Overview',
        Icon: LayoutDashboard,
        link: '',
        permission: 'overview',
      },
      {
        id: 'collections',
        name: 'Collections',
        Icon: Server,
        link: '/collections',
        permission: 'database',
      },
      {
        id: 'charts',
        name: 'Charts',
        Icon: Server,
        link: '',
        permission: 'overview',
        children: [
          {
            id: 'calendar2',
            name: 'Calendar',
            Icon: Server,
            link: '/calendar',
            permission: 'overview',
          },
          {
            id: 'ecommerce2',
            name: 'E-commerce',
            Icon: Server,
            link: '/ecommerce',
            permission: 'overview',
          },
        ],
      },
    ],
  },
];
