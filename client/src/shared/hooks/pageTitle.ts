import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
  '/': 'Маршруты',
  '/welcome': 'Главная',
  '/createRoute': 'Создание маршрута',
  '/profile': 'Профиль | MyApp',
  '/route': 'Маршрут',
};

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || 'MyApp';
  }, [location.pathname]);
}
