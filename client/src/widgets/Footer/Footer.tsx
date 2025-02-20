import React from 'react';
import { Group } from '@mantine/core';
import classes from './Footer.module.css';

// const links = [
//   { link: '#', label: 'Contact' },
//   { link: '#', label: 'Privacy' },
//   { link: '#', label: 'Blog' },
//   { link: '#', label: 'Store' },
//   { link: '#', label: 'Careers' },
// ];

export function Footer(): React.JSX.Element {
  // const items = links.map((link) => (
  //   <Anchor
  //     c="dimmed"
  //     key={link.label}
  //     href={link.link}
  //     lh={1}
  //     onClick={(event) => event.preventDefault()}
  //     size="sm"
  //   >
  //     {link.label}
  //   </Anchor>
  // ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>
          Buffaloes team
        </Group>

        {/* <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTelegram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group> */}
      </div>
    </div>
  );
}
