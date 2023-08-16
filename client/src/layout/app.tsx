import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ClickAwayListener, GlobalStyles, Toolbar } from '@mui/material';
import { AppHeader } from '@component/header';
import Drawer from '@component/drawer';

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const openSidebar = () => setOpen(true);
  const closeSidebar = () => setOpen(false);

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
      <ClickAwayListener onClickAway={closeSidebar}>
        <Box>
          <AppHeader open={open} openSidebar={openSidebar} closeSidebar={closeSidebar} />
          <Drawer open={open} closeSidebar={closeSidebar} />
        </Box>
      </ClickAwayListener>
      <Toolbar />
      <Outlet />

      {/* footer */}
    </Box>
  );
};

export default AppLayout;
