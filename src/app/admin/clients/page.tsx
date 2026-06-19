import { getClientsAction } from 'actions/clients';
import ClientsPageContent from 'components/clients/ClientsPageContent';

export default async function ClientsPage() {
  const clients = await getClientsAction();

  return <ClientsPageContent clients={clients} />;
}
