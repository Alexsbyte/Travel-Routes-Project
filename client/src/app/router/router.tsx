import { createBrowserRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import Layout from '../Layout/Layout';
import { WelcomePage, RouteFormPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: CLIENT_ROUTES.HOME,
        element: <WelcomePage />,
      },
      {
        path: CLIENT_ROUTES.ROUTE_FORM,
        element: <RouteFormPage />,
      },
    ],
  },
]);
