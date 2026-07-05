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
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Card from 'components/card/Card';
import { Attendance } from 'types/attendance';

const columnHelper = createColumnHelper<Attendance>();

const columnMinWidths: Record<string, string> = {
  first_name: '150px',
  last_name: '150px',
  attended_at: '180px',
};

const formatAttendedAt = (value: string) => {
  return new Date(value).toLocaleString('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

type AttendancesTableProps = {
  tableData: Attendance[];
};

export default function AttendancesTable({ tableData }: AttendancesTableProps) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = [
    columnHelper.accessor('first_name', {
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
        <Flex w="100%" justify="center" align="center" px="2px">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            textAlign="center"
            whiteSpace="normal"
            wordBreak="break-word"
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('last_name', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          APELLIDO
        </Text>
      ),
      cell: (info) => (
        <Flex w="100%" justify="center" align="center" px="2px">
          <Text
            color={textColor}
            fontSize="sm"
            fontWeight="700"
            textAlign="center"
            whiteSpace="normal"
            wordBreak="break-word"
          >
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('attended_at', {
      header: () => (
        <Text
          w="100%"
          textAlign="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          FECHA
        </Text>
      ),
      cell: (info) => (
        <Text
          color={textColor}
          fontSize="sm"
          fontWeight="700"
          textAlign="center"
          w="100%"
        >
          {formatAttendedAt(info.getValue())}
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
    <Card flexDirection="column" w="100%" px="0px" overflowX="auto">
      <Box>
        <Table
          variant="simple"
          color="gray.500"
          mb="24px"
          mt="12px"
          layout="fixed"
          minW="520px"
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const minW = columnMinWidths[header.column.id] ?? '120px';
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      px="8px"
                      minW={minW}
                      w={minW}
                      borderColor={borderColor}
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
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const minW = columnMinWidths[cell.column.id] ?? '120px';
                  return (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={minW}
                      w={minW}
                      px="8px"
                      py="16px"
                      borderColor="transparent"
                      textAlign="center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
