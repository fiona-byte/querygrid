import { useState, MouseEvent, ReactNode } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { useTranslator } from '../../hooks/useTranslator';
import { Languages } from '../../i18n/type';
import images from '../../assets/images';

const settings = ['Profile', 'Logout'];
const languages = ['en'] as const;

const stringAvatar = (name: string) => ({
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

const FlagImage = styled('img')({
  width: '24px',
  height: '24px',
  borderRadius: '9px',
  marginRight: '11px',
});

const FlagText = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  textAlign: 'center',
  color: theme.palette.content.main,
  fontSize: '14px',
}));

type DropdownProps = {
  tooltip: string;
  open: null | HTMLElement;
  openMenu: (event: MouseEvent<HTMLElement>) => void;
  closeMenu: () => void;
  title: JSX.Element;
  id: string;
  children?: ReactNode;
};

const Dropdown = ({
  id,
  title,
  openMenu,
  open,
  closeMenu,
  tooltip,
  children,
}: DropdownProps) => {
  return (
    <Box sx={{ flexGrow: 0, ml: '10px' }}>
      <Tooltip title={tooltip}>
        <IconButton onClick={openMenu} sx={{ p: 0 }}>
          {title}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '25px' }}
        id={id}
        anchorEl={open}
        elevation={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={closeMenu}
      >
        {children}
      </Menu>
    </Box>
  );
};

const Header = () => {
  const user = useUser();
  const { language, changeLanguage } = useTranslator();
  const [elUser, setElUser] = useState<null | HTMLElement>(null);
  const [elLang, setElLang] = useState<null | HTMLElement>(null);

  const openUserMenu = (event: MouseEvent<HTMLElement>) =>
    setElUser(event.currentTarget);
  const handleCloseUserMenu = () => setElUser(null);
  const openLangMenu = (event: MouseEvent<HTMLElement>) =>
    setElLang(event.currentTarget);
  const handleCloseLangMenu = () => setElLang(null);

  const chooseLang = (lang: Languages) => {
    changeLanguage(lang);
    setElLang(null);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Dropdown
            id="lang-menu"
            open={elLang}
            openMenu={openLangMenu}
            closeMenu={handleCloseLangMenu}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlagImage src={images.flags[language]} alt={language} />
                <FlagText>{language}</FlagText>
              </Box>
            }
            tooltip="Change Language"
          >
            {languages.map((language) => (
              <MenuItem key={language} onClick={() => chooseLang(language)}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FlagImage src={images.flags[language]} alt={language} />
                  <FlagText>{language}</FlagText>
                </Box>
              </MenuItem>
            ))}
          </Dropdown>

          <Dropdown
            id="user-menu"
            open={elUser}
            openMenu={openUserMenu}
            closeMenu={handleCloseUserMenu}
            title={
              <Avatar
                {...stringAvatar(
                  `${user?.first_name || 'Q'} ${user?.last_name || 'G'}`
                )}
              />
            }
            tooltip="User Setting"
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Dropdown>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;