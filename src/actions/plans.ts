'use server';

import { cookies } from 'next/headers';
import { CreatePlan, Plan, UpdatePlan } from 'types/plan';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getPlansAction(): Promise<Plan[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.from('plans').select('*').order('id');

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function getPlanByIdAction(id: string): Promise<Plan | null> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function createPlanAction(form: CreatePlan) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase.from('plans').insert({
    name: form.name,
    days: form.days,
    total_classes: form.total_classes,
    price: form.price,
    unlimited: form.unlimited,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updatePlanAction(id: number, form: UpdatePlan) {
  const supabase = await getSupabaseClient();

  const { error } = await supabase
    .from('plans')
    .update({
      name: form.name,
      days: form.days,
      total_classes: form.total_classes,
      price: form.price,
      unlimited: form.unlimited,
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deletePlanAction(id: number) {
  const supabase = await getSupabaseClient();

  const { count, error: countError } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true })
    .eq('plan_id', id);

  if (countError) {
    return { success: false, error: countError.message };
  }

  if (count && count > 0) {
    return {
      success: false,
      error:
        'No se puede eliminar este plan porque tiene clientes asociados. Asigna otro plan a esos clientes antes de eliminarlo.',
    };
  }

  const { error } = await supabase.from('plans').delete().eq('id', id);

  if (error) {
    if (error.message.includes('clients_plan_id_fkey')) {
      return {
        success: false,
        error:
          'No se puede eliminar este plan porque tiene clientes asociados. Asigna otro plan a esos clientes antes de eliminarlo.',
      };
    }

    if (error.message.includes('subscriptions_plan_id_fkey')) {
      return {
        success: false,
        error:
          'No se puede eliminar este plan porque tiene suscripciones asociadas en el historial.',
      };
    }

    return { success: false, error: error.message };
  }

  return { success: true };
}
