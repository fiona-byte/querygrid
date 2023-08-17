import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarWrapper = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
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
  color: #313845a8;
  text-decoration: none;
  margin-right: 20px;
  height: 24px;
`;

export const AvatarLink = styled(Link)`
  text-decoration: none;
`;
