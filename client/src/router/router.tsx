import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '@layout/dashboard';
import AuthUserProvider from '@context/authUserContext';
import AppLayout from '@layout/app';
import AuthLayout from '@layout/authentication';
import { dashboard, page, authentications } from './routes';
import PermissionProvider from '@context/permissionContext';

const Router = () => {
  const dashboardRoutes = dashboard.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  const pagesRoutes = page.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  const authenticationsRoutes = authentications.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/" element={<AuthLayout />}>
          {authenticationsRoutes}
        </Route>
        <Route
          path="/"
          element={
            <AuthUserProvider>
              <PermissionProvider>
                <AppLayout />
              </PermissionProvider>
            </AuthUserProvider>
          }
        >
          {pagesRoutes}
        </Route>
        <Route
          path="/project/:project"
          element={
            <AuthUserProvider>
              <PermissionProvider>
                <DashboardLayout />
              </PermissionProvider>
            </AuthUserProvider>
          }
        >
          {dashboardRoutes}
        </Route>
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
