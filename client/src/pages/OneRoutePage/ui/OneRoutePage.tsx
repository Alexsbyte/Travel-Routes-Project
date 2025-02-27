import styles from './OneRoutePage.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect, useState } from 'react';
import { OneRouteItem } from '@/widgets/OneRouteItem';
import { usePageTitle } from '@/shared/hooks/pageTitle';
import { CommentSection } from '@/widgets/CommentSection/ui/CommentSection';
import { YandexMap } from '@/widgets/Map/ui/YandexMap';
import { getOneRouteThunk } from '@/entities/route/api/RouteThunk';
import { setPoints } from '@/entities/point';
import { Loader } from '@/shared/ui/Loader';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

export function OneRoutePage(): React.JSX.Element {
  const { id } = useParams();
  const route = useAppSelector((store) => store.route.route);
  const dispatch = useAppDispatch();
  const [showGallery, setShowGallery] = useState(false);
  usePageTitle();

  useEffect(() => {
    if (id) {
      dispatch(getOneRouteThunk(+id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (route?.points) {
      dispatch(setPoints(route.points));
    }
  }, [dispatch, route?.points]);

  if (!route) {
    return <Loader loading={true} />;
  }

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
          width: '100%', // Изображение будет занимать всю ширину контейнера
          height: '100%', // Изображение будет занимать всю высоту контейнера
          objectFit: 'contain', // Изображение будет сохранять свои пропорции
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
      <div className={styles.routePage}>
        {/* Карта и галерея */}
        <div className={styles.mapGalleryContainer}>
          {showGallery ? (
            <div className={`${styles.carouselWrapper}`}>
              <Carousel
                mt={21}
                mr={21}
                ml={21}
                key={route.id}
                align="start"
                slidesToScroll={1}
                speed={500}
                draggable={false}
                height={400}
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
            </div>
          ) : (
            <div className={styles.map}>
              <YandexMap isEditable={false} />
            </div>
          )}
          <button
            className={styles.toggleGallery}
            onClick={() => setShowGallery(!showGallery)}
          >
            {showGallery ? 'Скрыть галерею' : 'Показать галерею'}
          </button>
        </div>

        <OneRouteItem route={route} />
      </div>

      <CommentSection />
    </>
  );
}
