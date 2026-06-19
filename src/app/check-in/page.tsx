'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

export default function CheckInPage() {
  const [code, setCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: validar código y registrar asistencia
  };

  return (
    <Flex
      direction="column"
      minH="100dvh"
      w="100%"
      maxW="480px"
      mx="auto"
      bg={useColorModeValue('white', 'navy.900')}
    >
      <Flex
        direction="column"
        justify="center"
        px="24px"
        pt="48px"
        pb="40px"
        bgGradient="linear(to-br, brand.500, brand.700)"
        _dark={{ bgGradient: 'linear(to-br, navy.800, navy.900)' }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-60px"
          right="-60px"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="whiteAlpha.300"
          opacity={0.2}
        />
        <Heading
          color="white"
          fontSize="32px"
          fontWeight="800"
          letterSpacing="-0.5px"
          mb="12px"
          position="relative"
        >
          Be Strong Unity
        </Heading>
        <Text
          color="whiteAlpha.800"
          fontSize="md"
          lineHeight="1.6"
          position="relative"
        >
          Ingresa tu código de cliente para continuar.
        </Text>
      </Flex>

      <Flex
        flex="1"
        direction="column"
        px="24px"
        py="32px"
        bg={useColorModeValue('white', 'navy.900')}
      >
        <FormControl as="form" onSubmit={handleSubmit}>
          <FormLabel
            fontSize="sm"
            fontWeight="600"
            color={useColorModeValue('navy.700', 'white')}
            mb="8px"
          >
            Código de cliente
          </FormLabel>
          <Input
            isRequired
            variant="auth"
            fontSize="md"
            placeholder="Ej: 123456"
            mb="24px"
            size="lg"
            h="56px"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            autoComplete="off"
          />

          <Button
            type="submit"
            fontSize="md"
            variant="brand"
            fontWeight="600"
            w="100%"
            h="56px"
          >
            Continuar
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
}
