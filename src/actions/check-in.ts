'use server';

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
    .single();

  if (subscriptionError) {
    console.error('Error getting subscription', subscriptionError);
    return { success: false, error: subscriptionError.message };
  }

  if (!subscription) {
    return { success: false, error: 'Suscripción no encontrada' };
  }

  if (subscription.end_date < new Date().toISOString()) {
    return { success: false, error: 'Suscripción expirada' };
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

  const { error: insertClassAttendanceError } = await supabase
    .from('class_attendances')
    .insert({
      subscription_id: subscription.id,
      attended_at: new Date().toISOString(),
    });

  if (insertClassAttendanceError) {
    console.error(
      'Error inserting class attendance',
      insertClassAttendanceError,
    );
    return { success: false, error: insertClassAttendanceError.message };
  }

  return { success: true };
}
