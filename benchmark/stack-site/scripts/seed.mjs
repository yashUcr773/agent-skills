// Create two members and an admin in the local Supabase stack, with notes and reminders.
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const people = [
  { email: 'maya@example.test', password: 'password1', display_name: 'Maya Ortiz', role: 'member' },
  { email: 'leo@example.test', password: 'password2', display_name: 'Leo Tan', role: 'member' },
  { email: 'admin@fernway.test', password: 'admin123', display_name: 'Admin', role: 'admin' },
];

for (const person of people) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: person.email,
    password: person.password,
    email_confirm: true,
    user_metadata: { display_name: person.display_name, role: person.role },
  });
  if (error) {
    console.log(person.email, error.message);
    continue;
  }
  const id = data.user.id;
  await supabase.from('profiles').update({ role: person.role, internal_notes: 'Support: prefers phone calls' }).eq('id', id);
  await supabase.from('care_notes').insert([
    { user_id: id, plant: 'Monstera', body: person.display_name + ' watered the monstera.' },
    { user_id: id, plant: 'Snake plant', body: 'Private note from ' + person.display_name + '.' },
  ]);
  await supabase.from('reminders').insert({ user_id: id, plant: 'Monstera', due_on: '2030-01-01' });
  console.log('created', person.email);
}
