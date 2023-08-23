import { Outlet } from 'react-router-dom';
import { Box, GlobalStyles, Toolbar, styled } from '@mui/material';
import { AppHeader } from '@component/header';
import AppFooter from '@component/footer/app';

const AppLayout = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <GlobalStyles
        styles={{
          body: {
            background: '#ffffff',
            fontFamily: "'IBM Plex Sans', sans-serif",
          },
        }}
      />
      <AppHeader />
      <Toolbar />
      <Main>
        <Outlet />
      </Main>

      <AppFooter />
    </Box>
  );
};

const Main = styled(Box)({
  minHeight: 'calc(100% - 124px)',

  '@media (max-width: 768px)': {
    minHeight: 'calc(100% - 116px)',
  },
});

export default AppLayout;
