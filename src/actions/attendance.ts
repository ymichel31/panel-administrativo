'use server';

import { cookies } from 'next/headers';
import { Attendance } from 'types/attendance';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getAttendancesAction(): Promise<Attendance[]> {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.rpc('get_attendances');

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
