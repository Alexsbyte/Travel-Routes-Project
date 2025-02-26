import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import {
  createFavoriteThunk,
  deleteFavoriteThunk,
  getOneRouteFavoriteThunk,
} from '@/entities/favorite';
import { Button, Spin, message as antMessage } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './FavoriteSection.module.css';

interface RouteFavoriteProps {
  route_id: number;
}

export function FavoriteSection({ route_id }: RouteFavoriteProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { currentFavorite, loading } = useAppSelector((state) => state.favorites);
  const user = useAppSelector((state) => state.user.user);
  const [errorState, setErrorState] = useState<string | null>(null);

  const handleAddFavorite = () => {
    if (!user) {
      antMessage.error('Для добавления лайка необходимо авторизоваться');
      return;
    }

    if (currentFavorite) {
      // Если лайк уже поставлен, то удаляем его
      dispatch(deleteFavoriteThunk(route_id));
    } else {
      // Если лайк не поставлен, то ставим его
      dispatch(createFavoriteThunk({ route_id, user_id: user.id }));
    }
  };

  useEffect(() => {
    console.log(route_id, currentFavorite)
    if (route_id && !currentFavorite ) {
        console.log(route_id, 'renderrenderrendrreerreererererwfafdsvavwrbgwrgj')
      dispatch(getOneRouteFavoriteThunk(route_id));
    }
  }, [dispatch, route_id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (errorState) {
    return <div>{errorState}</div>;
  }

  return (
    <div className={styles.buttonContainer}>
      <Button
        type="text"
        icon={
          currentFavorite ? (
            <HeartFilled className={styles.liked} />
          ) : (
            <HeartOutlined className={styles.notLiked} />
          )
        }
        onClick={handleAddFavorite}
        className={styles.favoriteButton}
      >
      </Button>
    </div>
  );
}
