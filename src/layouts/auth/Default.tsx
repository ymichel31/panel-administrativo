'use client';

import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

function AuthLayout(props: {
  children: ReactNode;
  illustrationBackground?: string;
}) {
  const { children } = props;

  const panelBg = useColorModeValue('white', 'navy.900');
  const brandGradient = useColorModeValue(
    'linear(to-br, brand.500, brand.700)',
    'linear(to-br, navy.800, navy.900)',
  );
  const taglineColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.700');
  const accentDot = useColorModeValue('whiteAlpha.400', 'brand.400');
  const mobileLogoColor = useColorModeValue('brand.500', 'white');

  return (
    <Flex minH="100vh" w="100%">
      {/* Panel izquierdo — branding */}
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        w="45%"
        minH="100vh"
        bgGradient={brandGradient}
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
          bg={accentDot}
          opacity={0.15}
        />
        <Box
          position="absolute"
          bottom="-120px"
          left="-60px"
          w="400px"
          h="400px"
          borderRadius="full"
          bg={accentDot}
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
          color={taglineColor}
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
        bg={panelBg}
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
            color={mobileLogoColor}
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
