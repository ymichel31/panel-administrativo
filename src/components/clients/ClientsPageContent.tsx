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
import { useState } from 'react';
import { Client } from 'types/client';

type ClientsPageContentProps = {
  clients: Client[];
};

export default function ClientsPageContent({
  clients,
}: ClientsPageContentProps) {
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  let filteredClients = clients;

  if (query) {
    filteredClients = clients.filter((client) => {
      const firstName = client.first_name.toLowerCase();
      const lastName = client.last_name.toLowerCase();
      const dni = client.dni.toString().toLowerCase();

      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        dni.includes(query)
      );
    });
  }

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
          <Heading size="lg" color={useColorModeValue('navy.700', 'white')}>
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
        <ClientsSearch value={search} onChange={setSearch} />
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ClientsTable tableData={filteredClients} />
      </SimpleGrid>
    </Box>
  );
}
