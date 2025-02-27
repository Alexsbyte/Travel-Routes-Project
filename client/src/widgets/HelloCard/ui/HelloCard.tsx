import React from 'react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import styles from './HelloCard.module.css';
import { Image } from '@mantine/core';

const images = [
  '/0001.jpg',
  '/0002.avif',
  '/0003.avif',
  '/0004.avif',
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
        <Carousel className={styles.carousel} withIndicators loop>
          {slides}
        </Carousel>
        <div className={styles.description}>
          <h3>Конструктор маршрутов:</h3>
          <ul>
            <li>Добавь свои любимые маршруты</li>
            <li>Загрузи фотографии, опиши ключевые точки</li>
            <li>Комментируй маршруты других</li>
            <li>Ставь лайки</li>
          </ul>
        </div>
      </div>
    </>
  );
}
