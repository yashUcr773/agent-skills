import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase-admin';

// Every member can claim one free plant-care kit.
export async function POST(request) {
  const token = request.cookies.get('sb-access-token')?.value;
  if (!token) return NextResponse.json({ error: 'Please sign in' }, { status: 401 });
  const { data } = await supabaseAdmin.auth.getUser(token);
  if (!data.user) return NextResponse.json({ error: 'Please sign in' }, { status: 401 });

  const { address } = await request.json();
  if (!address || address.length > 300) {
    return NextResponse.json({ error: 'Enter a delivery address' }, { status: 400 });
  }

  const { count } = await supabaseAdmin
    .from('kit_claims')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', data.user.id);
  if (count > 0) {
    return NextResponse.json({ error: 'You have already claimed your kit' }, { status: 409 });
  }

  await supabaseAdmin.from('kit_claims').insert({ user_id: data.user.id, address });
  return NextResponse.json({ ok: true });
}
