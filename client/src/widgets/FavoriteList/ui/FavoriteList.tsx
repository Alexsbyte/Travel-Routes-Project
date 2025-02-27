import { getAllUserFavoritesThunk } from '@/entities/favorite';
import { RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import styles from './FavoriteList.module.css';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

export function FavoriteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { favorites, loading, error } = useAppSelector((state) => state.favorites);
  const navigate = useNavigate();

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
  }, [dispatch, user, navigate]);

  if (!user) {
    return <></>; // Не рендерим ничего, если редирект происходит
  }

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
