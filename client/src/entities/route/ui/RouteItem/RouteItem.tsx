import React from 'react';
import '@mantine/carousel/styles.css';
import styles from './RouteItem.module.css';
import { Route } from '../../model';
import { Card, Image } from '@mantine/core';

type Props = {
  route: Route;
};

export function RouteItem({ route }: Props): React.JSX.Element {
  return (
    <Card withBorder shadow="sm" radius="lg" className={styles.item}>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={300}
        alt="Norway"
      />
      <div className={styles.container}>
        <div className={styles.separator}></div>
        <div className={styles.description}>
          <h3 className={styles.title}>{route.title}</h3>
          <div className={styles.separator}></div>
          <p className={styles.text}>{route.description}</p>
        </div>
      </div>
    </Card>
  );
}
