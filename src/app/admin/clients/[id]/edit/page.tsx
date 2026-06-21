import { getClientByIdAction } from 'actions/clients';
import { getPlansAction } from 'actions/plans';
import EditClientForm from 'components/clients/EditClientForm';
import { notFound } from 'next/navigation';

type EditClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params;
  const client = await getClientByIdAction(id);
  const plans = await getPlansAction();

  if (!client) {
    notFound();
  }

  return <EditClientForm client={client} plans={plans} />;
}
