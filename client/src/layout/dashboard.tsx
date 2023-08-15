import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* sidebar */}
      <Sidebar />

      {/* main layout */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {/* header (static) */}
        <Header />

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
