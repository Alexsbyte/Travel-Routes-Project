import { getAllUserFavoritesThunk } from '@/entities/favorite';
import { RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect } from 'react';
import styles from './FavoriteList.module.css';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

export function FavoriteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const { favorites, error } = useAppSelector((state) => state.favorites);

  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(getAllUserFavoritesThunk());
  //   }
  // }, [dispatch, user?.id]);
  
  useEffect(() => {
    if (!user) {
      navigate(CLIENT_ROUTES.AUTHORIZATION); // Если пользователь не авторизован, редиректим на страницу входа
    } else if (user.id) {
      dispatch(getAllUserFavoritesThunk());
    }
<!--   }, [dispatch, user, navigate]);

  if (!user) {
    return <></>; // Не рендерим ничего, если редирект происходит
  }

  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spin size="large" />
      </div>
    );
  } -->
  }, [dispatch, user?.id, favorites.length]);


  
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
