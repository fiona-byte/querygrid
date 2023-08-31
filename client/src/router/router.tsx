import { ReactNode } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '@layout/dashboard';
import AuthUserProvider from '@context/authUserContext';
import AppLayout from '@layout/app';
import AuthLayout from '@layout/authentication';
import { dashboard, page, authentications } from './routes';
import PermissionProvider from '@context/permissionContext';
import AppSetupProvider from '@context/appSetupContext';

type Props = {
  children: ReactNode;
};

const Protected = ({ children }: Props) => {
  return (
    <AppSetupProvider>
      <AuthUserProvider>
        <PermissionProvider>{children}</PermissionProvider>
      </AuthUserProvider>
    </AppSetupProvider>
  );
};

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
        <Route
          path="/"
          element={
            <AppSetupProvider>
              <AuthLayout />
            </AppSetupProvider>
          }
        >
          {authenticationsRoutes}
        </Route>
        <Route
          path="/"
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          {pagesRoutes}
        </Route>
        <Route
          path="/project/:project"
          element={
            <Protected>
              <DashboardLayout />
            </Protected>
          }
        >
          {dashboardRoutes}
        </Route>
        <Route
          path="*"
          element={
            <AppSetupProvider>
              <div>NOT FOUND</div>
            </AppSetupProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
