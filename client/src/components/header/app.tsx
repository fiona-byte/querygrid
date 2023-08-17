import { cloneElement, MouseEvent, ReactElement, useState } from 'react';
import { Avatar, Box, Container, Toolbar, useScrollTrigger } from '@mui/material';
import images from '@assets/images';
import { AppBarWrapper, Brand, AvatarLink, Logo } from './app.styles';
import { useMobile } from '@hooks/useMobile';
import { useUser } from '@hooks/useUser';
import { utils } from '@utils/index';
import Dropdown from '../dropdown';

interface Props {
  window?: () => Window;
  children?: ReactElement;
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
  const logoSize = isMobile ? 32 : 42;
  const [elUser, setElUser] = useState<null | HTMLElement>(null);

  const openUserMenu = (event: MouseEvent<HTMLElement>) => setElUser(event.currentTarget);
  const handleCloseUserMenu = () => setElUser(null);

  return (
    <ElevationScroll {...props}>
      <AppBarWrapper sx={{ backgroundColor: '#FFFFFF' }}>
        <Container maxWidth={false}>
          <Toolbar
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px !important' }}
          >
            <Brand to="/projects">
              <Logo width={logoSize} height={logoSize} src={images.logo} alt="projects" />
            </Brand>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <Bell style={{ marginRight: '22px' }} size={24} color="#57565D" /> */}
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
          </Toolbar>
        </Container>
      </AppBarWrapper>
    </ElevationScroll>
  );
};

export default AppHeader;
