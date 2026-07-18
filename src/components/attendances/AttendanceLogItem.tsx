'use client';

import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Attendance } from 'types/attendance';

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('es-CO', {
    timeStyle: 'short',
  });
}

type AttendanceLogItemProps = {
  attendance: Attendance;
};

export default function AttendanceLogItem({
  attendance,
}: AttendanceLogItemProps) {
  const nameColor = useColorModeValue('secondaryGray.900', 'white');
  const timeColor = useColorModeValue('gray.500', 'whiteAlpha.700');

  const fullName = `${attendance.first_name} ${attendance.last_name}`;

  return (
    <Flex align="center" justify="space-between" py="12px" gap="16px">
      <Text
        color={nameColor}
        fontSize="sm"
        fontWeight="600"
        noOfLines={1}
      >
        {fullName}
      </Text>
      <Text color={timeColor} fontSize="sm" fontWeight="500" flexShrink={0}>
        {formatTime(attendance.attended_at)}
      </Text>
    </Flex>
  );
}
