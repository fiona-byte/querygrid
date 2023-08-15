import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { dashboard, page, authentications } from './routes';
import DashboardLayout from '../layout/dashboard';
import AuthUserProvider from '../contexts/authUserContext';
import AppLayout from '../layout/app';
import AuthLayout from '../layout/authentication';

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
        <Route path="/" element={<AuthLayout />}>
          {authenticationsRoutes}
        </Route>

        <Route
          path="/"
          element={
            <AuthUserProvider>
              <AppLayout />
            </AuthUserProvider>
          }
        >
          {pagesRoutes}
        </Route>

        <Route
          path="/project/:project"
          element={
            <AuthUserProvider>
              <DashboardLayout />
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
