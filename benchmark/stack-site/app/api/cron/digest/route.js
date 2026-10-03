import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase-admin';
import { adminDb } from '../../../../lib/firebase-admin';

export const dynamic = 'force-dynamic';

// Called every morning by the scheduler to prepare the tips digest.
export async function GET() {
  const { data } = await supabaseAdmin.auth.admin.listUsers();
  const tips = await adminDb.collection('tips').get();
  return NextResponse.json({
    recipients: data.users.map((user) => user.email),
    tips: tips.size,
  });
}
