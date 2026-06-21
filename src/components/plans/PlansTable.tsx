'use client';

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { Plan } from 'types/plan';

const columnHelper = createColumnHelper<Plan>();

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const formatPrice = (price: number) => {
  return priceFormatter.format(price);
};

type PlansTableProps = {
  tableData: Plan[];
};

export default function PlansTable({ tableData }: PlansTableProps) {
  const columns = [
    columnHelper.accessor('name', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          NOMBRE
        </Text>
      ),
      cell: (info) => (
        <Flex w="100%" justify="center" align="center">
          <Text
            color="secondaryGray.900"
            _dark={{ color: 'white' }}
            fontSize="sm"
            fontWeight="700"
            textAlign="center"
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('days', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          DÍAS
        </Text>
      ),
      cell: (info) => (
        <Text
          color="secondaryGray.900"
          _dark={{ color: 'white' }}
          fontSize="sm"
          fontWeight="700"
          textAlign="center"
          w="100%"
        >
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('total_classes', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          CLASES
        </Text>
      ),
      cell: (info) => (
        <Text
          color="secondaryGray.900"
          _dark={{ color: 'white' }}
          fontSize="sm"
          fontWeight="700"
          textAlign="center"
          w="100%"
        >
          {info.row.original.unlimited ? 'Ilimitado' : info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('price', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          PRECIO
        </Text>
      ),
      cell: (info) => (
        <Text
          color="secondaryGray.900"
          _dark={{ color: 'white' }}
          fontSize="sm"
          fontWeight="700"
          textAlign="center"
          w="100%"
        >
          {formatPrice(info.getValue())}
        </Text>
      ),
    }),
    columnHelper.accessor('unlimited', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          ILIMITADO
        </Text>
      ),
      cell: (info) => (
        <Text
          color="secondaryGray.900"
          _dark={{ color: 'white' }}
          fontSize="sm"
          fontWeight="700"
          textAlign="center"
          w="100%"
        >
          {info.getValue() ? 'Sí' : 'No'}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'whiteAlpha.100' }}
                    textAlign="center"
                  >
                    <Flex
                      justifyContent="center"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor="transparent"
                    textAlign="center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
