import { supabaseAdmin } from '../../lib/supabase-admin';
import AdminTable from '../../components/AdminTable';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  const { data } = await supabaseAdmin.auth.admin.listUsers();
  const { data: profiles } = await supabaseAdmin.from('profiles').select('*');
  return (
    <div>
      <h1>Members</h1>
      <AdminTable users={data.users} profiles={profiles} />
    </div>
  );
}
