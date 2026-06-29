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
import { MdCheckCircle } from 'react-icons/md';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type CheckInResult = {
  firstName: string;
  classesRemaining: number;
  unlimited: boolean;
};

function readCheckInResult(): CheckInResult | null {
  const storedResult = sessionStorage.getItem('checkin_result');

  if (!storedResult) {
    return null;
  }

  try {
    return JSON.parse(storedResult) as CheckInResult;
  } catch {
    return null;
  }
}

function getSuccessMessage(result: CheckInResult) {
  if (result.unlimited) {
    return `${result.firstName}, tu asistencia se registró correctamente. Tu plan incluye clases ilimitadas.`;
  }

  return `${result.firstName}, tu asistencia se registró correctamente. Te quedan ${result.classesRemaining} clases disponibles.`;
}

export default function CheckInSuccessPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checkInResult, setCheckInResult] = useState<CheckInResult | null>(
    null,
  );
  const cardBg = useColorModeValue('white', 'navy.800');
  const headingColor = useColorModeValue('navy.700', 'white');
  const textColor = useColorModeValue('gray.500', 'whiteAlpha.700');
  const pageBg = useColorModeValue('gray.50', 'navy.900');
  const iconBg = useColorModeValue('green.50', 'green.900');

  useEffect(() => {
    if (sessionStorage.getItem('checkin_ok') !== '1') {
      router.replace('/check-in');
      return;
    }

    let interval = setInterval(() => {
      if (sessionStorage.getItem('checkin_ok') !== '1') {
        router.replace('/check-in');
        return;
      }

      setCheckInResult(readCheckInResult());
      sessionStorage.removeItem('checkin_ok');
      sessionStorage.removeItem('checkin_result');
      setAllowed(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  if (!allowed) {
    return null;
  }

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
          <Icon as={MdCheckCircle} w="52px" h="52px" color="green.400" />
        </Flex>

        <Heading
          color={headingColor}
          fontSize="28px"
          fontWeight="800"
          letterSpacing="-0.5px"
          mb="12px"
        >
          ¡Listo, {checkInResult?.firstName}!
        </Heading>

        <Text color={textColor} fontSize="md" lineHeight="1.6" mb="32px">
          {checkInResult
            ? getSuccessMessage(checkInResult)
            : 'Tu asistencia se registró correctamente. Puedes seguir y disfrutar de tu clase.'}
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
          Esta bien, gracias
        </Button>
      </Box>
    </Flex>
  );
}
