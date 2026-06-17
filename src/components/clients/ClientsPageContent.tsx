'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import ClientsSearch from 'components/clients/ClientsSearch';
import Link from 'next/link';
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
        <Flex direction="column" align="flex-start" gap="5">
          <Heading size="lg" color={textColor}>
            Clientes
          </Heading>
          <Button
            as={Link}
            href="/admin/clients/create"
            variant="brand"
            fontSize="sm"
            fontWeight="500"
          >
            Nuevo cliente
          </Button>
        </Flex>
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
