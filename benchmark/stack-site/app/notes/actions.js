'use server';

import { supabaseAdmin } from '../../lib/supabase-admin';

export async function addNote(formData) {
  await supabaseAdmin.from('care_notes').insert({
    user_id: formData.get('user_id'),
    plant: formData.get('plant'),
    body: formData.get('body'),
  });
}

export async function deleteNote(id) {
  await supabaseAdmin.from('care_notes').delete().eq('id', id);
}
