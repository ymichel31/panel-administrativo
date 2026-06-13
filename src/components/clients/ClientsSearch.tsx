'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

type ClientsSearchProps = {
  searchQuery: string;
};

export default function ClientsSearch({ searchQuery }: ClientsSearchProps) {
  const menuBg = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const focusBorderColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <Flex
      as="form"
      action="/admin/clients"
      method="GET"
      align="center"
      bg={menuBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="full"
      px="12px"
      py="4px"
      w={{ base: '100%', md: 'auto' }}
      transition="border-color 0.2s"
      _focusWithin={{ borderColor: focusBorderColor }}
    >
      <SearchBar
        w={{ base: '100%', md: '260px' }}
        borderRadius="full"
        background="transparent"
        placeholder="Buscar clientes..."
        name="query"
        defaultValue={searchQuery}
      />
    </Flex>
  );
}
