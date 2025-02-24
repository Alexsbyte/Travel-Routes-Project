import React from 'react';
import { Box, Flex, rgba, Text } from '@mantine/core';
import { AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <Box bg={rgba('gray', 0.05)} component="footer" py="md" mt={30}>
      <Flex h={150} justify="space-around" align="center" px="md">
        <Flex direction="row" gap="xs">
          <Flex align="center" gap="xs">
            <AiFillGithub size={20} />
            <Link to="https://github.com/aselya93">
              <Text>aselya93</Text>
            </Link>
          </Flex>
          <Flex align="center" gap="xs">
            <AiFillGithub size={20} />
            <Link to="https://github.com/Alexsbyte">
              <Text>Alexsbyte</Text>
            </Link>
          </Flex>
          <Flex align="center" gap="xs">
            <AiFillGithub size={20} />
            <Link to="https://github.com/VoroninVladimirN93">
              <Text>VoroninVladimirN93</Text>
            </Link>
          </Flex>
          <Flex align="center" gap="xs">
            <AiFillGithub size={20} />
            <Link to="https://github.com/EkaterinaMkh">
              <Text>EkaterinaMkh</Text>
            </Link>
          </Flex>
          <Flex align="center" gap="xs">
            <AiFillGithub size={20} />
            <Link to="https://github.com/sensdoo-dev">
              <Text>sensdoo-dev</Text>
            </Link>
          </Flex>
        </Flex>
        <Text>Buffaloes team &copy; {currentYear}</Text>
      </Flex>
    </Box>
  );
}
