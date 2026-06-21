'use server';

import { cookies } from 'next/headers';
import { CreatePlan, Plan } from 'types/plan';
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
