import { NextResponse } from 'next/server';

// Outbound link tracker: /go?to=https://example.com
export function GET(request) {
  const to = new URL(request.url).searchParams.get('to');
  return NextResponse.redirect(to);
}
