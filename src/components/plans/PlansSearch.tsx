'use client';

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';

type PlansSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function PlansSearch({ value, onChange }: PlansSearchProps) {
  return (
    <Flex
      align="center"
      bg={useColorModeValue('white', 'navy.800')}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
      borderRadius="full"
      px="12px"
      py="4px"
      w={{ base: '100%', md: 'auto' }}
      transition="border-color 0.2s"
      _focusWithin={{
        borderColor: useColorModeValue('brand.500', 'brand.400'),
      }}
    >
      <SearchBar
        w={{ base: '100%', md: '260px' }}
        borderRadius="full"
        background="transparent"
        placeholder="Buscar planes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Flex>
  );
}
