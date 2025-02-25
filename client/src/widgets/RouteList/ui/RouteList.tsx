import React from 'react';
import { Route, RouteItem } from '@/entities/route';
import styles from './RouteList.module.css';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

interface RouteListProps {
  filteredRoutes: Route[];
}

export function RouteList({ filteredRoutes }: RouteListProps): React.JSX.Element {
  const loading = useAppSelector((store) => store.route.loading);

  return (
    <div className={styles.container}>
      {!loading && filteredRoutes.length === 0 && (
        <div className={styles.notFoundMessage}>Маршруты не найдены</div>
      )}

      {filteredRoutes.length > 0 &&
        filteredRoutes.map((route) => (
          <div className={styles.card} key={route.id}>
            <RouteItem route={route} />
          </div>
        ))}
    </div>
  );
}
