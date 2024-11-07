import { createRoot } from 'react-dom/client';
import './index.css';
import { Api } from './entities/api';
import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';

Api.setupInterceptors();

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
