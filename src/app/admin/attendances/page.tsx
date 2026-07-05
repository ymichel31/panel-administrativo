import { getAttendancesAction } from 'actions/attendance';
import AttendancesPageContent from 'components/attendances/AttendancesPageContent';

export default async function AttendancesPage() {
  const attendances = await getAttendancesAction();

  return <AttendancesPageContent attendances={attendances} />;
}
