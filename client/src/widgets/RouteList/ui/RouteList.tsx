import styles from './RouteList.module.css';
import React from 'react';
import { Route, RouteItem } from '@/entities/route';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

interface RouteListProps {
  filteredRoutes: Route[];
  selectedRoute: Route | null; 
  sortedRoutes: Route[]
}

export function RouteList({ filteredRoutes, selectedRoute }: RouteListProps): React.JSX.Element {
  const loading = useAppSelector((store) => store.route.loading);

  return (
    <div className={styles.container}>
      {!loading && filteredRoutes.length === 0 && (
        <div className={styles.notFoundMessage}>Маршруты не найдены</div>
      )}

      {filteredRoutes.length > 0 &&
        filteredRoutes.map((route) => (
          <div
            className={`${styles.card} ${selectedRoute?.id === route.id ? styles.selected : ''}`}  // Добавляем класс для выделения выбранного маршрута
            key={route.id}
          >
            <RouteItem route={route} key={route.id} />
          </div>
        ))}
    </div>
  );
}
