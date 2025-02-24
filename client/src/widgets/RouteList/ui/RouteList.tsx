import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk, RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Spin } from 'antd';
import styles from './RouteList.module.css';

export function RouteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);
  const loading = useAppSelector((store) => store.route.loading);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setIsLoaded(true);
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      {!isLoaded && (
        <div className={styles.carouselContainer}> 
          <Spin size="large" />
        </div>
      )}

      {isLoaded && routes.length === 0 && (
        <div className={styles.notFoundMessage}>
          Маршруты не найдены
        </div>
      )}

      {isLoaded && routes.length > 0 && (
        routes.map((route) => (
          <div className={styles.card} key={route.id}>
            <RouteItem route={route} />
          </div>
        ))
      )}
    </div>
  );
}