import React, { useState } from 'react';
import { Box, Collapse, Flex, Group, Text } from '@mantine/core';
import { AiFillGithub } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { GiBullHorns } from 'react-icons/gi';
import { motion } from 'framer-motion'; // Для анимации
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
    <motion.div
      style={{ width: '100%' }}
      initial={{
        background: 'linear-gradient(45deg,rgb(255, 255, 255),rgb(233, 233, 233))',
      }} // Начальный фон
      animate={{
        background: 'linear-gradient(45deg,rgb(175, 234, 252),rgb(240, 226, 229))', // Фон в процессе анимации
      }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }} // Плавная анимация фона
    >
      <Box component="footer" mt={50}>
        <Flex direction="column" align="center" px="md">
          {isPad && (
            <button
              className={styles.footerLink}
              onClick={() => setOpened((prev) => !prev)}
              aria-expanded={opened}
              aria-controls="developers-links"
            >
              <Text>Наши разработчики</Text>
              {opened ? (
                <MdKeyboardArrowUp size={16} />
              ) : (
                <MdOutlineKeyboardArrowDown size={16} />
              )}
            </button>
          )}
          <Collapse in={!isPad || opened}>
            <motion.div
              id="developers-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
                    <motion.a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerLink}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <AiFillGithub size={20} />
                      <Text pl={10}>{link.label}</Text>
                    </motion.a>
                  ))}
                </Flex>
              </Flex>
            </motion.div>
          </Collapse>
          <Group mt={20}>
            <GiBullHorns />
            <Text m={'20 0'}>Buffaloes team &copy; {currentYear}</Text>
          </Group>
        </Flex>
      </Box>
    </motion.div>
  );
}
