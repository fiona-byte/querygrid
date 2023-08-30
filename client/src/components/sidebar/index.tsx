import { Box, styled } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, MenuItemStyles } from 'react-pro-sidebar';
import { LayoutDashboard, Server } from 'lucide-react';
import Typography from '@component/typography';

const menus = [
  {
    id: 'menu',
    name: 'Menu',
    links: [
      {
        id: 'overview',
        name: 'Overview',
        Icon: LayoutDashboard,
        link: '',
      },
      {
        id: 'collections',
        name: 'Collections',
        Icon: Server,
        link: '/collections',
      },
      {
        id: 'charts',
        name: 'Charts',
        Icon: Server,
        link: '',
        children: [
          {
            id: 'calendar2',
            name: 'Calendar',
            Icon: Server,
            link: '/calendar',
          },
          {
            id: 'ecommerce2',
            name: 'E-commerce',
            Icon: Server,
            link: '/ecommerce',
          },
        ],
      },
    ],
  },
];

type SidebarProps = {
  show: boolean;
};

const Sidebar = ({ show }: SidebarProps) => {
  const { project } = useParams() as { project: string };
  const sideLink = (path: string) => `/project/${project}${path}`;

  return (
    <SidebarContainer collapsed={show} collapsedWidth="0px" backgroundColor="#111929">
      <Brand>Logo</Brand>
      <Menu menuItemStyles={menuItemStyles}>
        {menus.map(({ id, name, links }) => (
          <Box key={id}>
            <MenuHeading variant="h6">{name}</MenuHeading>

            <Box>
              {links.map(({ Icon, ...menu }) => {
                if (menu.children) {
                  return (
                    <SubMenu key={menu.id} label={menu.name}>
                      {menu.children.map((subMenu) => (
                        <MenuItem
                          key={subMenu.id}
                          icon={<Icon size={20} />}
                          component={<NavLink end={true} to={sideLink(subMenu.link)} />}
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
                      icon={<Icon size={20} />}
                      component={<NavLink end={true} to={sideLink(menu.link)} />}
                    >
                      {menu.name}
                    </MenuItem>
                  );
                }
              })}
            </Box>
          </Box>
        ))}
      </Menu>
    </SidebarContainer>
  );
};

const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: '16px',
    fontWeight: 400,
    fontFamily: "'IBM Plex Sans', sans-serif",
  },
  subMenuContent: () => ({
    backgroundColor: 'transparent',
  }),
  button: {
    '&.active, &:hover': {
      backgroundColor: '#557ECD',
      color: '#ffffff',
      fontWeight: 600,

      '.ps-menu-icon svg': {
        fill: '#ffffff',
      },
    },
  },
};

const SidebarContainer = styled(ProSidebar)(() => ({
  border: 'none !important',
  color: '#9A999D',
}));

const Brand = styled(Box)({
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '27px',
});

const MenuHeading = styled(Typography.Heading)({
  padding: '32px 32px 16px 27px',
  textTransform: 'capitalize',
  fontSize: '16px',
});

export default Sidebar;
