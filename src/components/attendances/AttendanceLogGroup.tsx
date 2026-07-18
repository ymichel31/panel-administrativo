'use client';

import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';
import AttendanceLogItem from 'components/attendances/AttendanceLogItem';
import Card from 'components/card/Card';
import { Attendance } from 'types/attendance';

type AttendanceLogGroupProps = {
  label: string;
  attendances: Attendance[];
};

export default function AttendanceLogGroup({
  label,
  attendances,
}: AttendanceLogGroupProps) {
  const labelColor = useColorModeValue('navy.700', 'white');
  const dividerColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  return (
    <Card flexDirection="column" w="100%" p="20px">
      <Text color={labelColor} fontSize="md" fontWeight="700" mb="8px">
        {label}
      </Text>

      <Divider borderColor={dividerColor} mb="4px" />

      <Box>
        {attendances.map((attendance) => (
          <AttendanceLogItem
            key={`${attendance.client_id}-${attendance.class_id}-${attendance.attended_at}`}
            attendance={attendance}
          />
        ))}
      </Box>
    </Card>
  );
}
