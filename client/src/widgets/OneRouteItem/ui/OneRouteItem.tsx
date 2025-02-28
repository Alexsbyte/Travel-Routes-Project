import styles from './OneRouteItem.module.css';
import React from 'react';
import { Route } from '@/entities/route';
import { Box, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FavoriteSection } from '@/widgets/FavoriteSection';

type Props = {
  route: Route;
};

export function OneRouteItem({ route }: Props): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.routeTitle}>{route.title}</h1>
      <div className={styles.routeCategory}>
        <strong>Категория:</strong> {route.category}
      </div>
      <div className={styles.routeDescription}>
        <strong>Описание: </strong>
        {route.description}
      </div>
      <div className={styles.btn}>
        <Box pb={20} pos={'relative'}>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Назад
          </Button>
        </Box>
      </div>
      <div>
        <FavoriteSection route_id={route.id} />
      </div>
    </>
  );
}
