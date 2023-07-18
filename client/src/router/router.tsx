import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import DashboardLayout from '../layout/dashboard';

const Router = () => {
  const pageRoutes = routes.map(({ path, title, element: Element }) => (
    <Route key={title} path={path} element={<Element />} />
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {pageRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
