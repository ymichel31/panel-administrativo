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

  const { data: client, error: updateClientError } = await supabase
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
    .eq('id', id)
    .select()
    .single();

  if (updateClientError) {
    return { success: false, error: updateClientError.message };
  }

  const { data: plan, error: planError } = await supabase
    .from('plans')
    .select('*')
    .eq('id', form.plan_id)
    .single();

  if (planError) {
    return { success: false, error: planError.message };
  }

  if (!plan) {
    return { success: false, error: 'Plan no encontrado' };
  }

  const startDate = new Date().toISOString();
  const endDate = new Date(
    new Date().setDate(new Date().getDate() + plan.days),
  ).toISOString();

  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert({
      client_id: client.id,
      plan_id: form.plan_id,
      start_date: startDate,
      end_date: endDate,
      total_classes: plan.unlimited ? 99 : plan.total_classes, // TODO:  99 is a magic number for unlimited plans
    });

  if (subscriptionError) {
    return { success: false, error: subscriptionError.message };
  }

  return { success: true };
}

export async function createClientAction(form: CreateClient) {
  const supabase = await getSupabaseClient();

  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      plan_id: form.plan_id,
      dni: form.dni,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  if (!client) {
    return { success: false, error: 'Error al crear el cliente' };
  }

  const { data: plan, error: planError } = await supabase
    .from('plans')
    .select('*')
    .eq('id', form.plan_id)
    .single();

  if (planError) {
    return { success: false, error: planError.message };
  }

  if (!plan) {
    return { success: false, error: 'Plan no encontrado' };
  }

  const startDate = new Date().toISOString();
  const endDate = new Date(
    new Date().setDate(new Date().getDate() + plan.days),
  ).toISOString();

  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert({
      client_id: client.id,
      plan_id: form.plan_id,
      start_date: startDate,
      end_date: endDate,
      total_classes: plan.unlimited ? 99 : plan.total_classes, // TODO:  99 is a magic number for unlimited plans
    });

  if (subscriptionError) {
    return { success: false, error: subscriptionError.message };
  }

  return { success: true };
}
