'use client';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getClients } from 'services/clients';
import { Client } from 'types/client';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';

export default function Clients() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getClients();
      setClients(data ?? []);
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

  const filteredClients = query
    ? clients.filter((client) => {
        const firstName = client.first_name?.toLowerCase() ?? '';
        const lastName = client.last_name?.toLowerCase() ?? '';
        const code = client.code?.toLowerCase() ?? '';

        return (
          firstName.includes(query) ||
          lastName.includes(query) ||
          code.includes(query)
        );
      })
    : clients;

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
        <ComplexTable
          tableData={filteredClients}
          onEdit={(client) => router.push(`/admin/clients/${client.id}/edit`)}
        />
      </SimpleGrid>
    </Box>
  );
}
