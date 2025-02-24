import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { RoutesPage } from '@/pages';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { Loader } from '@/shared/ui/Loader';
import { usePageTitle } from '@/shared/hooks/pageTitle';

export function HomePage(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const isInitialized = useAppSelector((state) => state.user.isInitialized);
  const navigate = useNavigate();
  usePageTitle()
  useEffect(() => {
    if (!isInitialized) return; // Ждём завершения инициализации
    if (!user) {
      navigate(CLIENT_ROUTES.WELCOME); // Если нет пользователя, редиректим
    }
  }, [user, isInitialized, navigate]);

  // Показываем лоадер, пока не загрузились токены
  if (!isInitialized) {
    return <Loader loading={true} />;
  }

  // Если юзер не авторизован, не рендерим контент
  if (!user) {
    return <></>;
  }

  return <RoutesPage />;
}
