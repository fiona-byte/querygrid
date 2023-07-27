import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '../components/toolbar';
import Sidebar from '../components/sidebar';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* app sidebar */}
      <Toolbar />

      {/* sidebar */}
      <Sidebar />

      {/* main layout */}
      <div>
        {/* header (static) */}

        <Outlet />
      </div>
    </Box>
  );
};

export default DashboardLayout;
