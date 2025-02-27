import { getAllUserFavoritesThunk } from '@/entities/favorite';
import { RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import styles from './FavoriteList.module.css';

export function FavoriteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { favorites, loading, error } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllUserFavoritesThunk());
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {!favorites || favorites.length === 0 ? (
        <p className={styles.emptyMessage}>Вы ещё не добавили маршруты в избранное.</p>
      ) : (
        favorites
          .filter((favorite) => favorite.route)
          .map((favorite) => (
            <div key={favorite.route.id} className={styles.card}>
              <RouteItem route={favorite.route} />
            </div>
          ))
      )}
    </div>
  );
}
