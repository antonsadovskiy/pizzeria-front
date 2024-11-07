import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import { routes } from './routes.ts';
import App from '../../App.tsx';
import { PrivateRoutes } from './private-routes.tsx';
import { LoginPage } from '../../pages/auth/login-page';
import { ProductsPage } from '../../pages/products-page';
import { RegisterPage } from '../../pages/auth/register-page';
import { AddProductPage } from '../../pages/add-product-page';
import { OrdersPage } from '../../pages/orders-page';
import { CategoriesPage } from '../../pages/categories-page';
import { UpdateProductPage } from '../../pages/update-product-page';
import { CartPage } from '../../pages/cart-page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.root} element={<App />}>
      <Route path={routes.root} element={<Navigate to={routes.products} />} />

      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />

      <Route element={<PrivateRoutes />}>
        {/*<Route path={routes.admin} element={<AdminPage />} />*/}
        {/*<Route path={routes.adminAddTrain} element={<AddNewTrainPage />} />*/}
        {/*<Route path={routes.adminEditTrain} element={<EditTrainPage />} />*/}
        {/*<Route path={routes.adminAddRoute} element={<AddNewRoutePage />} />*/}
        {/*<Route path={routes.adminEditRoute} element={<EditRoutePage />} />*/}
        {/*<Route path={routes.adminAddVoyage} element={<AddNewVoyagePage />} />*/}
        {/*<Route path={routes.adminEditVoyage} element={<EditVoyagePage />} />*/}

        <Route path={routes.products} element={<ProductsPage />} />
        <Route path={routes.addProduct} element={<AddProductPage />} />
        <Route path={routes.updateProduct} element={<UpdateProductPage />} />
        <Route path={routes.orders} element={<OrdersPage />} />
        <Route path={routes.categories} element={<CategoriesPage />} />
        <Route path={routes.cart} element={<CartPage />} />
        {/*<Route path={routes.editUser} element={<EditUserPage />} />*/}
        {/*<Route path={routes.myTickets} element={<MyTicketsPage />} />*/}
      </Route>
    </Route>,
  ),
);
