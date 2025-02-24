import React from 'react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import styles from './HelloCard.module.css';
import { Image } from '@mantine/core';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

export function HelloCard(): React.JSX.Element {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} />
    </Carousel.Slide>
  ));

  return (
    <>
      <div className={styles.container}>
        <Carousel className={styles.carousel} withIndicators>
          {slides}
        </Carousel>
        <div className={styles.description}>
          <h3>Конструктор маршрутов:</h3>
          <ul>
            <li>Добавь свои любимые маршруты</li>
            <li>Загрузи фотографии, опиши ключевые точки</li>
            <li>Комментируй маршруты других</li>
          </ul>
        </div>
      </div>
    </>
  );
}
