import { ReactNode } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '@layout/dashboard';
import AppLayout from '@layout/app';
import AuthLayout from '@layout/authentication';
import { dashboard, page, authentications } from './routes';
import PermissionProvider from '@context/permissionContext';
import { useProjectSetup } from '@hooks/useProjectSetup';
import { utils } from '@utils/index';

type Props = {
  children: ReactNode;
};

const AppSetup = ({ children }: Props) => {
  const { isSuccess, data } = useProjectSetup();

  return isSuccess && !data?.data ? <Navigate to="/setup" /> : children;
};

const Authenticated = ({ children }: Props) => {
  const isAuthenticated = utils.getAuthentication();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Protected = ({ children }: Props) => {
  return (
    <AppSetup>
      <Authenticated>
        <PermissionProvider>{children}</PermissionProvider>
      </Authenticated>
    </AppSetup>
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
            <AppSetup>
              <AuthLayout />
            </AppSetup>
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
            <AppSetup>
              <div>NOT FOUND</div>
            </AppSetup>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
