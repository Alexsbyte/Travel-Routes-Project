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
    <Carousel className={styles.carousel} withIndicators>{slides}</Carousel>
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.description}>
        <h3 className={styles.title}>Туристический маршрут "Загадки древних городов"</h3>
        <div className={styles.separator}></div>
        <p className={styles.text}>
          Этот маршрут проведет вас через скрытые уголки древних городов,
          где история встречается с архитектурным наследием. Вы сможете
          исследовать уникальные памятники и узнать о культуре, которая
          сформировала это место.
        </p>
      </div>

    </div></>
  );
}
