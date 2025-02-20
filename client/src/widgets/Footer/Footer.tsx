import React from 'react';
import { Group } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer(): React.JSX.Element {

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>
          Buffaloes team
        </Group>   
      </div>
    </div>
  );
}
