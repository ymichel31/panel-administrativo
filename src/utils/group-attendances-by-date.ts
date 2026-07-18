import { Attendance } from 'types/attendance';

export type AttendanceGroup = {
  dateKey: string;
  label: string;
  attendances: Attendance[];
};

function getDateKey(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getGroupLabel(dateKey: string) {
  const today = getDateKey(new Date().toISOString());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getDateKey(yesterdayDate.toISOString());

  if (dateKey === today) {
    return 'Hoy';
  }

  if (dateKey === yesterday) {
    return 'Ayer';
  }

  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function groupAttendancesByDate(
  attendances: Attendance[],
): AttendanceGroup[] {
  const sorted = [...attendances].sort(
    (a, b) =>
      new Date(b.attended_at).getTime() - new Date(a.attended_at).getTime(),
  );

  const groups = new Map<string, Attendance[]>();

  for (const attendance of sorted) {
    const dateKey = getDateKey(attendance.attended_at);
    const current = groups.get(dateKey) ?? [];
    current.push(attendance);
    groups.set(dateKey, current);
  }

  return Array.from(groups.entries()).map(([dateKey, groupAttendances]) => ({
    dateKey,
    label: getGroupLabel(dateKey),
    attendances: groupAttendances,
  }));
}
