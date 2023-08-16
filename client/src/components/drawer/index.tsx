import { Link } from 'react-router-dom';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Brand } from '@component/header/app.styles';
import CloseIcon from '@assets/svg/closeIcon';
import images from '@assets/images';

interface IProps {
  open: boolean;
  closeSidebar: () => void;
}

const drawerWidth = '250px';

const menus = [
  {
    name: 'Settings',
    link: '/settings',
  },
  {
    name: 'Logout',
    link: '/pricing',
  },
];

const Sidebar = ({ open, closeSidebar }: IProps) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxHeight: '64px',
          height: '100%',
        }}
      >
        <IconButton onClick={closeSidebar} size="large" edge="start" color="inherit" aria-label="close">
          <CloseIcon />
        </IconButton>
        <Brand to="/" onClick={closeSidebar}>
          <img style={{ maxHeight: '30px' }} src={images.brand} alt="home" />
        </Brand>
        <div />
      </Box>
      <Divider />

      <List sx={{ p: 0 }}>
        {menus.map((menu, index) => (
          <Box key={menu.name}>
            <Link to={menu.link} style={{ color: '#57565D', textDecoration: 'none' }}>
              <ListItem button sx={{ maxHeight: '64px', height: '100%' }}>
                <ListItemText primary={menu.name} />
              </ListItem>
            </Link>
            {index !== 3 && <Divider />}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
