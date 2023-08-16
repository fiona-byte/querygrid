import { cloneElement, MouseEvent, ReactElement, useState } from 'react';
import { Avatar, Box, Container, IconButton, Toolbar, useScrollTrigger } from '@mui/material';
import MenuIcon from '@assets/svg/menuIcon';
import images from '@assets/images';
import { AppBarWrapper, Brand, AvatarLink } from './app.styles';
import { useMobile } from '@hooks/useMobile';
import { useUser } from '@hooks/useUser';
import { utils } from '@utils/index';
import Dropdown from '../dropdown';

interface Props {
  openSidebar: () => void;
  closeSidebar: () => void;
  window?: () => Window;
  children?: ReactElement;
  open: boolean;
}

const ElevationScroll = (props: Props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  if (children) {
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return null;
};

type ProfileAvatar = {
  closeSidebar: () => void;
  first_name?: string;
  last_name?: string;
  size: number;
  fontSize: string;
};

const ProfileAvatar = (profileAvatar: ProfileAvatar) => (
  <AvatarLink to="/profile">
    <Avatar
      onClick={profileAvatar.closeSidebar}
      sx={{ width: profileAvatar.size, height: profileAvatar.size, fontSize: profileAvatar.fontSize }}
      {...utils.stringAvatar(`${profileAvatar.first_name || 'Q'} ${profileAvatar.last_name || 'G'}`)}
    />
  </AvatarLink>
);

const AppHeader = (props: Props) => {
  const user = useUser();
  const isMobile = useMobile();
  const [elUser, setElUser] = useState<null | HTMLElement>(null);

  const openUserMenu = (event: MouseEvent<HTMLElement>) => setElUser(event.currentTarget);
  const handleCloseUserMenu = () => setElUser(null);

  return (
    <ElevationScroll {...props}>
      <AppBarWrapper sx={{ backgroundColor: '#FFFFFF' }} open={props.open}>
        <Container maxWidth={false}>
          <Toolbar
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px !important' }}
          >
            {isMobile && (
              <IconButton onClick={props.openSidebar} size="small" edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            )}
            <Brand to="/" onClick={props.closeSidebar}>
              <img src={images.brand} alt="home" />
            </Brand>
            {isMobile ? (
              <ProfileAvatar
                closeSidebar={props.closeSidebar}
                first_name={user?.first_name}
                last_name={user?.last_name}
                size={32}
                fontSize="14px"
              />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown
                  title={
                    <Avatar
                      sx={{ width: 40, height: 40, fontSize: '16px' }}
                      {...utils.stringAvatar(`${user?.first_name || 'Q'} ${user?.last_name || 'G'}`)}
                    />
                  }
                  tooltip={`${user?.first_name} ${user?.last_name}`}
                  id="user-nav-menu"
                  open={elUser}
                  openMenu={openUserMenu}
                  closeMenu={handleCloseUserMenu}
                >
                  <Box>Profile</Box>
                  <Box>Settings</Box>
                  <Box>Logout</Box>
                </Dropdown>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBarWrapper>
    </ElevationScroll>
  );
};

export default AppHeader;
