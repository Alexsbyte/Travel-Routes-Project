import styles from './OneRoutePage.module.css';
import { Image } from 'antd';
import { Carousel } from 'antd';
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
        {showGallery ? 
        (<div className={`${styles.carouselWrapper}`}>
          <Carousel
            draggable={true}
            autoplay={false}
            dots={true}
            arrows={false}
            className={styles.carousel}
          >
            {images.map((url, index) => (
              <div key={index}>
                <Image preview={false} src={url} alt={`Gallery image ${index + 1}`} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
              </div>
            ))}
          </Carousel>
        </div>)
        :
        <div className={styles.map}>
        <YandexMap isEditable={false}/>
      </div>}
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
