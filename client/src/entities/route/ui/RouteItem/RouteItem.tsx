import React from 'react';
import { Tag } from 'antd';
import { Carousel } from '@mantine/carousel';
import { Link } from 'react-router-dom';
import { Route } from '../../model/RouteTypes';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';
import { Button, Card, Group, Text, Image, Box } from '@mantine/core';
// import styles from './RouteItem.module.css';

type Props = {
  route: Route;
  selectedRoute: Route | null;
};

export function RouteItem({ route, selectedRoute }: Props): React.JSX.Element {
  const getImageUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `${import.meta.env.VITE_API}images/routes/${url}`;
    }
  };

  const slides = route.photos.map((photo, id) => (
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
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb={10}
        style={{
          border:
            selectedRoute?.id === route.id ? '5px solid rgba(24, 151, 255, 0.08)' : '',
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
          <Text fw={500} style={{ marginRight: '120px' }}>
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
            {route.category.split(',').map((category, id) => (
              <Tag key={id} color="blue" style={{ marginRight: '8px' }}>
                {category}
              </Tag>
            ))}
          </div>
        </Group>

        <Text size="sm" c="dimmed">
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
      </Card>
    </>
  );
}
