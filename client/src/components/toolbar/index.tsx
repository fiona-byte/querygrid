import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Box, styled } from '@mui/material';

const apps = [
  { id: 1, link: '789782' },
  { id: 2, link: '463y566g' },
  { id: 3, link: '789753h382' },
  { id: 4, link: '7896hg5356782' },
];

const ToolbarContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '100%',
  backgroundColor: theme.palette.toolbar.main,
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 2px',
  alignItems: 'center',
}));

const ToolbarLink = styled(Link)(({ theme }) => ({
  borderWidth: '2px',
  borderColor: theme.palette.toolbar.border,
  borderStyle: 'solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  width: '48px',
  height: '48px',

  '&.active': {
    borderColor: 'red',
  },
}));

const getActiveToolbar = (location: string, path: string) => {
  return location.includes(path) ? 'active' : '';
};

const Toolbar = () => {
  const { pathname } = useLocation();

  return (
    <ToolbarContainer>
      <PerfectScrollbar>
        {apps.map(({ id, link }) => (
          <ToolbarLink
            key={id}
            sx={{ mb: '10px' }}
            className={getActiveToolbar(pathname, link)}
            to={`/${link}`}
          >
            <Plus color="white" size={28} />
          </ToolbarLink>
        ))}
      </PerfectScrollbar>

      <ToolbarLink to="/create">
        <Plus color="white" size={28} />
      </ToolbarLink>
    </ToolbarContainer>
  );
};

export default Toolbar;
