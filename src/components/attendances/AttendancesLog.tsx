'use client';

import { Text, useColorModeValue, VStack } from '@chakra-ui/react';
import AttendanceLogGroup from 'components/attendances/AttendanceLogGroup';
import { Attendance } from 'types/attendance';
import { groupAttendancesByDate } from 'utils/group-attendances-by-date';

type AttendancesLogProps = {
  attendances: Attendance[];
  emptyMessage?: string;
};

export default function AttendancesLog({
  attendances,
  emptyMessage = 'No hay asistencias para mostrar',
}: AttendancesLogProps) {
  const emptyColor = useColorModeValue('gray.500', 'whiteAlpha.700');

  if (attendances.length === 0) {
    return (
      <Text color={emptyColor} fontSize="sm" fontWeight="500">
        {emptyMessage}
      </Text>
    );
  }

  const groups = groupAttendancesByDate(attendances);

  return (
    <VStack align="stretch" spacing="20px" w="100%">
      {groups.map((group) => (
        <AttendanceLogGroup
          key={group.dateKey}
          label={group.label}
          attendances={group.attendances}
        />
      ))}
    </VStack>
  );
}
