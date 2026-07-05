'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdErrorOutline } from 'react-icons/md';
import NextLink from 'next/link';

export default function CheckInUnavailable() {
  const cardBg = useColorModeValue('white', 'navy.800');
  const headingColor = useColorModeValue('navy.700', 'white');
  const textColor = useColorModeValue('gray.500', 'whiteAlpha.700');
  const pageBg = useColorModeValue('gray.50', 'navy.900');
  const iconBg = useColorModeValue('orange.50', 'orange.900');

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
      <Box
        w="100%"
        bg={cardBg}
        borderRadius="20px"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.08)"
        px="32px"
        py="40px"
        textAlign="center"
      >
        <Flex
          align="center"
          justify="center"
          w="88px"
          h="88px"
          mx="auto"
          mb="24px"
          borderRadius="full"
          bg={iconBg}
        >
          <Icon as={MdErrorOutline} w="52px" h="52px" color="orange.400" />
        </Flex>

        <Heading
          color={headingColor}
          fontSize="28px"
          fontWeight="800"
          letterSpacing="-0.5px"
          mb="12px"
        >
          Sin clases disponibles
        </Heading>

        <Text color={textColor} fontSize="md" lineHeight="1.6" mb="32px">
          No tienes clases disponibles o tu suscripción ya expiró. Por favor,
          valida tu estado con el administrador para continuar.
        </Text>

        <Button
          as={NextLink}
          href="/check-in"
          variant="brand"
          fontSize="md"
          fontWeight="600"
          w="100%"
          h="56px"
        >
          Volver al inicio
        </Button>
      </Box>
    </Flex>
  );
}
