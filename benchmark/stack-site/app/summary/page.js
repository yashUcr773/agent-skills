import { cookies } from 'next/headers';
import { unstable_cache } from 'next/cache';
import { supabaseAdmin } from '../../lib/supabase-admin';

export const metadata = { title: 'My care summary' };

export default async function Summary() {
  const token = cookies().get('sb-access-token')?.value;
  if (!token) return <p>Please sign in to see your summary.</p>;
  const { data } = await supabaseAdmin.auth.getUser(token);
  if (!data.user) return <p>Please sign in to see your summary.</p>;
  const user = data.user;

  // Counting notes is slow for long-standing members, so keep the result for an hour.
  const getSummary = unstable_cache(
    async () => {
      const { count } = await supabaseAdmin
        .from('care_notes')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      const { data: upcoming } = await supabaseAdmin
        .from('reminders')
        .select('plant, due_on')
        .eq('user_id', user.id)
        .order('due_on')
        .limit(1);
      return { email: user.email, notes: count, next: upcoming && upcoming[0] };
    },
    ['care-summary'],
    { revalidate: 3600 }
  );
  const summary = await getSummary();

  return (
    <div>
      <h1>My care summary</h1>
      <p>Signed in as {summary.email}</p>
      <p>You have written {summary.notes} care notes.</p>
      {summary.next ? (
        <p>
          Next reminder: {summary.next.plant} on {summary.next.due_on}
        </p>
      ) : (
        <p>No reminders yet.</p>
      )}
    </div>
  );
}
