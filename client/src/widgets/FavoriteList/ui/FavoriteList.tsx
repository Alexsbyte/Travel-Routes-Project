import { getAllUserFavoritesThunk } from '@/entities/favorite';
import { RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Spin } from 'antd';
import React, { useEffect } from 'react';

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
    console.log(loading, favorites, 111111111);

    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {!favorites || favorites.length === 0 ? (
        <p>Вы ещё не добавили маршруты в избранное.</p>
      ) : (
        favorites
        .filter((favorite) => favorite.route)
        .map((favorite) => (
          <RouteItem
             key={favorite.route.id}
            route={favorite.route} // Передаём `Route` без изменений
          />
        ))
      )}
    </div>
  );
}
