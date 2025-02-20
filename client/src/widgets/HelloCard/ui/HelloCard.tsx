import React from 'react';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import styles from './HelloCard.module.css';

export function HelloCard(): React.JSX.Element {
  return (
    <div className={styles.container}>
      <Carousel
        slideSize="70%"
        height={200}
        align="start"
        slideGap="xs"
        controlsOffset="xs"
        controlSize={1}
        loop
        withIndicators
      >
        <Carousel.Slide>
          <img
            className={styles.carouselImage}
            src="https://assets.weforum.org/article/image/0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            className={styles.carouselImage}
            src="https://assets.weforum.org/article/image/0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            className={styles.carouselImage}
            src="https://assets.weforum.org/article/image/0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg"
          />
        </Carousel.Slide>

      </Carousel>
      
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
      {/* <div className={styles.separator}></div> */}
    </div>
  );
}
