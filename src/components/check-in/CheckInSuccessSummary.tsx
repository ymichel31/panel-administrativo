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
import { formatDate } from 'utils/date';

function getSuccessMessage(
  firstName: string,
  classesRemaining: number,
  unlimited: boolean,
) {
  if (unlimited) {
    return `${firstName}, tu asistencia se registró correctamente. Tu plan incluye clases ilimitadas.`;
  }

  return `${firstName}, tu asistencia se registró correctamente. Te quedan ${classesRemaining} clases disponibles.`;
}

type CheckInSuccessSummaryProps = {
  firstName: string;
  classesRemaining: number;
  unlimited: boolean;
  startDate: string;
  endDate: string;
};

export default function CheckInSuccessSummary({
  firstName,
  classesRemaining,
  unlimited,
  startDate,
  endDate,
}: CheckInSuccessSummaryProps) {
  const cardBg = useColorModeValue('white', 'navy.800');
  const headingColor = useColorModeValue('navy.700', 'white');
  const textColor = useColorModeValue('gray.500', 'whiteAlpha.700');
  const pageBg = useColorModeValue('gray.50', 'navy.900');
  const iconBg = useColorModeValue('green.50', 'green.900');
  const validityBg = useColorModeValue('gray.50', 'whiteAlpha.50');
  const validityBorderColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const validityMutedColor = useColorModeValue('gray.400', 'whiteAlpha.600');

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
          ¡Listo, {firstName}!
        </Heading>

        <Text color={textColor} fontSize="md" lineHeight="1.6" mb="24px">
          {getSuccessMessage(firstName, classesRemaining, unlimited)}
        </Text>

        <Box
          w="100%"
          bg={validityBg}
          border="1px solid"
          borderColor={validityBorderColor}
          borderRadius="12px"
          px="16px"
          py="16px"
          mb="32px"
        >
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            mb="12px"
          >
            Vigencia de tu suscripción
          </Text>

          <Flex align="center" justify="center" gap="12px" wrap="wrap">
            <Box textAlign="center">
              <Text
                color={validityMutedColor}
                fontSize="xs"
                fontWeight="500"
                mb="4px"
              >
                Desde
              </Text>
              <Text
                color={textColor}
                fontSize="md"
                fontWeight="600"
              >
                {formatDate(startDate)}
              </Text>
            </Box>

            <Text color={validityMutedColor} fontSize="md">
              —
            </Text>

            <Box textAlign="center">
              <Text
                color={validityMutedColor}
                fontSize="xs"
                fontWeight="500"
                mb="4px"
              >
                Hasta
              </Text>
              <Text
                color={textColor}
                fontSize="md"
                fontWeight="600"
              >
                {formatDate(endDate)}
              </Text>
            </Box>
          </Flex>
        </Box>

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
