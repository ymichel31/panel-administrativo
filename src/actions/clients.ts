'use server';

import { cookies } from 'next/headers';
import { Client, CreateClient, UpdateClient } from 'types/client';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getClientsAction(): Promise<Client[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.rpc(
    'get_clients_subscription_overview',
  );

  if (error) {
    console.error(error);
    return [];
  }
  return data ?? [];
}

export async function getClientByIdAction(id: string): Promise<Client | null> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.rpc(
    'get_clients_subscription_overview_by_client',
    {
      p_client_id: id,
    },
  );

  if (error) {
    console.error(error);
    return null;
  }

  return data[0];
}

export async function updateClientAction(id: number, form: UpdateClient) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from('clients')
    .update({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      plan_id: form.plan_id,
      dni: form.dni,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createClientAction(form: CreateClient) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from('clients').insert({
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    plan_id: form.plan_id,
    dni: form.dni,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
