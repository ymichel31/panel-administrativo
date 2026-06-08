'use client';
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { useEffect, useState } from 'react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import { createClient } from 'utils/supabase/client';

export default function Clients() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    console.log('fetching clients');
    const fetchClients = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('clients').select('*');
      console.log(data);
      console.log(error);
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setClients(data);
      }
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

  let filteredClients = tableDataComplex;

  if (query) {
    filteredClients = tableDataComplex.filter((client) => {
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
        <ComplexTable tableData={filteredClients} />
      </SimpleGrid>
    </Box>
  );
}
