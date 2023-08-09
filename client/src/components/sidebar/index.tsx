import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { NavLink, useParams } from 'react-router-dom';

const menus = [
  {
    id: 'documentation',
    name: 'Documentation',
    icon: '',
    link: '/documentation',
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: '',
    link: '/calendar',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '',
    link: '/ecommerce',
  },
  {
    id: 'charts',
    name: 'Charts',
    icon: '',
    link: '',
    children: [
      {
        id: 'calendar2',
        name: 'Calendar',
        icon: '',
        link: '/calendar',
      },
      {
        id: 'ecommerce2',
        name: 'E-commerce',
        icon: '',
        link: '/ecommerce',
      },
    ],
  },
];

const menuItemStyles: MenuItemStyles = {
  button: {
    [`&.active`]: {
      backgroundColor: '#13395e',
      color: '#b6c8d9',
    },
  },
};

const Sidebar = () => {
  const { app } = useParams() as { app: string };
  const sideLink = (path: string) => `/${app}${path}`;

  return (
    <ProSidebar>
      <div>Logo</div>
      <Menu menuItemStyles={menuItemStyles}>
        {menus.map((menu) => {
          if (menu.children) {
            return (
              <SubMenu key={menu.id} label={menu.name}>
                {menu.children.map((subMenu) => (
                  <MenuItem
                    key={subMenu.id}
                    icon={subMenu.icon}
                    component={<NavLink to={sideLink(subMenu.link)} />}
                  >
                    {subMenu.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <MenuItem
                key={menu.id}
                icon={menu.icon}
                component={<NavLink to={sideLink(menu.link)} />}
              >
                {menu.name}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
