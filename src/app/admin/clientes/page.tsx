'use client';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';

export default function Clientes() {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <ComplexTable tableData={tableDataComplex} />
      </SimpleGrid>
    </Box>
  );
}
