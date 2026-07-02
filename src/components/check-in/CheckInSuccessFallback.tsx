'use client';

import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

export default function CheckInSuccessFallback() {
  const pageBg = useColorModeValue('gray.50', 'navy.900');

  return (
    <Flex
      direction="column"
      minH="100dvh"
      w="100%"
      maxW="480px"
      mx="auto"
      align="center"
      justify="center"
      px="24px"
      bg={pageBg}
    >
      <Box color="gray.400">Cargando...</Box>
    </Flex>
  );
}
