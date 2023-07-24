import { Outlet } from 'react-router-dom';
import Toolbar from '../components/toolbar';
import Sidebar from '../components/sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-row h-[100%]">
      {/* app sidebar */}
      <Toolbar />

      {/* sidebar */}
      <Sidebar />

      {/* main layout */}
      <div>
        {/* header (static) */}

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
