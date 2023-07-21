import { Outlet } from 'react-router-dom';
import AppSidebar from '../components/appSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-row h-[100%]">
      {/* app sidebar */}
      <AppSidebar />

      {/* sidebar */}

      {/* main layout */}
      <div>
        {/* header (static) */}

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
