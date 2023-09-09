import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar from '@component/sidebar';
import Header from '@component/header';
import { useMobile } from '@hooks/useMobile';
import { GlobalStyles, Toolbar, styled } from '@mui/material';

const DashboardLayout = () => {
  const isMobile = useMobile();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isMobile) setShow(true);
    else setShow(false);
  }, [isMobile]);

  const toggleSidebar = () => setShow(!show);

  return (
    <Container>
      <GlobalStyles
        styles={{
          body: {
            fontFamily: "'IBM Plex Sans', sans-serif",
          },
        }}
      />
      <Sidebar show={show} />

      {/* main layout */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={show} />
        <Toolbar />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </Container>
  );
};

const Container = styled(Box)({
  overflow: 'hidden',
  display: 'flex',
  height: '100%',
});

const Main = styled(Box)(() => ({
  background: '#F4F6FC',
  height: '100%',
  padding: '16px 24px',
}));

export default DashboardLayout;
