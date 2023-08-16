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
  width: 150px;

  img {
    max-width: 150px;
    width: 100%;
    max-height: 35px;
    height: 100%;
  }
`;

export const MenuLink = styled(Link)`
  color: #313845a8;
  text-decoration: none;
  margin-right: 40px;
`;

export const LoginLink = styled(Link)`
  color: #557ecd;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid #557ecd;
  padding: 10px 30px;
`;

export const MobileLoginLink = styled(Link)`
  color: #557ecd;
  text-decoration: none;
`;

export const GetStartedLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  margin-left: 20px;
  background-color: #557ecd;
  padding: 10px 30px;
`;
