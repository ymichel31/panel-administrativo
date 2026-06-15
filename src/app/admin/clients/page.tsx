'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from 'utils/supabase/client';
import ComplexTable, {
  RowObj,
} from 'views/admin/dataTables/components/ComplexTable';

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<RowObj[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('clients').select('*');

      if (error) {
        console.error(error);
        return;
      }

      setClients((data as RowObj[]) ?? []);
    };

    fetchClients();
  }, []);

  const textColor = useColorModeValue('navy.700', 'white');
  const menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const query = search.trim().toLowerCase();

  let filteredClients = clients;

  if (query) {
    filteredClients = clients.filter((client) => {
      const firstName = client.first_name.toLowerCase();
      const lastName = client.last_name.toLowerCase();

      return firstName.includes(query) || lastName.includes(query);
    });
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
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
        <Flex bg={menuBg} p="10px" borderRadius="30px" boxShadow={shadow}>
          <SearchBar
            w={{ base: '100%', md: '280px' }}
            borderRadius="30px"
            placeholder="Buscar clientes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ComplexTable tableData={filteredClients} />
      </SimpleGrid>
    </Box>
  );
}
