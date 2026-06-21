'use client';

import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import { createClient } from 'utils/supabase/client';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import routes from 'routes';

export default function HeaderLinks(props: {
  onOpen: boolean | any;
  fixed: boolean | any;
}) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/sign-in');
    router.refresh();
  };

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={useColorModeValue('white', 'navy.800')}
      p="10px"
      borderRadius="30px"
      boxShadow={useColorModeValue(
        '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
        '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
      )}
    >
      <SidebarResponsive routes={routes} />

      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={useColorModeValue('gray.400', 'white')}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p="0px" position="relative">
          <Box
            _hover={{ cursor: 'pointer' }}
            color="white"
            bg="#11047A"
            w="40px"
            h="40px"
            borderRadius={'50%'}
          />
          <Center top={0} left={0} position={'absolute'} w={'100%'} h={'100%'}>
            <Text fontSize={'xs'} fontWeight="bold" color={'white'}>
              BS
            </Text>
          </Center>
        </MenuButton>
        <MenuList
          boxShadow={useColorModeValue(
            '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
            '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
          )}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={useColorModeValue('white', 'navy.800')}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={useColorModeValue(
                '#E6ECFA',
                'rgba(135, 140, 189, 0.3)',
              )}
              fontSize="sm"
              fontWeight="700"
              color={useColorModeValue('secondaryGray.900', 'white')}
            >
              Administrador
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={handleLogout}
            >
              <Text fontSize="sm">Cerrar sesión</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
