import { Navigate, Outlet } from 'react-router-dom';
import { routes } from './routes.ts';
import { useAppStore } from '../../entities/store';

export const PrivateRoutes = () => {
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={routes.login} />;
};
