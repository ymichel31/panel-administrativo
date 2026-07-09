'use client';

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import AttendancesLog from 'components/attendances/AttendancesLog';
import AttendancesSearch from 'components/attendances/AttendancesSearch';
import Link from 'next/link';
import { useState } from 'react';
import { Attendance } from 'types/attendance';

type AttendancesPageContentProps = {
  attendances: Attendance[];
};

export default function AttendancesPageContent({
  attendances,
}: AttendancesPageContentProps) {
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  let filteredAttendances = attendances;

  if (query) {
    filteredAttendances = attendances.filter((attendance) => {
      const firstName = attendance.first_name.toLowerCase();
      const lastName = attendance.last_name.toLowerCase();

      return firstName.includes(query) || lastName.includes(query);
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
            Asistencias
          </Heading>
          <Button
            as={Link}
            href="/admin/attendances/create"
            variant="brand"
            fontSize="sm"
            fontWeight="500"
          >
            Registrar asistencia
          </Button>
        </Flex>
        <AttendancesSearch value={search} onChange={setSearch} />
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <AttendancesLog
          attendances={filteredAttendances}
          emptyMessage={
            query
              ? 'No se encontraron resultados'
              : 'No hay asistencias registradas'
          }
        />
      </SimpleGrid>
    </Box>
  );
}
