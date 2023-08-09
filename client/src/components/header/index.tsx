import { useState, MouseEvent, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import { useUser } from '../../hooks/useUser';
import { useTranslator } from '../../hooks/useTranslator';
import { Languages } from '../../i18n/type';
import images from '../../assets/images';

const settings = ['Profile', 'Logout'];
const languages = ['en'] as const;

const stringAvatar = (name: string) => ({
  children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
});

const AppHeader = styled(AppBar)(() => ({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderColor: 'rgba(36, 37, 38, 0.1)',
}));

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
  mr?: string;
  ml?: string;
  children?: ReactNode;
};

const Dropdown = (dropdown: DropdownProps) => {
  return (
    <Box sx={{ flexGrow: 0, mr: dropdown.mr, ml: dropdown.ml }}>
      <Tooltip title={dropdown.tooltip}>
        <IconButton onClick={dropdown.openMenu} sx={{ p: 0 }}>
          {dropdown.title}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '25px' }}
        id={dropdown.id}
        anchorEl={dropdown.open}
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
        open={Boolean(dropdown.open)}
        onClose={dropdown.closeMenu}
      >
        {dropdown.children}
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
    <AppHeader position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography sx={{ mr: 'auto' }}>Page</Typography>
          <Dropdown
            id="lang-menu"
            open={elLang}
            openMenu={openLangMenu}
            closeMenu={handleCloseLangMenu}
            mr={'40px'}
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
    </AppHeader>
  );
};

export default Header;
