import { getPlansAction } from 'actions/plans';
import CreateClientForm from 'components/clients/CreateClientForm';

export default async function CreateClientPage() {
  const plans = await getPlansAction();

  return <CreateClientForm plans={plans} />;
}
