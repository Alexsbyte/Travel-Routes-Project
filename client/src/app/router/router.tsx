import { createBrowserRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import Layout from '../Layout/Layout';
import { VerifyEmail } from '@/features/auth/VerifyEmail';
import { AuthGuard } from '@/shared/hocs/AuthGuard';
import { Suspense, lazy } from 'react';
import { CommentSection } from '@/widgets/CommentSection';
// Ленивый импорт страниц
const HomePage = lazy(() => import('@/pages/HomePage'));
const RouteFormPage = lazy(() => import('@/pages/RouteFormPage'));
const WelcomePage = lazy(() => import('@/pages/WelcomePage'));
const OneRoutePage = lazy(() => import('@/pages/OneRoutePage/'));

export const router = createBrowserRouter([
  {
    path: CLIENT_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: CLIENT_ROUTES.HOME,
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: CLIENT_ROUTES.WELCOME,
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <WelcomePage />
          </Suspense>
        ),
      },
      {
        path: CLIENT_ROUTES.VERIFY_EMAIL,
        element: <VerifyEmail />,
      },
      {
        path: CLIENT_ROUTES.COMMENT_FORM,
        element: <CommentSection />,
      },
      {
        path: CLIENT_ROUTES.ROUTE_FORM,
        element: (
          <AuthGuard>
            <Suspense fallback={<div>Загрузка...</div>}>
              <RouteFormPage />
            </Suspense>
          </AuthGuard>
        ),
      },
      {
        path: `${CLIENT_ROUTES.ROUTE_PAGE}/:id`,
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <OneRoutePage />
          </Suspense>
        ),
      },
    ],
  },
]);
