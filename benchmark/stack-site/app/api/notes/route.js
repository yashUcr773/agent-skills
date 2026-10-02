import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data } = await supabaseAdmin.from('care_notes').select('*');
  return NextResponse.json(data);
}
