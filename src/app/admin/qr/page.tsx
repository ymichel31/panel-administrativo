'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code';
import Card from 'components/card/Card';
import { useEffect, useRef, useState } from 'react';

export default function GenerateQrPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <GenerateQrContent />;
}

function GenerateQrContent() {
  const toast = useToast();
  const qrRef = useRef<ReactQRCodeRef>(null);
  const qrUrl = `${window.location.origin}/check-in`;

  const handleDownload = () => {
    if (!qrRef.current) return;

    qrRef.current.download({
      name: 'check-in-qr',
      format: 'png',
    });

    toast({
      title: 'QR descargado',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading
        size="lg"
        color={useColorModeValue('navy.700', 'white')}
        mb="20px"
      >
        Código QR
      </Heading>

      <Card p="30px" maxW="480px" mx="auto">
        <Text
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize="sm"
          mb="24px"
          textAlign="center"
        >
          Escanea este código para acceder al check-in.
        </Text>

        <Box
          bg={useColorModeValue('white', 'whiteAlpha.200')}
          border="1px solid"
          borderColor={useColorModeValue('secondaryGray.200', 'whiteAlpha.200')}
          borderRadius="16px"
          p="20px"
          mb="24px"
        >
          <Flex justify="center">
            <ReactQRCode ref={qrRef} value={qrUrl} size={256} />
          </Flex>
        </Box>

        <Flex justify="center">
          <Button
            type="button"
            variant="brand"
            fontSize="sm"
            fontWeight="600"
            onClick={handleDownload}
          >
            Descargar QR
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
