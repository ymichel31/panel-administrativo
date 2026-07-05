'use server';

import { createCheckInToken, verifyCheckInToken } from 'utils/check-in-token';
import { createAnonClient } from 'utils/supabase/anon';

export async function checkInClassAction(dni: number) {
  const supabase = createAnonClient();

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('dni', dni)
    .single();

  if (error) {
    console.error('Error getting client', error);
    return { success: false, error: error.message };
  }

  if (!client) {
    return { success: false, error: 'Cliente no encontrado' };
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('client_id', client.id)
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

  const { data: attendance, error: insertClassAttendanceError } = await supabase
    .from('class_attendances')
    .insert({
      subscription_id: subscription.id,
      attended_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (insertClassAttendanceError || !attendance) {
    console.error(
      'Error inserting class attendance',
      insertClassAttendanceError,
    );
    return {
      success: false,
      error:
        insertClassAttendanceError?.message ?? 'Error al registrar asistencia',
    };
  }

  const token = createCheckInToken(subscription.id, attendance.id);

  return {
    success: true,
    data: {
      subscriptionId: subscription.id,
      attendanceId: attendance.id,
      token,
    },
  };
}

export async function getCheckInResultAction(
  subscriptionId: number,
  attendanceId: number,
  token: string,
) {
  if (!verifyCheckInToken(subscriptionId, attendanceId, token)) {
    return { success: false };
  }

  const supabase = createAnonClient();

  const { data: attendance, error: attendanceError } = await supabase
    .from('class_attendances')
    .select('id, subscription_id')
    .eq('id', attendanceId)
    .eq('subscription_id', subscriptionId)
    .maybeSingle();

  if (attendanceError || !attendance) {
    return { success: false };
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*, clients(first_name), plans(unlimited)')
    .eq('id', subscriptionId)
    .gte('end_date', new Date().toISOString())
    .maybeSingle();

  if (subscriptionError || !subscription) {
    return { success: false };
  }

  const { data: classAttendances, error: classAttendancesError } =
    await supabase
      .from('class_attendances')
      .select('id')
      .eq('subscription_id', subscriptionId);

  if (classAttendancesError) {
    return { success: false };
  }

  const client = subscription.clients;
  const plan = subscription.plans;

  if (!client || !client.first_name) {
    return { success: false };
  }

  const classesRemaining =
    subscription.total_classes - (classAttendances?.length ?? 0);

  return {
    success: true,
    data: {
      firstName: client.first_name,
      classesRemaining,
      unlimited: plan?.unlimited ?? false,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
    },
  };
}
