import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const AppLayout = () => {
  return (
    <Box>
      {/* header */}

      {/* body */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </Box>

      {/* footer */}
    </Box>
  );
};

export default AppLayout;
