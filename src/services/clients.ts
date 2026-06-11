import { Client } from 'types/client';
import { createClient } from 'utils/supabase/client';

export const getClients = async (): Promise<Client[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*');

  if (error) {
    console.error(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
};

export const getClientById = async (
  id: string,
): Promise<Client | null> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};