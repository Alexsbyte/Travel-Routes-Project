import React from 'react';
import { Carousel } from 'antd';
import { Image, Tag } from 'antd';
import styles from './RouteItem.module.css';
import { Route } from '../../model/RouteTypes';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

type Props = {
  route: Route;
};

export function RouteItem({ route }: Props): React.JSX.Element {

  const getImageUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      return `${import.meta.env.VITE_API}images/routes/${url}`;
    }
  };

  const slides = route.photos.map((photo) => (
    <div key={photo.url} className={styles.slideContainer}>
      <Image
        className={styles.fullSizeImage}
        preview={false}
        src={getImageUrl(photo.url)}
        alt={`Route image ${photo.url}`}
      />
    </div>
  ));

  return (
    <Link to={`${CLIENT_ROUTES.ROUTE_PAGE}/${route.id}`}>
      <div className={styles.container}>
        {/* Поделился */}
        <div className={styles.sharedBy}>
          Поделился: <strong>{route.user.username}</strong>
        </div>
        {/* Теги */}
        <div className={styles.tags}>
          {route.category.split(',').map((category, index) => (
            <Tag key={index} color="blue" style={{ marginRight: '8px' }}>
              {category}
            </Tag>
          ))}
        </div>
        {/* Карусель */}
        <div>
          <Carousel
            dots
            autoplay={false}
            arrows={false}
            swipeToSlide={true}
            slidesToScroll={1}
            touchMove={true}
            speed={500}
            draggable={true}
            easing="ease-in-out"
            className={styles.carousel}
          >
            {slides}
          </Carousel>
        </div>
        {/* Описание */}
        <div className={styles.separator}></div>
        <div className={styles.description}>
          <h3 className={styles.title}>{route.title}</h3>
          <div className={styles.separator}></div>
          <p className={styles.text}>{route.description}</p>
        </div>
      </div>
    </Link>
  );
}
