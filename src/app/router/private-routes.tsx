import { Navigate, Outlet } from 'react-router-dom';
import { routes } from './routes.ts';

export const PrivateRoutes = () => {
  const isLoggedIn = true;

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login} />;
};
