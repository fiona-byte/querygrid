import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '@component/sidebar';
import Header from '@component/header';
import { useMobile } from '@hooks/useMobile';
import { Toolbar } from '@mui/material';

const DashboardLayout = () => {
  const isMobile = useMobile();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isMobile) setShow(true);
    else setShow(false);
  }, [isMobile]);

  const toggleSidebar = () => setShow(!show);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Sidebar show={show} />

      {/* main layout */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={show} />
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
