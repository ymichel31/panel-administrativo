'use server';

import { cookies } from 'next/headers';
import { Plan } from 'types/plan';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getPlansAction(): Promise<Plan[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from('plans')
    .select('id, name')
    .order('name');

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
