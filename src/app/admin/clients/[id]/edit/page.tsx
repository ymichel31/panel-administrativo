import { getClientByIdAction } from 'actions/clients';
import EditClientForm from 'components/clients/EditClientForm';
import { notFound } from 'next/navigation';

type EditClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClientPage({ params }: EditClientPageProps) {
  const { id } = await params;
  const client = await getClientByIdAction(id);

  if (!client) {
    notFound();
  }

  return <EditClientForm client={client} />;
}
