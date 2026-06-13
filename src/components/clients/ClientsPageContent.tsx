'use client';

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import ClientsSearch from 'components/clients/ClientsSearch';
import ClientsTable from 'components/clients/ClientsTable';
import { Client } from 'types/client';

type ClientsPageContentProps = {
  clients: Client[];
  searchQuery: string;
};

export default function ClientsPageContent({
  clients,
  searchQuery,
}: ClientsPageContentProps) {
  const textColor = useColorModeValue('navy.700', 'white');

  return (
    <Box>
      <Flex
        mb="20px"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        gap="20px"
      >
        <Heading size="lg" color={textColor}>
          Clientes
        </Heading>
        <ClientsSearch searchQuery={searchQuery} />
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ClientsTable tableData={clients} />
      </SimpleGrid>
    </Box>
  );
}
