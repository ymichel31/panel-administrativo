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
import { useRef } from 'react';

type Qr = {
  id: string;
  target_url: string;
  is_active: boolean;
  created_at: string;
};

export default function GenerateQrContent({ qr }: { qr: Qr }) {
  const toast = useToast();
  const qrRef = useRef<ReactQRCodeRef>(null);

  const headingColor = useColorModeValue('navy.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('white', 'whiteAlpha.200');
  const borderColor = useColorModeValue('secondaryGray.200', 'whiteAlpha.200');

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

  if (!qr) return null;

  return (
    <Box>
      <Heading size="lg" color={headingColor} mb="20px">
        Código QR
      </Heading>

      <Card p="30px" maxW="480px" mx="auto">
        <Text color={textColor} fontSize="sm" mb="24px" textAlign="center">
          Escanea este código para acceder al check-in.
        </Text>

        <Box
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="16px"
          p="20px"
          mb="24px"
        >
          <Flex justify="center">
            <ReactQRCode ref={qrRef} value={qr.target_url} size={256} />
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
