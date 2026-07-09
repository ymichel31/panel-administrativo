import { getClientsAction } from 'actions/clients';
import CreateManualAttendanceForm from 'components/attendances/CreateManualAttendanceForm';

export default async function CreateAttendancePage() {
  const clients = await getClientsAction();

  return <CreateManualAttendanceForm clients={clients} />;
}
