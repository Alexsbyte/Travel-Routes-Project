import { createBrowserRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import Layout from '../Layout/Layout';
import { WelcomePage, RouteFormPage, HomePage, RoutesPage } from '@/pages';
import { AuthGuard } from '@/shared/hocs/AuthGuard';

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: CLIENT_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: CLIENT_ROUTES.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: CLIENT_ROUTES.ROUTE_FORM,
        element: (
          <AuthGuard>
            <RouteFormPage />
          </AuthGuard>
        ),
      },
      {
        path: CLIENT_ROUTES.ROUTE,
        element: <RoutesPage />,
      },
      
    ],
  },
]);
