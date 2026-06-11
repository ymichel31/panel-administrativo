'use server';

import { cookies } from 'next/headers';
import { ClientForm } from 'types/client';
import { createClient } from 'utils/supabase/server';

export async function updateClientAction(id: string, form: ClientForm) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from('clients')
    .update({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      plan_id:form.plan_id,
      code: form.code,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
