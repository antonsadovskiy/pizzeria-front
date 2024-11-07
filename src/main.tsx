import { createRoot } from 'react-dom/client';
import './index.css';
import { Api } from './entities/api';
import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';
import { App as AntdApp } from 'antd';

Api.setupInterceptors();

createRoot(document.getElementById('root')!).render(
  <AntdApp>
    <RouterProvider router={router} />
  </AntdApp>,
);
