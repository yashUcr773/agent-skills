'use server';

import { cookies } from 'next/headers';
import { supabaseAdmin } from '../../lib/supabase-admin';

// Verify the signed-in member with Supabase before changing anything.
async function currentUser() {
  const token = cookies().get('sb-access-token')?.value;
  if (!token) return null;
  const { data } = await supabaseAdmin.auth.getUser(token);
  return data.user;
}

export async function snoozeReminder(id) {
  const user = await currentUser();
  if (!user) throw new Error('Please sign in');
  const { data: reminder } = await supabaseAdmin.from('reminders').select('due_on').eq('id', id).single();
  const next = new Date(reminder.due_on);
  next.setDate(next.getDate() + 7);
  await supabaseAdmin.from('reminders').update({ due_on: next.toISOString().slice(0, 10) }).eq('id', id);
}

export async function completeReminder(id) {
  const user = await currentUser();
  if (!user) throw new Error('Please sign in');
  await supabaseAdmin.from('reminders').delete().eq('id', id);
}
