import styles from './OneRoutePage.module.css';
import { Image } from 'antd';
import { Carousel } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import React, { useEffect, useState } from 'react';
import { getAllRoutesThunk } from '@/entities/route';
import { OneRouteItem } from '@/widgets/OneRouteItem';
import { usePageTitle } from '@/shared/hooks/pageTitle';
import { CommentSection } from '@/widgets/CommentSection/ui/CommentSection';

export function OneRoutePage(): React.JSX.Element {
  const { id } = useParams();
  const routes = useAppSelector((store) => store.route.routes);
  const dispatch = useAppDispatch();
  const [showGallery, setShowGallery] = useState(false);
  usePageTitle()
  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  const route = routes.find((route) => route.id.toString() === `${id}`);

  if (!route) {
    return <div>Маршрут не найден</div>;
  }

  const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  ];

  return (
    <>
      <div className={styles.routePage}>
        {/* Карта и галерея */}
        <div className={styles.mapGalleryContainer}>
          <div className={styles.map}>
            <h3>Здесь будет карта</h3>
          </div>

          <button
            className={styles.toggleGallery}
            onClick={() => setShowGallery(!showGallery)}
          >
            {showGallery ? 'Скрыть галерею' : 'Показать галерею'}
          </button>

          {/* Галерея накладывается на карту */}
          <div className={`${styles.carouselWrapper} ${showGallery ? styles.show : ''}`}>
            <Carousel
              draggable={true}
              autoplay={false}
              dots={true}
              arrows={false}
              className={styles.carousel}
            >
              {images.map((url, index) => (
                <div key={index}>
                  <Image preview={false} src={url} alt={`Gallery image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <OneRouteItem route={route} />
      </div>

      <CommentSection />
    </>
  );
}
