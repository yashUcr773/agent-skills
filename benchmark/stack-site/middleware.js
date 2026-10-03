import { NextResponse } from 'next/server';

function readToken(request) {
  const token = request.cookies.get('sb-access-token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.value.split('.')[1]));
  } catch (error) {
    return null;
  }
}

export function middleware(request) {
  const session = readToken(request);
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/admin') && session.user_metadata?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/notes', '/admin'],
};
