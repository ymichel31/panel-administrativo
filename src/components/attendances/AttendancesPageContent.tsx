'use client';

import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import AttendancesSearch from 'components/attendances/AttendancesSearch';
import AttendancesTable from 'components/attendances/AttendancesTable';
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
        <Heading size="lg" color={useColorModeValue('navy.700', 'white')}>
          Asistencias
        </Heading>
        <AttendancesSearch value={search} onChange={setSearch} />
      </Flex>
      <SimpleGrid
        mb="20px"
        columns={{ base: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <AttendancesTable tableData={filteredAttendances} />
      </SimpleGrid>
    </Box>
  );
}
