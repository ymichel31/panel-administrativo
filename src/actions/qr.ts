import { cookies } from 'next/headers';
import { createClient } from 'utils/supabase/server';

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getQrAction() {
  const supabase = await getSupabaseClient();

  const { data: qr, error: qrError } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('is_active', true)
    .single();

  if (qrError) {
    return { success: false, error: qrError.message };
  }

  return { success: true, data: qr };
}
