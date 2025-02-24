import React from 'react';
import { Box, Group, rgba, Text } from '@mantine/core';

export function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <Box component="footer" py="md" mt={30} bg={rgba('gray', 0.1)}>
      <Group h={75} justify="center">
        <Text>Buffaloes team &copy; {currentYear}</Text>
      </Group>
    </Box>
  );
}
