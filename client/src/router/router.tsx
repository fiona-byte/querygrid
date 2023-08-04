import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { dashboard, page } from './routes';
import DashboardLayout from '../layout/dashboard';
import AuthUserProvider from '../contexts/authUserContext';

const Router = () => {
  const dashboardRoutes = dashboard.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  const pageRoutes = page.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  return (
    <BrowserRouter>
      <Routes>
        {pageRoutes}

        <Route
          path="/app/:app"
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
