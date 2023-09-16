import { Box, styled } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, MenuItemStyles } from 'react-pro-sidebar';
import Typography from '@component/typography';
import { Can } from '@context/permissionContext';
import { menus } from './menus';

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
                    <Can I="read" a={menu.permission} key={menu.id}>
                      <SubMenu label={menu.name}>
                        {menu.children.map((subMenu) => (
                          <Can I="read" a={subMenu.permission} key={subMenu.id}>
                            <MenuItem
                              icon={<Icon size={20} />}
                              component={<NavLink end={true} to={sideLink(subMenu.link)} />}
                            >
                              {subMenu.name}
                            </MenuItem>
                          </Can>
                        ))}
                      </SubMenu>
                    </Can>
                  );
                } else {
                  return (
                    <Can I="read" a={menu.permission} key={menu.id}>
                      <MenuItem icon={<Icon size={20} />} component={<NavLink end={true} to={sideLink(menu.link)} />}>
                        {menu.name}
                      </MenuItem>
                    </Can>
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
