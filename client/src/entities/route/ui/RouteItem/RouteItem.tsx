import React from 'react';
import '@mantine/carousel/styles.css';
import styles from './RouteItem.module.css';
import { Route } from '../../model';

type Props = {
  route: Route;
};

export function RouteItem({ route }: Props): React.JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.separator}></div>
        <div className={styles.description}>
          <h3 className={styles.title}>{route.title}</h3>
          <div className={styles.separator}></div>
          <p className={styles.text}>{route.description}</p>
        </div>
      </div>
    </>
  );
}
