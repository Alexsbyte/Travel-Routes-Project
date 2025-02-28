import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import { Route } from '../../model/RouteTypes';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

// import { FavoriteSection } from '@/widgets/FavoriteSection';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { Button, Card, Group, Text, Image, Box } from '@mantine/core';
import { createFavoriteThunk, deleteFavoriteThunk } from '@/entities/favorite';
import { LikeButton } from './LikeButton';
import styles from './RouteItem.module.css';


type Props = {
  route: Route;
  selectedRoute?: Route | null;
  isFavoriteList: boolean
};

export function RouteItem({ route, selectedRoute, isFavoriteList }: Props): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const getImageUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `${import.meta.env.VITE_API}images/routes/${url}`;
    }
  };

  const [userFavorite, setUserFavorite] = useState(false)
  const dispatch = useAppDispatch();


  const handleLikeClick = async () => {
    if (!user) return;
  
    try {
      if (userFavorite) {
        // Удаляем лайк
        await dispatch(deleteFavoriteThunk(route.id));
      } else {
        // Добавляем лайк
        await dispatch(createFavoriteThunk({ user_id: user.id, route_id: route.id }));
      }
  
      // Только после успешного запроса меняем локальное состояние
      setUserFavorite(prev => !prev);
    } catch (error) {
      console.error('Ошибка при изменении избранного:', error);
    }
  };
  

  useEffect(() => {
    if (!isFavoriteList) {
      const userFavoriteRoute = route.favorite?.some(el => el.user_id === user?.id);
      setUserFavorite(userFavoriteRoute);
    } else {
      setUserFavorite(true);
    }
  }, [route.favorite, user, isFavoriteList]);



  const slides = route.photos?.map((photo, id) => (
    <Carousel.Slide key={id}>
      <Image
        style={{
          width: '100%', // Изображение будет растягиваться по ширине контейнера
          height: '100%', // Высота изображения будет равна высоте контейнера карусели
          objectFit: 'cover', // Изображение будет заполнять контейнер карусели, обрезаясь при необходимости
        }}
        radius="md"
        src={getImageUrl(photo.url)}
        alt={`Route image ${photo.url}`}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      />
    </Carousel.Slide>
  ));

  return (
    <>
      <Card 
      className={styles.container}  
       shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb={10}
        style={{
          border:
            selectedRoute?.id === route.id ? '3px solid rgba(16, 198, 46, 0.7)' : '',
          backgroundColor:
            selectedRoute?.id === route.id
              ? 'rgba(127, 187, 244, 0.18)'
              : 'rgba(127, 187, 244, 0.18)',
        }}
      >
        <Card.Section>
          {/* Обновили Box для карусели с фиксированной высотой */}
          <Box style={{ width: '100%', height: '230px', overflow: 'hidden' }}>
            <Carousel
              mt={21}
              mr={21}
              ml={21}
              maw={330}
              key={route.id}
              align="start"
              slidesToScroll={1}
              speed={500}
              draggable={false}
              height={200}
              slideGap="md"
              controlsOffset="xs"
              controlSize={30}
              styles={{
                control: {
                  backgroundColor: 'rgba(116, 178, 235, 0.71)', // Непрозрачный фон
                  opacity: 1, // Убираем прозрачность
                },
              }}
            >
              {slides}
            </Carousel>
          </Box>
        </Card.Section>

        <Group
          justify="space-between"
          mt="md"
          mb="xs"
          style={{ position: 'relative', display: 'flex' }}
        >
          <Text 
          className={styles.text} 
          fw={500} style={{ marginRight: '120px' }}>
            {route.title}
          </Text>
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: 10,
            }}
          >
           
              <Tag  color="blue" style={{ marginRight: '8px' }}>
                {route.category}
              </Tag>
           
          </div>
        </Group>

        <Text className={styles.description} size="sm" c="dimmed">
          {route.description}
        </Text>


        <Link
          to={`${CLIENT_ROUTES.ROUTE_PAGE}/${route.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button color="blue" fullWidth mt="md" radius="md">
            Перейти к маршруту
          </Button>
        </Link>
        <LikeButton handleLikeClick={handleLikeClick} userFavorite={userFavorite} />
      </Card>
    </>
  );
}
