'use server';

import { cookies } from 'next/headers';
import { Attendance, CreateManualAttendance } from 'types/attendance';
import { createAnonClient } from 'utils/supabase/anon';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

function buildAttendedAt(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes).toISOString();
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

export async function createManualAttendanceAction(
  form: CreateManualAttendance,
) {
  const supabase = createAnonClient();

  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('client_id', form.client_id)
    .gte('end_date', new Date().toISOString())
    .order('end_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (subscriptionError) {
    console.error('Error getting subscription', subscriptionError);
    return { success: false, error: subscriptionError.message };
  }

  if (!subscription) {
    return { success: false, error: 'Suscripción no encontrada' };
  }

  const { data: classAttendance, error: classAttendanceError } = await supabase
    .from('class_attendances')
    .select('*')
    .eq('subscription_id', subscription.id);

  if (classAttendanceError) {
    console.error('Error getting class attendance', classAttendanceError);
    return { success: false, error: classAttendanceError.message };
  }

  const totalClassRemaining =
    subscription.total_classes - classAttendance.length;

  if (totalClassRemaining <= 0) {
    return { success: false, error: 'No hay clases disponibles' };
  }

  const { error: insertError } = await supabase.from('class_attendances').insert({
    subscription_id: subscription.id,
    attended_at: buildAttendedAt(form.date, form.time),
  });

  if (insertError) {
    console.error('Error inserting class attendance', insertError);
    return { success: false, error: insertError.message };
  }

  return { success: true };
}
