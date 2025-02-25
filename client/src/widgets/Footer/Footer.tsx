import React, { useState } from 'react';
import { Box, Collapse, Flex, rgba, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { AiFillGithub } from 'react-icons/ai';
import styles from './Footer.module.css';
import { useMediaQuery } from '@mantine/hooks';

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  const isPad = useMediaQuery('(max-width: 72em)');
  const [opened, setOpened] = useState(false);

  const links = [
    { href: 'https://github.com/aselya93', label: 'aselya93' },
    { href: 'https://github.com/Alexsbyte', label: 'Alexsbyte' },
    { href: 'https://github.com/VoroninVladimirN93', label: 'VoroninVladimirN93' },
    { href: 'https://github.com/EkaterinaMkh', label: 'EkaterinaMkh' },
    { href: 'https://github.com/sensdoo-dev', label: 'Sensdoo' },
  ];

  return (
    <Box bg={rgba('gray', 0.07)} component="footer" mt={50}>
      <Flex direction="column" align="center" px="md">
        {isPad && (
          <button
            className={styles.footerButton}
            onClick={() => setOpened((prev) => !prev)}
          >
            <Text>Наши разработчики</Text>
            {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </button>
        )}
        <Collapse in={!isPad || opened}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            px="md"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="center"
              gap="xs"
              mt={10}
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  <AiFillGithub size={20} />
                  <Text>{link.label}</Text>
                </a>
              ))}
            </Flex>
          </Flex>
        </Collapse>
        <Text mt="md">Buffaloes team &copy; {currentYear}</Text>
      </Flex>
    </Box>
  );
}
