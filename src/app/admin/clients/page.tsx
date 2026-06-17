import { getClientsAction, searchClientsAction } from 'actions/clients';
import ClientsPageContent from 'components/clients/ClientsPageContent';
import { Client } from 'types/client';

type ClientsPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const { query } = await searchParams;
  const searchQuery = query?.trim() || '';

  let clients: Client[];

  if (searchQuery) {
    clients = await searchClientsAction(searchQuery);
  } else {
    clients = await getClientsAction();
  }

  return <ClientsPageContent clients={clients} searchQuery={searchQuery} />;
}
