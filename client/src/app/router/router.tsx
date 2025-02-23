import { createBrowserRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import Layout from '../Layout/Layout';
import { WelcomePage, RouteFormPage } from '@/pages';
import { AuthGuard } from '@/shared/hocs/AuthGuard';
import { OneRoutePage } from '@/pages/OneRoutePage/ui/OneRoutePage';

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
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
        path: `${ CLIENT_ROUTES.ROUTE_PAGE}/:id`,
        element: <OneRoutePage />,
      },
    ],
  },
]);
