import React from 'react';
import { Carousel } from 'antd';
import { Image, Tag } from 'antd';
import styles from './RouteItem.module.css';
import { Route } from '../../model';
import { Link } from 'react-router-dom';
import { CLIENT_ROUTES } from '@/shared/enums/client_routes';

type Props = {
  route: Route;
};

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

export function RouteItem({ route }: Props): React.JSX.Element {
  const slides = images.map((url) => (
    <div key={url}>
      <Image preview={false} src={url} alt={`Route image ${url}`} />
    </div>
  ));

  return (
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

      {/* Описание */}
      <div className={styles.separator}></div>
      <div className={styles.description}>
        <Link to={`${CLIENT_ROUTES.ROUTE_PAGE}/${route.id}`}>
          <h3 className={styles.title}>{route.title}</h3>
        </Link>
        <div className={styles.separator}></div>
        <p className={styles.text}>{route.description}</p>
      </div>
    </div>
  );
}
