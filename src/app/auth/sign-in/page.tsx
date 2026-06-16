'use client';

import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DefaultAuthLayout from 'layouts/auth/Default';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from 'utils/supabase/client';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function SignIn() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('gray.500', 'gray.400');
  const textColorBrand = useColorModeValue('brand.500', 'brand.400');
  const cardBg = useColorModeValue('white', 'navy.800');
  const cardBorder = useColorModeValue('gray.100', 'whiteAlpha.100');
  const cardShadow = useColorModeValue(
    '0 4px 24px rgba(112, 144, 176, 0.12)',
    '0 4px 24px rgba(0, 0, 0, 0.3)',
  );

  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  };

  return (
    <DefaultAuthLayout>
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorder}
        borderRadius="20px"
        boxShadow={cardShadow}
        p={{ base: '28px', md: '40px' }}
      >
        <Heading
          color={textColor}
          fontSize={{ base: '28px', md: '32px' }}
          fontWeight="700"
          mb="8px"
        >
          Iniciar sesión
        </Heading>
        <Text mb="32px" color={textColorSecondary} fontSize="md">
          Ingresa tus credenciales para acceder al panel.
        </Text>

        <FormControl as="form" onSubmit={handleSignIn}>
          <FormLabel
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            mb="8px"
          >
            Correo electrónico
          </FormLabel>
          <Input
            isRequired
            variant="auth"
            fontSize="sm"
            type="email"
            placeholder="tu@email.com"
            mb="20px"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel
            fontSize="sm"
            fontWeight="600"
            color={textColor}
            mb="8px"
          >
            Contraseña
          </FormLabel>
          <InputGroup size="md" mb="20px">
            <Input
              isRequired
              fontSize="sm"
              placeholder="Mín. 8 caracteres"
              size="lg"
              type={show ? 'text' : 'password'}
              variant="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement h="full" pr="12px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: 'pointer', color: textColorBrand }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={() => setShow(!show)}
              />
            </InputRightElement>
          </InputGroup>

          {errorMsg && (
            <Box
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="10px"
              px="14px"
              py="10px"
              mb="20px"
            >
              <Text color="red.500" fontSize="sm">
                {errorMsg}
              </Text>
            </Box>
          )}

          <Flex justifyContent="space-between" align="center" mb="28px">
            <FormControl display="flex" alignItems="center" w="auto">
              <Checkbox
                id="remember-login"
                colorScheme="brandScheme"
                me="8px"
              />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                fontWeight="normal"
                color={textColorSecondary}
                fontSize="sm"
              >
                Recordarme
              </FormLabel>
            </FormControl>
            <Link href="/auth/forgot-password">
              <Text
                color={textColorBrand}
                fontSize="sm"
                fontWeight="600"
                _hover={{ textDecoration: 'underline' }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          </Flex>

          <Button
            type="submit"
            isLoading={loading}
            fontSize="sm"
            variant="brand"
            fontWeight="600"
            w="100%"
            h="50px"
            borderRadius="12px"
            mb="24px"
          >
            Entrar
          </Button>
        </FormControl>

        <Flex justify="center">
          <Link href="/auth/sign-up">
            <Text color={textColorSecondary} fontSize="sm">
              ¿No tienes cuenta?{' '}
              <Text
                as="span"
                color={textColorBrand}
                fontWeight="600"
                _hover={{ textDecoration: 'underline' }}
              >
                Regístrate
              </Text>
            </Text>
          </Link>
        </Flex>
      </Box>
    </DefaultAuthLayout>
  );
}
