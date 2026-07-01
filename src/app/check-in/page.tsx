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
import { checkInClassAction } from 'actions/check-in';
import { useRouter } from 'next/navigation';

export default function CheckInPage() {
  const [dni, setDni] = useState<number>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await checkInClassAction(dni);

    if (!result.success) {
      router.push('/check-in/no-available');
      return;
    }

    sessionStorage.setItem('checkin_ok', '1');

    const { firstName, classesRemaining, unlimited } = result.data;

    router.push(
      `/check-in/success?firstName=${firstName}&classesRemaining=${classesRemaining}&unlimited=${
        unlimited ? 'true' : 'false'
      }`,
    );
  };

  return (
    <Flex
      direction="column"
      minH="100dvh"
      w="100%"
      align="center"
      justify="center"
      px="24px"
      bg={useColorModeValue('gray.50', 'navy.900')}
    >
      <Flex
        direction="column"
        w="100%"
        maxW="480px"
        bg={useColorModeValue('white', 'navy.900')}
        borderRadius="20px"
        overflow="hidden"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.08)"
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
            Ingresa tu Documento de Identidad para continuar.
          </Text>
        </Flex>

        <Flex direction="column" px="24px" py="32px">
          <FormControl as="form" onSubmit={handleSubmit}>
            <FormLabel
              fontSize="sm"
              fontWeight="600"
              color={useColorModeValue('navy.700', 'white')}
              mb="8px"
            >
              Documento de Identidad
            </FormLabel>
            <Input
              isRequired
              variant="auth"
              fontSize="md"
              placeholder="Ej: 12345678"
              mb="24px"
              size="lg"
              h="56px"
              value={dni ?? ''}
              onChange={(e) => setDni(Number(e.target.value))}
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
    </Flex>
  );
}
