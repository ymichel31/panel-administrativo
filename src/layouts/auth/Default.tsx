'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

function AuthLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Flex minH="100vh" w="100%">
      {/* Panel izquierdo — branding */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        w="45%"
        minH="100vh"
        bgGradient="linear(to-br, brand.500, brand.700)"
        _dark={{ bgGradient: 'linear(to-br, navy.800, navy.900)' }}
        direction="column"
        justify="center"
        px="80px"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="320px"
          h="320px"
          borderRadius="full"
          bg="whiteAlpha.400"
          _dark={{ bg: 'brand.400' }}
          opacity={0.15}
        />
        <Box
          position="absolute"
          bottom="-120px"
          left="-60px"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="whiteAlpha.400"
          _dark={{ bg: 'brand.400' }}
          opacity={0.1}
        />

        <Text
          fontSize="36px"
          fontWeight="800"
          color="white"
          letterSpacing="-0.5px"
          mb="16px"
          position="relative"
        >
          Be Strong Unity
        </Text>
        <Text
          fontSize="lg"
          color="whiteAlpha.800"
          _dark={{ color: 'whiteAlpha.700' }}
          fontWeight="400"
          maxW="360px"
          lineHeight="1.7"
          position="relative"
        >
          Accede a tu panel de administración y gestiona todo desde un solo
          lugar.
        </Text>
      </Flex>

      {/* Panel derecho — formulario */}
      <Flex
        w={{ base: '100%', lg: '55%' }}
        minH="100vh"
        bg="white"
        _dark={{ bg: 'navy.900' }}
        align="center"
        justify="center"
        px={{ base: '24px', md: '48px' }}
        py={{ base: '48px', md: '0' }}
      >
        <Box w="100%" maxW="420px">
          {/* Logo móvil */}
          <Text
            display={{ base: 'block', lg: 'none' }}
            fontSize="28px"
            fontWeight="800"
            color="brand.500"
            _dark={{ color: 'white' }}
            mb="32px"
            textAlign="center"
          >
            Be Strong Unity
          </Text>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
