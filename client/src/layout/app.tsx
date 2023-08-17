import { Outlet } from 'react-router-dom';
import { Box, GlobalStyles, Toolbar } from '@mui/material';
import { AppHeader } from '@component/header';

const AppLayout = () => {
  return (
    <Box>
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
      <Outlet />

      {/* footer */}
    </Box>
  );
};

export default AppLayout;
