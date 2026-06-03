'use client';
import { Box, Flex, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { useMemo, useState } from 'react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';

export default function Clientes() {
  const [search, setSearch] = useState('');
  const textColor = useColorModeValue('navy.700', 'white');
  const menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tableDataComplex;

    return tableDataComplex.filter((client) =>
      client.first_name.toLowerCase().includes(query) ||
      client.last_name.toLowerCase().includes(query)
    );
  }, [search]);

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
        <Flex
          bg={menuBg}
          p="10px"
          borderRadius="30px"
          boxShadow={shadow}
        >
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
