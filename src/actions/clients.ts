'use server';

import { cookies } from 'next/headers';
import { Client, ClientForm } from 'types/client';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getClientsAction(): Promise<Client[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.from('clients').select('*');

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function searchClientsAction(text: string): Promise<Client[]> {
  const query = text.trim();
  const supabase = await getSupabaseClient();
  const pattern = `%${query}%`;

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .or(
      `first_name.ilike.${pattern},last_name.ilike.${pattern},code.ilike.${pattern}`,
    );

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function getClientByIdAction(
  id: string,
): Promise<Client | null> {
  const supabase = await getSupabaseClient();

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
}

export async function updateClientAction(id: string, form: ClientForm) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from('clients')
    .update({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      plan_id: form.plan_id,
      code: form.code,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createClientAction(form: ClientForm) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from('clients').insert({
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    plan_id: form.plan_id,
    code: form.code,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
