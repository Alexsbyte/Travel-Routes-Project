import styles from './OneRouteItem.module.css';
import React from 'react';
import { Route } from '@/entities/route';

type Props = {
  route: Route;
};

export function OneRouteItem({ route }: Props): React.JSX.Element {
  return (
    <>
      <h1 className={styles.routeTitle}>{route.title}</h1>
      <div className={styles.routeCategory}>
        <strong>Категория:</strong> {route.category}
      </div>
      <div className={styles.routeDescription}>
        <p>{route.description}</p>
      </div>
    </>
  );
}
