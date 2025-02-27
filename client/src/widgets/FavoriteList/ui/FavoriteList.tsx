import { getAllUserFavoritesThunk } from '@/entities/favorite';
import { RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect } from 'react';
import styles from './FavoriteList.module.css';

export function FavoriteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { favorites, error } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllUserFavoritesThunk());
    }
  }, [dispatch, user?.id, favorites.length]);

  console.log(favorites, "dddddd");
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {!favorites || favorites.length === 0 ? (
        <p className={styles.emptyMessage}>Вы ещё не добавили маршруты в избранное.</p>
      ) : (
        favorites
          .map((favorite) => (
            <div key={favorite.id} className={styles.card}>
              <RouteItem route={favorite} isFavoriteList={true} />
            </div>
          ))
      )}
    </div>
  );
}
