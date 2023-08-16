import { cloneElement, ReactElement } from 'react';
import { Box, Container, IconButton, Toolbar, useScrollTrigger } from '@mui/material';
import MenuIcon from '../../assets/svg/menuIcon';
import { AppBarWrapper, Brand, MenuLink, LoginLink, GetStartedLink, MobileLoginLink } from './app.styles';
import { useMobile } from '../../hooks/useMobile';
import images from '../../assets/images';

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

const AppHeader = (props: Props) => {
  const isMobile = useMobile();

  return (
    <Box>
      <ElevationScroll {...props}>
        <AppBarWrapper sx={{ backgroundColor: '#FFFFFF' }} open={props.open}>
          <Container maxWidth="lg">
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
                <MobileLoginLink to="/login" onClick={props.closeSidebar}>
                  Login
                </MobileLoginLink>
              ) : (
                <Box>
                  <MenuLink to="/pricing" onClick={props.closeSidebar}>
                    Pricing
                  </MenuLink>
                  <MenuLink to="/docs" onClick={props.closeSidebar}>
                    docs
                  </MenuLink>
                  <LoginLink to="/login" onClick={props.closeSidebar}>
                    Login
                  </LoginLink>
                  <GetStartedLink to="/app/lists" onClick={props.closeSidebar}>
                    Get Started
                  </GetStartedLink>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBarWrapper>
      </ElevationScroll>
    </Box>
  );
};

export default AppHeader;
