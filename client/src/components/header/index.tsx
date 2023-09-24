import { cloneElement, MouseEvent, ReactElement, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Toolbar,
  useScrollTrigger,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  styled,
  Button,
  IconButton,
} from '@mui/material';
import { Bell, UserCircle, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import images from '@assets/images';
import { useMobile } from '@hooks/useMobile';
import { useUser } from '@hooks/useUser';
import { utils } from '@utils/index';
import Dropdown from '../dropdown';
import Typography from '@component/typography';
import Notification from '@component/notification';
import { useTranslator } from '@hooks/useTranslator';
import MenuIcon from '@assets/svg/menuIcon';

interface HeaderProps {
  window?: () => Window;
  children?: ReactElement;
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  dashboard?: 'true' | 'false';
}

const ElevationScroll = (props: HeaderProps) => {
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

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const { language, languages, changeLanguage } = useTranslator();
  const { user } = useUser();
  const isMobile = useMobile();
  const logoSize = isMobile ? 32 : 42;
  const [elUser, setElUser] = useState<null | HTMLElement>(null);
  const [elLang, setElLang] = useState<null | HTMLElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  const openUserMenu = (event: MouseEvent<HTMLElement>) => setElUser(event.currentTarget);
  const handleCloseUserMenu = () => setElUser(null);
  const openLangMenu = (event: MouseEvent<HTMLElement>) => setElLang(event.currentTarget);
  const handleCloseLangMenu = () => setElLang(null);

  const openNotification = () => setShowNotification(true);
  const closeNotification = () => setShowNotification(false);

  const onLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <Notification open={showNotification} closeNotification={closeNotification} />
      <ElevationScroll {...props}>
        <AppBarWrapper
          open={props.sidebarOpen}
          dashboard={props.toggleSidebar ? 'true' : 'false'}
          sx={{ backgroundColor: '#FFFFFF' }}
        >
          <Container maxWidth={false}>
            <Toolbar
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px !important' }}
            >
              {props.toggleSidebar ? (
                <>
                  {isMobile ? (
                    <IconButton onClick={props.toggleSidebar}>
                      <MenuIcon />
                    </IconButton>
                  ) : (
                    <span />
                  )}
                </>
              ) : (
                <Brand to="/projects">
                  <Logo width={logoSize} height={logoSize} src={images.logo} alt="projects" />
                </Brand>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FlagImage src={images.flags[language]} alt={language} />
                    </Box>
                  }
                  tooltip="languages"
                  id="lang-menu"
                  open={elLang}
                  openMenu={openLangMenu}
                  closeMenu={handleCloseLangMenu}
                >
                  {languages.map((language) => (
                    <MenuLinkBTN
                      key={language.short}
                      onClick={() => {
                        changeLanguage(language.short);
                        handleCloseLangMenu();
                      }}
                    >
                      <FlagImage src={images.flags[language.short]} alt={language.name} />
                      <MenuText>{language.name}</MenuText>
                    </MenuLinkBTN>
                  ))}
                </Dropdown>

                <Button style={{ marginRight: '10px' }} onClick={openNotification}>
                  <Bell size={24} color="#57565D" />
                </Button>

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
                  <MenuLink to="/profile">
                    <UserCircle size={20} color="#78787D" />
                    <MenuText>Profile</MenuText>
                  </MenuLink>
                  <MenuLink to="/settings">
                    <Settings size={20} color="#78787D" />
                    <MenuText>Settings</MenuText>
                  </MenuLink>
                  <MenuLinkBTN onClick={onLogout}>
                    <LogOut size={20} color="#DC4747" />
                    <MenuText sx={{ color: '#DC4747' }}>Logout</MenuText>
                  </MenuLinkBTN>
                </Dropdown>
              </Box>
            </Toolbar>
          </Container>
        </AppBarWrapper>
      </ElevationScroll>
    </>
  );
};

export const AppBarWrapper = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, dashboard }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: 0.5,
  }),
  ...(dashboard === 'true' && {
    width: 'calc(100% - 250px)',
  }),
  ...(open && {
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: 600,
    }),
  }),
}));

export const Brand = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Logo = styled('img')``;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 147px;
  height: 40px;
  text-decoration: none;
  padding: 0px 24px;

  &:hover {
    background-color: #e1e1e9;
  }
`;

export const MenuLinkBTN = styled('div')`
  display: flex;
  align-items: center;
  width: 147px;
  height: 40px;
  padding: 0px 24px;
  cursor: pointer;

  &:hover {
    background-color: #e1e1e9;
  }
`;

export const MenuText = styled(Typography.Paragraph)`
  margin-left: 14px;
  font-size: 16px;
  font-weight: 400;
  color: #78787d;
  text-transform: capitalize;
`;

export const AvatarLink = styled(Link)`
  text-decoration: none;
`;

const FlagImage = styled('img')({
  width: '24px',
  height: '24px',
  borderRadius: '4px',
});

export default Header;
