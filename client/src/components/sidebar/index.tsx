import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';

const menuItemStyles: MenuItemStyles = {
  button: {
    [`&.active`]: {
      backgroundColor: '#13395e',
      color: '#b6c8d9',
    },
  },
};

const Sidebar = () => {
  return (
    <ProSidebar>
      <div>Logo</div>
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem component={<NavLink to="/documentation" />}>
          Documentation
        </MenuItem>
        <MenuItem component={<NavLink to="/calendar" />}> Calendar</MenuItem>
        <MenuItem component={<NavLink to="/e-commerce" />}>E-commerce</MenuItem>
        <SubMenu label="Charts">
          <MenuItem component={<NavLink to="/calendar" />}> Calendar</MenuItem>
          <MenuItem component={<NavLink to="/e-commerce" />}>
            E-commerce
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
